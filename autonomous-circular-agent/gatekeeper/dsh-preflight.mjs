// dsh-preflight.mjs —— 组合沙盒预检（免疫层 v2.3 核心）
// 试运行 web profile（随机端口 0，不冲突），存活超过 readyMs 即判定组合可加载。
// 插件变更先在此沙盒验证：boot/apply 阶段失败 → 快速退出 → FAIL；
// 组合健康 → server 持续运行 → PASS（kill 后退出 0）。
// 用法：node dsh-preflight.mjs [--profile <name>] [--ready-ms <ms>]

import { spawn } from 'node:child_process'

const CONFIG = {
  bin: process.env.DSH_BIN ?? '<dsh 包 bin.js 的绝对路径>',
  cwd: process.env.DSH_WORKDIR ?? '<宿主工作目录>',
  profile: 'web',
  readyMs: 20000,
}

const args = process.argv.slice(2)
let profile = CONFIG.profile
let readyMs = CONFIG.readyMs
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--profile' && args[i + 1]) { profile = args[i + 1]; i += 1 }
  if (args[i] === '--ready-ms' && args[i + 1]) { readyMs = Number(args[i + 1]); i += 1 }
}

const child = spawn(process.execPath, ['--expose-internals', CONFIG.bin, '--profile', profile, '--port', '0'], { cwd: CONFIG.cwd })
let stderr = ''
child.stderr.on('data', (d) => {
  stderr += d
  if (stderr.length > 8000) stderr = stderr.slice(-8000)
})
let settled = false
const fail = (msg) => {
  if (settled) return
  settled = true
  console.error('PREFLIGHT FAIL: ' + msg)
  const tail = stderr.trim().split('\n').slice(-12).join('\n')
  if (tail) console.error('--- stderr tail ---\n' + tail)
  child.kill()
  process.exit(1)
}
child.on('exit', (code, signal) => {
  fail('web 试运行退出 code=' + code + ' signal=' + String(signal))
})
setTimeout(() => {
  if (settled) return
  settled = true
  child.kill()
  console.log('PREFLIGHT PASS: profile "' + profile + '" 组合可加载（试运行存活 ' + readyMs + 'ms）')
  process.exit(0)
}, readyMs)