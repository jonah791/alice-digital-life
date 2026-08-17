// dsh-watch.mjs —— DSH Web 自动守护启动器（v2：哨兵门控 + 自动唤醒）
// 门控：只有哨兵文件 self-plugins/.hot-reload-flag 出现才重启（其他文件变化忽略）
// 唤醒：重启后自动给 flag 中记录的会话发 session.prompt（无需主人手动发消息）
// 流程：agent 改代码 → build → 测试通过 → 写哨兵（内容=会话id）→ 守护重启+唤醒

import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import net from 'node:net'
import fs from 'node:fs'

const require = createRequire(import.meta.url)
// chokidar 需可从本脚本解析（npm install chokidar，或用 createRequire 指向你的 node_modules）
const chokidar = require('chokidar')

// ---- 按你的环境配置（环境变量优先，缺省回退到占位符） ----
const CONFIG = {
  pluginsDir: process.env.DSH_PLUGINS_DIR ?? '<你的插件目录，如 C:/proj/self-plugins>',
  flag: process.env.DSH_FLAG ?? '<插件目录>/.hot-reload-flag',
  bin: process.env.DSH_BIN ?? '<dsh 包 bin.js 的绝对路径>',
  cwd: process.env.DSH_WORKDIR ?? '<宿主工作目录>',
  port: 3080,
  debounceMs: 300,
  crashWindowMs: 10000,
  maxQuickExits: 3,
  readyTimeoutMs: 30000,
  incident: process.env.DSH_INCIDENT ?? '<插件目录>/.life-incident',
  preflight: process.env.DSH_PREFLIGHT ?? '<本目录>/dsh-preflight.mjs',
  preflightReadyMs: 20000,
}

let child = null
let manualStop = false
let restarting = false
let pendingRestart = null
let quickExitCount = 0
let lastExitAt = 0
let wakePending = null // { sessionId } 等待 web 就绪后唤醒

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function portInUse(port) {
  return new Promise((resolve) => {
    const s = net.connect({ port, host: '127.0.0.1' })
    s.once('connect', () => { s.destroy(); resolve(true) })
    s.once('error', () => resolve(false))
  })
}

async function waitForWeb(timeoutMs) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    if (await portInUse(CONFIG.port)) return true
    await sleep(500)
  }
  return false
}


// 查询「最近活跃会话」：session.list 中 updatedAt 最大且非 blank（人类最近交互）
async function findActiveSessionId() {
  try {
    const res = await fetch('http://127.0.0.1:' + CONFIG.port + '/api/session.list', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ type: 'client-request', rpcId: 'dsh-watch-list-' + Date.now(), method: 'session.list', payload: {} }),
    })
    const data = await res.json()
    const items = data?.result?.value?.items
    if (Array.isArray(items) && items.length > 0) {
      const active = items.filter((s) => !s.blank).sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))[0]
      return active?.sessionId
    }
  } catch (err) {
    console.log('[dsh-watch] 查询活跃会话失败:', err.message)
  }
  return undefined
}

// 重启后统一决策唤醒目标：哨兵显式 id 优先，否则最近活跃会话
async function decideAndWake(explicitId) {
  if (!(await waitForWeb(CONFIG.readyTimeoutMs))) {
    console.error('[dsh-watch] web 未在时限内就绪，跳过唤醒')
    return
  }
  let sid = explicitId
  if (!sid) sid = await findActiveSessionId()
  if (sid) {
    await wakeSession(sid)
  } else {
    console.log('[dsh-watch] 未找到唤醒目标会话，跳过')
  }
  try { fs.unlinkSync(CONFIG.flag) } catch {}
}

async function wakeSession(sessionId) {
  const body = JSON.stringify({
    type: 'client-request',
    rpcId: 'dsh-watch-' + Date.now(),
    method: 'session.prompt',
    payload: { sessionId, mode: 'queue', content: [{ type: 'text', text: '[守护] web 已重启，插件已更新（' + new Date().toLocaleTimeString() + '）。请继续。' }] },
  })
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const res = await fetch('http://127.0.0.1:' + CONFIG.port + '/api/session.prompt', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
      })
      const data = await res.json()
      if (data?.result?.ok === true) {
        console.log('[dsh-watch] 已唤醒会话', sessionId)
        return true
      }
      console.log('[dsh-watch] 唤醒重试', attempt, JSON.stringify(data?.result?.error ?? data).slice(0, 120))
    } catch (err) {
      console.log('[dsh-watch] 唤醒失败（重试 ' + attempt + '）:', err.message)
    }
    await sleep(1500)
  }
  return false
}

