# 门控体系实施方案（Gatekeeper）

自主循环智能体的**免疫层**：哨兵门控 + 沙盒预检 + 自动唤醒。
核心思想：**变更隔离——重启是最后一公里，预检是门，宿主永不因插件变更挂死。**

## 架构

```
agent 改插件 → build → 测试通过 → 写哨兵（内容=会话id）
                                              ↓
守护（dsh-watch.mjs）检测哨兵 → 组合沙盒预检（dsh-preflight.mjs）
   ├─ PASS → kill 旧实例 → 重启新组合 → web 就绪 → 唤醒会话（session.prompt）→ 删哨兵
   └─ FAIL → 不 kill 旧实例（旧组合零中断继续跑）+ 事故落盘 + 保留哨兵（修复后 touch 重试）
```

## 文件

| 文件 | 职责 |
|---|---|
| `dsh-watch.mjs` | 守护：chokidar 监听哨兵文件；重启/唤醒/快速退出熔断/事故落盘 |
| `dsh-preflight.mjs` | 沙盒预检：试运行组合（随机端口），存活超过 readyMs 即 PASS；boot/apply 失败快速退出即 FAIL |

## 部署

1. 安装依赖：`npm install chokidar`（守护脚本 require 它）
2. 配置 `CONFIG`（环境变量优先）：

```bash
# 示例（PowerShell）
$env:DSH_PLUGINS_DIR = 'C:/proj/self-plugins'   # 插件目录
$env:DSH_BIN        = 'C:/proj/node_modules/@deepseek-ai/dsh/lib/bin.js'
$env:DSH_WORKDIR    = 'C:/proj'
node dsh-watch.mjs
```

3. 启动守护（推荐放启动脚本，`Ctrl+C` 优雅停止）

## 运行协议（agent 侧）

1. 改插件代码 → build → 测试通过
2. 写哨兵文件（内容 = 目标会话 id）：
   ```bash
   Set-Content .hot-reload-flag 'session-xxx' -Encoding utf8
   ```
3. 守护检测哨兵 → 沙盒预检 → 通过则重启 + 唤醒会话 → agent 收到「web 已重启」后继续工作

## 失败行为

| 场景 | 行为 |
|---|---|
| 预检失败 | 旧实例零中断继续跑；事故落盘（`.life-incident`，JSON：时间/错误摘要/恢复指引）；哨兵保留 |
| 快速退出 ×N | 熔断停止自动重启（防崩溃循环）；事故落盘；哨兵保留 → 修复后 touch 哨兵可再触发 |
| 事故文件 | agent 醒来自主读取（life_status 工具），决定自愈或汇报 |
| 唤醒失败 | 重试 3 次；最终失败保留哨兵，人工介入 |

## 设计要点

- **哨兵 = 门控**：只有哨兵文件变化触发重启，其他文件变化一律忽略——「build 完、测试过、我认可」才生效
- **沙盒 = 隔离**：预检实例绑随机端口（`--port 0`）试运行，与生产实例零冲突
- **失败 = 可读**：每次失败落盘事故文件 + 保留哨兵（恢复路径 = 修复后 touch）
- **唤醒 = 会话续接**：重启后按哨兵 id（或最近活跃会话）发 `session.prompt`，agent 自动继续，无需人工介入

## 与本仓库的关系

这是「原语三件套」中的**免疫兜底**的参考实现（DSH 版）。任何宿主的等价物都应满足：变更先验证、失败不中断、恢复有路径。