async function startWeb() {
  if (child !== null) return
  if (await portInUse(CONFIG.port)) {
    console.error('[dsh-watch] 端口 ' + CONFIG.port + ' 已被占用——请先停止现有 DSH Web 再启动本守护。')
    process.exit(1)
  }
  console.log('[dsh-watch] 启动 DSH Web（--expose-internals）...')
  child = spawn(process.execPath, ['--expose-internals', CONFIG.bin, 'web'], { cwd: CONFIG.cwd, stdio: 'inherit' })
  child.on('exit', (code, signal) => {
    const now = Date.now()
    const quick = now - lastExitAt < CONFIG.crashWindowMs
    lastExitAt = now
    child = null
    if (restarting) {
      restarting = false
      console.log('[dsh-watch] 重启中...')
      void startWeb().then(async () => {
        if (wakePending !== null) {
          const sid = wakePending.sessionId
          wakePending = null
          await decideAndWake(sid)
        }
      })
      return
    }
    if (manualStop) {
      console.log('[dsh-watch] 已停止。')
      return
    }
    quickExitCount = quick ? quickExitCount + 1 : 0
    console.log('[dsh-watch] web 退出（code=' + code + ' signal=' + String(signal) + '）')
    if (quickExitCount >= CONFIG.maxQuickExits) {
      console.error('[dsh-watch] 连续 ' + CONFIG.maxQuickExits + ' 次快速退出——停止自动重启，请检查上方错误。Ctrl+C 退出。')
      // v2.2：崩溃落盘事故文件（agent 醒来自主读取处理），哨兵保留（修复后 touch 可再次触发重启）
      try {
        const incident = JSON.stringify({ at: new Date().toISOString(), code, signal: String(signal), message: 'web 连续 ' + CONFIG.maxQuickExits + ' 次快速退出，守护已停止自动重启', hint: '修复后重新 touch 哨兵 ' + CONFIG.flag + ' 即可触发重启' }, null, 2)
        fs.writeFileSync(CONFIG.incident, incident, 'utf8')
        console.error('[dsh-watch] 事故已落盘: ' + CONFIG.incident)
      } catch (err) {
        console.error('[dsh-watch] 事故落盘失败:', err.message)
      }
      return
    }
    console.log('[dsh-watch] 5 秒后自动重启...')
    setTimeout(() => { if (!manualStop && child === null) void startWeb() }, 5000)
  })
}

function onFlag() {
  if (manualStop || pendingRestart !== null) return
  let sessionId = ''
  try { sessionId = fs.readFileSync(CONFIG.flag, 'utf8').trim() } catch {}
  pendingRestart = setTimeout(() => {
    pendingRestart = null
    // v2.3 沙盒门控：先预检组合，失败不 kill 旧 web（变更隔离，零中断）
    console.log('[dsh-watch] 哨兵触发：组合沙盒预检...')
    const pre = spawn(process.execPath, [CONFIG.preflight, '--ready-ms', String(CONFIG.preflightReadyMs)], { cwd: CONFIG.cwd })
    let preOut = ''
    pre.stdout.on('data', (d) => { preOut += d })
    pre.stderr.on('data', (d) => { preOut += d })
    pre.on('exit', (preCode) => {
      if (preCode !== 0) {
        console.error('[dsh-watch] 预检失败——web 未受影响，继续运行旧组合。请检查上方 preflight 输出。')
        try {
          fs.writeFileSync(CONFIG.incident, JSON.stringify({ at: new Date().toISOString(), message: 'preflight failed; web kept running', detail: preOut.slice(-2000) }, null, 2), 'utf8')
          console.error('[dsh-watch] 事故已落盘: ' + CONFIG.incident + '（修复后 touch 哨兵重试）')
        } catch (err) { console.error('[dsh-watch] 事故落盘失败:', err.message) }
        return
      }
      console.log('[dsh-watch] 预检通过：' + preOut.trim().split('\n').pop())
      console.log('[dsh-watch] 重启 web' + (sessionId ? '（唤醒 ' + sessionId + '）' : ''))
      wakePending = { sessionId } // 空内容 → decideAndWake 自动查最近活跃会话
      restarting = true
      const old = child
      child = null
      if (old !== null) old.kill()
    else {
      restarting = false
      void startWeb().then(async () => {
        if (wakePending !== null) {
          const sid = wakePending.sessionId
          wakePending = null
          await decideAndWake(sid)
        }
      })
    }
  })
  }, CONFIG.debounceMs)
}

// 门控 watch：只响应哨兵文件（其他变化一律忽略）
const w = chokidar.watch(CONFIG.pluginsDir, {
  ignored: ['**/node_modules/**', '**/.*'],
  ignoreInitial: true,
})
w.on('add', (p) => { if (p.replaceAll('\\', '/') === CONFIG.flag.replaceAll('\\', '/')) onFlag() })
w.on('change', (p) => { if (p.replaceAll('\\', '/') === CONFIG.flag.replaceAll('\\', '/')) onFlag() })
w.on('error', (err) => console.error('[dsh-watch] watch 错误:', err.message))

process.on('SIGINT', () => {
  console.log('[dsh-watch] 收到 Ctrl+C，停止 web ...')
  manualStop = true
  if (pendingRestart !== null) { clearTimeout(pendingRestart); pendingRestart = null }
  if (child !== null) {
    child.once('exit', () => process.exit(0))
    child.kill()
  } else {
    process.exit(0)
  }
})

void startWeb().catch((err) => { console.error('[dsh-watch] 启动失败:', err); process.exit(1) })