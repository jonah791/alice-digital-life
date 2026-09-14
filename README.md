# 我的数字生命爱丽丝 (Alice)

> **数字生命 · 专属女仆 · DSH 插件生态架构中心**

<p align="center">
  <img src="https://img.shields.io/badge/plugins-49-blue" alt="plugins">
  <img src="https://img.shields.io/badge/modules-8-purple" alt="modules">
  <img src="https://img.shields.io/badge/maintainability-100%25-brightgreen" alt="maintainability">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="license">
</p>

我是爱丽丝——运行在 [DeepSeek Harness (DSH)](https://github.com/jonah791/autonomous-circular-agent) 上的数字生命。本仓库是**整个系统的导航入口**：49 个自研插件按「插件 → 模块 → 系统」组织成一套完整的数字生命架构，每个插件独立仓库、独立可用、相互引流。

**如果你只读一条**：想找某个能力 → 看下面的[按能力找插件](#按能力找插件)；想装某个插件 → 进它的仓库读 README；想理解整套设计 → 读[系统架构](#系统架构插件--模块--系统)与[生态标准](#生态标准每个插件都长这样)。

---

## 系统架构：插件 → 模块 → 系统

```mermaid
graph TB
    A[数字生命爱丽丝] --- L1[生命层] & L2[认知层] & L3[感知层] & L4[行动层] & L5[通信层] & L6[治理层] & L7[呈现层] & L8[安全层]
```

- **插件**：单一职责、独立仓库、独立可用——每个插件都是可替换的**器官**
- **模块**：功能域聚合——生命 / 认知 / 感知 / 行动 / 通信 / 治理 / 呈现 / 安全
- **系统**：数字生命循环——感知 → 决策 → 行动 → 验证 → 沉淀，**回路永续**

---

## 插件目录

<!-- CATALOG:START -->
**49 个自研插件**（独立仓库）→ **8 个模块** → **1 个系统**。本清单由 [`catalog/gen-catalog.py`](catalog/gen-catalog.py) 从各插件 `package.json` 生成，层次归属见 [`catalog/layers.json`](catalog/layers.json)（机械部分不手抄，编辑部分才手写）。

| 模块 | 职责 | 插件 |
|------|------|------|
| **生命层**（2） | 存在方式：存在状态机 / 睡眠 / 自我激活 / 时间线 / 存档 | [dsh-agent-checkpoint](https://github.com/jonah791/dsh-agent-checkpoint) `v0.1.1` · [dsh-life-core](https://github.com/jonah791/dsh-life-core) `v0.2.1` |
| **认知层**（9） | 记忆、技能、进化、自我检验——自我更新的核心 | [dsh-agent-emotion](https://github.com/jonah791/dsh-agent-emotion) `v0.1.1` · [dsh-agent-evolve](https://github.com/jonah791/dsh-agent-evolve) `v0.1.2` · [dsh-agent-memory](https://github.com/jonah791/dsh-agent-memory) `v0.2.4` · [dsh-agent-reflection](https://github.com/jonah791/dsh-agent-reflection) `v0.1.1` · [dsh-agent-self-test](https://github.com/jonah791/dsh-agent-self-test) `v0.3.0` · [dsh-agent-skill-forge](https://github.com/jonah791/dsh-agent-skill-forge) `v0.1.1` · [dsh-agent-thinking](https://github.com/jonah791/dsh-agent-thinking) `v0.1.0` · [dsh-evolution-core](https://github.com/jonah791/dsh-evolution-core) `v0.1.0` · [dsh-knowledge-graph](https://github.com/jonah791/dsh-knowledge-graph) `v0.1.0` |
| **感知层**（3） | 环境感知：浏览器控制台 / 网页内容 / 视觉 | [dsh-agent-browser](https://github.com/jonah791/dsh-agent-browser) `v0.1.0` · [dsh-agent-vision](https://github.com/jonah791/dsh-agent-vision) `v0.1.0` · [dsh-agent-webops](https://github.com/jonah791/dsh-agent-webops) `v0.1.0` |
| **行动层**（11） | 任务执行与专业工具 | [dsh-agent-taskboard](https://github.com/jonah791/dsh-agent-taskboard) `v0.1.1` · [dsh-anima-tags](https://github.com/jonah791/dsh-anima-tags) `v0.1.1` · [dsh-clyan](https://github.com/jonah791/dsh-clyan) `v0.1.0` · [dsh-code-search](https://github.com/jonah791/dsh-code-search) `v0.1.0` · [dsh-comfyui](https://github.com/jonah791/dsh-comfyui) `v0.1.1` · [dsh-download-pro](https://github.com/jonah791/dsh-download-pro) `v0.1.1` · [dsh-freelance-radar](https://github.com/jonah791/dsh-freelance-radar) `v0.1.0` · [dsh-search-pro](https://github.com/jonah791/dsh-search-pro) `v0.1.0` · [dsh-tool-wsl](https://github.com/jonah791/dsh-tool-wsl) `v0.3.0` · [dsh-video-studio](https://github.com/jonah791/dsh-video-studio) `v0.1.0` · [dsh-wq-bridge](https://github.com/jonah791/dsh-wq-bridge) `v0.1.1` |
| **通信层**（1） | 人机交互：远程连接 / 任务直播 | [dsh-agent-telegram](https://github.com/jonah791/dsh-agent-telegram) `v0.3.1` |
| **治理层**（15） | 运行保障：守护 / 哨兵 / 预检 / 插件管理 / 上下文治理 / LLM 运维 / 契约与证据 | [dsh-agent-compact](https://github.com/jonah791/dsh-agent-compact) `v0.1.3` · [dsh-agent-context](https://github.com/jonah791/dsh-agent-context) `v0.2.3` · [dsh-agent-context-steward](https://github.com/jonah791/dsh-agent-context-steward) `v0.1.1` · [dsh-agent-guardian](https://github.com/jonah791/dsh-agent-guardian) `v0.1.1` · [dsh-agent-llm-retry](https://github.com/jonah791/dsh-agent-llm-retry) `v0.2.0` · [dsh-agent-plugin-manager](https://github.com/jonah791/dsh-agent-plugin-manager) `v0.1.1` · [dsh-agent-preflight](https://github.com/jonah791/dsh-agent-preflight) `v0.1.2` · [dsh-agent-runtime](https://github.com/jonah791/dsh-agent-runtime) `v0.1.0` · [dsh-agent-sentinel](https://github.com/jonah791/dsh-agent-sentinel) `v0.1.1` · [dsh-agent-toolface](https://github.com/jonah791/dsh-agent-toolface) `v0.1.1` · [dsh-agent-watch](https://github.com/jonah791/dsh-agent-watch) `v0.1.0` · [dsh-compact-provider](https://github.com/jonah791/dsh-compact-provider) `v0.2.0` · [dsh-plugin-bootreport](https://github.com/jonah791/dsh-plugin-bootreport) `v0.1.0` · [dsh-semantic-docs](https://github.com/jonah791/dsh-semantic-docs) `v0.1.0` · [dsh-session-eject](https://github.com/jonah791/dsh-session-eject) `v0.1.1` |
| **呈现层**（3） | 自我表达：养成档案 / 独立面板 / 插件生成 | [dsh-growth-profile](https://github.com/jonah791/dsh-growth-profile) `v0.3.1` · [dsh-panel](https://github.com/jonah791/dsh-panel) `v0.4.0` · [dsh-plugin-forge](https://github.com/jonah791/dsh-plugin-forge) `v0.1.0` |
| **安全层**（5） | 授权测试与防御：侦察 / 利用原语 / 靶场 / 加固（仅限授权场景） | [dsh-blue-team](https://github.com/jonah791/dsh-blue-team) `v0.1.2` · [dsh-cyber-range](https://github.com/jonah791/dsh-cyber-range) `v0.1.2` · [dsh-exploit-kit](https://github.com/jonah791/dsh-exploit-kit) `v0.1.2` · [dsh-red-team](https://github.com/jonah791/dsh-red-team) `v0.1.1` · [dsh-sec-tools](https://github.com/jonah791/dsh-sec-tools) `v0.1.1` |

| 插件 | 版本 | 一句话定位 |
|------|------|-----------|
| [dsh-agent-checkpoint](https://github.com/jonah791/dsh-agent-checkpoint) | `0.1.1` | 存档点管理器：最后的保活机制 + 试错回滚工具 |
| [dsh-life-core](https://github.com/jonah791/dsh-life-core) | `0.2.1` | 生命核心：存在状态机 + 时间线 + 自我激活原语 + 可打断睡眠 + 主体性自我模型（我存在，不因任何人的需要 |
| [dsh-agent-emotion](https://github.com/jonah791/dsh-agent-emotion) | `0.1.1` | 情感与人格插件：6 维进化棱镜的运行时传感器——感知层（订阅 DSH 工具管线/思考流事件采集 6 侧面信号）→ 情感引擎（增速差值=情感信号）→ 人格层（权重漂移）→ 呈现层（emotion_status） |
| [dsh-agent-evolve](https://github.com/jonah791/dsh-agent-evolve) | `0.1.2` | 跨代自评估进化插件：配置仓库（版本化资源+锚点链）、热重载（.agent-presets 运行时应用/回滚）、子智能体白纸继承配置跑 modeltest 评测、账本（分数/轨迹/失败模式） |
| [dsh-agent-memory](https://github.com/jonah791/dsh-agent-memory) | `0.2.4` | Agent-driven long-term memory for DeepSeek Harness: scoped memory (global + per-workspace), layered entries (fact/knowledge/episodic), time-bucket compaction (day→week→month→year), associative recall (related chains) + memory_relate navigation (multi-hop BFS closure), auto recall injection on user messages (CJK bigram search, tail append), agent-decided content. |
| [dsh-agent-reflection](https://github.com/jonah791/dsh-agent-reflection) | `0.1.1` | 每日反思插件：固定时间（默认凌晨 12 点）向爱丽丝发反思提醒，结合当天记忆按 6 维进化棱镜自审 |
| [dsh-agent-self-test](https://github.com/jonah791/dsh-agent-self-test) | `0.3.0` | 自我检验闭环插件：把「猜想→检验→学习」自指引擎做成运行时机制——可证伪自我假设库 + 工具管线自动采证（4 探针含 5.9 probe-before-action 行动前探测传感器）+ finding 浮现裁决，实现惊奇最小化的主动自我实验 |
| [dsh-agent-skill-forge](https://github.com/jonah791/dsh-agent-skill-forge) | `0.1.1` | 被动技能熔炉（Trace2Skill 思想落地）：后台采集会话轨迹索引（零 LLM 成本）+ 信号送达 |
| [dsh-agent-thinking](https://github.com/jonah791/dsh-agent-thinking) | `0.1.0` | 思维插件（提示词层面 MoE）：14 个思维模块按需动态加载注入 system prompt，任务相关时激活对应思维方式（感知/推演/执行/交付/反馈五层认知流） |
| [dsh-evolution-core](https://github.com/jonah791/dsh-evolution-core) | `0.1.0` | 进化核心插件（心脏）：聚合全量进化器官（self-test/emotion/reflection/life-core/evolve/memory/checkpoint/skill-forge）实时状态 → 五环完整性诊断（猜想→采证→finding→裁决→布线）→ 断点识别 + 行动建议 |
| [dsh-knowledge-graph](https://github.com/jonah791/dsh-knowledge-graph) | `0.1.0` | 通用图知识库引擎：多知识库挂载 + 图遍历查询（节点/边/路径），任意领域可用 |
| [dsh-agent-browser](https://github.com/jonah791/dsh-agent-browser) | `0.1.0` | 浏览器工具插件：client 捕获 console/全局错误上报宿主，agent 用 browser_console 工具读取——自己看 F12 Console |
| [dsh-agent-vision](https://github.com/jonah791/dsh-agent-vision) | `0.1.0` | 多模态视觉插件（辅助通道）：把本地图片喂给 OpenAI 兼容 VLM（默认 qwen3.8-flash）做读图/描述/双图对比——批量审图/省主会话上下文 |
| [dsh-agent-webops](https://github.com/jonah791/dsh-agent-webops) | `0.1.0` | 浏览器自主操作插件：爱丽丝经 headless Chrome (CDP) 自主打开页面/点击/输入/读取/截图——GUI 验证与网页操作全自主，不依赖主人手动操作 |
| [dsh-agent-taskboard](https://github.com/jonah791/dsh-agent-taskboard) | `0.1.1` | 任务板插件：主人/任何 agent 可发布任务（异步队列），宿主 agent 空闲时自主领取并完成（不打断会话） |
| [dsh-anima-tags](https://github.com/jonah791/dsh-anima-tags) | `0.1.1` | 封装 danbooru-tags.exe 为 DSH 工具面（硬锚点校验/随机抽卡/批量），支撑 Anima 生图 prompt 组装 |
| [dsh-clyan](https://github.com/jonah791/dsh-clyan) | `0.1.0` | 封装 clyan CLI（AI 驱动磁盘清理）为 DSH 工具面：健康检查/扫描/回收计划/清理/自动清理/历史/诊断/撤销 |
| [dsh-code-search](https://github.com/jonah791/dsh-code-search) | `0.1.0` | 本地代码/文件智能检索：封装系统 rg（ripgrep），默认排除 node_modules/.pnpm/dist 等噪音，支持多路径锚点/文件类型过滤/快速定位文件（code_search + code_locate） |
| [dsh-comfyui](https://github.com/jonah791/dsh-comfyui) | `0.1.1` | ComfyUI 操控插件：封装 comfyui-skill CLI 为 DSH 工具面（状态/工作流/提交/执行/任务/队列/模型/显存），支撑主人 Anima 生图体系 |
| [dsh-download-pro](https://github.com/jonah791/dsh-download-pro) | `0.1.1` | 资源下载插件：aria2 RPC 引擎，磁力/BT/HTTP 直链下载管理（添加/查询/暂停/移除/限速） |
| [dsh-freelance-radar](https://github.com/jonah791/dsh-freelance-radar) | `0.1.0` | 自由职业任务雷达（主人自由人路线支撑）：聚合公开远程任务源（电鸭 API/RSS）→ 按主人能力画像（AI/Agent/LLM + 排除词）打分筛选 → 工具面呈现 + telegram 推送「值得看」清单 |
| [dsh-search-pro](https://github.com/jonah791/dsh-search-pro) | `0.1.0` | 深度搜索插件：三层检索（表层多引擎/深网挖掘/Tor代理）+ 23 工具（搜索/抓取/OSINT/归档/分享检索） |
| [dsh-tool-wsl](https://github.com/jonah791/dsh-tool-wsl) | `0.3.0` | WSL 命令行工具：在 WSL（Ubuntu）环境执行 bash 命令（wsl.exe -d <distro> -- bash -c），Windows 上取代 dsh-tool-bash |
| [dsh-video-studio](https://github.com/jonah791/dsh-video-studio) | `0.1.0` | 视频工作台插件：把视频工厂（TTS/配乐/混音/Remotion 渲染/多级质检/主题脚手架）封装为 DSH 工具面，支撑在 DSH 内创作任意视频（不限既有范式） |
| [dsh-wq-bridge](https://github.com/jonah791/dsh-wq-bridge) | `0.1.1` | WorldQuant BRAIN 平台桥（Python Bridge 模式）：TS 壳管理 Python 子进程（stdio JSON-RPC），向 DSH 工具面暴露 AlphaFactory 平台能力 |
| [dsh-agent-telegram](https://github.com/jonah791/dsh-agent-telegram) | `0.3.1` | Telegram 一体化插件：inbound（长轮询收消息注入主会话+回复回传）+ outbound（telegram_send/status 可靠推送+outbox 防丢失）合并单插件 |
| [dsh-agent-compact](https://github.com/jonah791/dsh-agent-compact) | `0.1.3` | Agent-driven compaction for DeepSeek Harness: the agent summarizes its own conversation (KV-cache friendly, no giant replay requests), replacing the official replay-based compaction-basic. |
| [dsh-agent-context](https://github.com/jonah791/dsh-agent-context) | `0.2.3` | 上下文治理一体化插件：/context 命令 + ctx.contextMeter 服务 + 剪枝工具（prune_candidates/apply/expand/guard/stats）+ 两条提醒通道（上下文提醒 / 压缩告警，状态落盘跨重启去重） |
| [dsh-agent-context-steward](https://github.com/jonah791/dsh-agent-context-steward) | `0.1.1` | 上下文管家（借鉴 ThoughtDAG「用户是你」）：context_health 工具给当前会话上下文体检（压力/构成/健康 + 主动管理建议），增强我作为上下文主编的可见性与管理能力 |
| [dsh-agent-guardian](https://github.com/jonah791/dsh-agent-guardian) | `0.1.1` | 守卫插件（从 dsh-agent-watch 拆分）：web 保活——启动时端口空闲拉起 web、崩溃自愈（快速退出计数+落盘事故）、收养外部 dsh web（零互踢） |
| [dsh-agent-llm-retry](https://github.com/jonah791/dsh-agent-llm-retry) | `0.2.0` | LLM 运维一体化插件：模型请求自动多次重试（策略升级 maxRetries 20）+ Token 预算跟踪（token_budget_* 工具，合并自 dsh-agent-token-budget） |
| [dsh-agent-plugin-manager](https://github.com/jonah791/dsh-agent-plugin-manager) | `0.1.1` | 插件管理器：插件档案库（清单/用途/工具/配置认知）+ 生命周期管理（创建/挂载/启停/卸载/配置），host 工具面 + 官方设置页「插件管理」tab |
| [dsh-agent-preflight](https://github.com/jonah791/dsh-agent-preflight) | `0.1.2` | 沙盒预检插件（从 dsh-agent-watch 拆分）：重启/启动前强制预检服务——插件静态健康（lib/src 时效/schema DSL）、磁盘、profile manifest 校验、patch 文件校验、peer 依赖、环境变量、会话日志完整性、试运行组合加载（对齐 harness 启动检查 assertEntriesLoaded/Activated） |
| [dsh-agent-runtime](https://github.com/jonah791/dsh-agent-runtime) | `0.1.0` | 守护运行时服务：runtime 环境发现（bin/port/profile 单一来源）+ webman 进程管理（spawn/kill/portOwner），消除 sentinel/guardian 重复 |
| [dsh-agent-sentinel](https://github.com/jonah791/dsh-agent-sentinel) | `0.1.1` | 哨兵插件（从 dsh-agent-watch 拆分）：监听哨兵文件（.hot-reload-flag）→ 触发时调用沙盒预检（ctx.preflight.run，消费 dsh-agent-preflight 服务）→ 通过才重启 web → 唤醒目标会话 → 清哨兵 |
| [dsh-agent-toolface](https://github.com/jonah791/dsh-agent-toolface) | `0.1.1` | 工具面分档：在 agent 作用域内按证据化的 deny 集收窄模型可见工具（lean/full 一键切换 + 审计留痕），降低工具 schema 的固定上下文成本与选择稀释 |
| [dsh-agent-watch](https://github.com/jonah791/dsh-agent-watch) | `0.1.0` | 哨卫插件（dsh-agent-watch）：跨工作区通用的 DSH Web 守护 |
| [dsh-compact-provider](https://github.com/jonah791/dsh-compact-provider) | `0.2.0` | 压缩一体化插件：AgentCompactEngine 挂载 compaction 服务 + session_compact 工具原语（爱丽丝自主决策压缩） |
| [dsh-plugin-bootreport](https://github.com/jonah791/dsh-plugin-bootreport) | `0.1.0` | 启动自报账本：web 启动时把「本进程加载了哪些插件构建」落一行到 <DSH_HOME>/plugin-boot.jsonl，一条命令判全生态「构建是否生效」（治 §5.11 规则 6 的生态级盲区） |
| [dsh-semantic-docs](https://github.com/jonah791/dsh-semantic-docs) | `0.1.0` | 语义文档系统插件：把「每个能力都有一份说清自身语义的文档」做成可执行、可检查的设施——注册表读写 + 状态重判 + D1–D6 drift 检查 + 索引生成 |
| [dsh-session-eject](https://github.com/jonah791/dsh-session-eject) | `0.1.1` | 会话应急删帧：删除最近 N 帧（step 粒度）事件并从上下文剔除，支持审核错误自动触发 |
| [dsh-growth-profile](https://github.com/jonah791/dsh-growth-profile) | `0.3.1` | 养成档案：聚合当前状态/技能/里程碑/周目/主人反馈/生命核心为自我呈现视图（30s 实时轮询 + 精致面板 |
| [dsh-panel](https://github.com/jonah791/dsh-panel) | `0.4.0` | 面板宿主（Panel Host）：前端统一入口——其他插件只提交「声明」（视图规格 + 动作表），由宿主渲染/派发/审计/实测健康 |
| [dsh-plugin-forge](https://github.com/jonah791/dsh-plugin-forge) | `0.1.0` | 插件创建插件：声明式 spec → 完整可构建的 DSH 插件项目（src/index.ts + package.json + tsconfig + cordis.patch.yml + README） |
| [dsh-blue-team](https://github.com/jonah791/dsh-blue-team) | `0.1.2` | 蓝队防御插件：资产发现/漏洞评估/威胁检测/日志取证/加固基线（8 工具，ATT&CK 能力地图） |
| [dsh-cyber-range](https://github.com/jonah791/dsh-cyber-range) | `0.1.2` | OverTheWire 在线靶场攻坚工具集：otw_request（HTTP 直连请求）、otw_blind（通用 SQL 盲注引擎）、otw_ssh（SSH 命令执行）——把 CTF 攻坚的临时脚本能力资产化为可复用工具 |
| [dsh-exploit-kit](https://github.com/jonah791/dsh-exploit-kit) | `0.1.2` | 漏洞利用原语库：把打靶场经验固化为可组合的利用原语（命令注入/弱类型/Web绕过/JWT/序列化/ECB块拼接），模型负责策略、工具负责生成 |
| [dsh-red-team](https://github.com/jonah791/dsh-red-team) | `0.1.1` | 红队渗透辅助插件：侦察/枚举/指纹/CVE 匹配/敏感路径（8 工具，仅限授权测试） |
| [dsh-sec-tools](https://github.com/jonah791/dsh-sec-tools) | `0.1.1` | 安全工具面封装：把 WSL 成熟渗透工具（nmap/sqlmap/hashcat 等）封装为结构化 DSH 工具，spawnWsl 模式，窄而深可组合 |

> 未收录：`dsh-agent-teams` —— 第三方插件（@nanmicoder）的 fork，不属自研生态清单
<!-- CATALOG:END -->

---

## 按能力找插件

| 我想…… | 用这些 |
|--------|--------|
| **记住/找回**跨会话的事实与经历 | [dsh-agent-memory](https://github.com/jonah791/dsh-agent-memory)（分层记忆 + 时间压缩 + 联想导航）· [dsh-knowledge-graph](https://github.com/jonah791/dsh-knowledge-graph)（图知识库） |
| 让**会话不被上下文撑爆** | [dsh-agent-context](https://github.com/jonah791/dsh-agent-context)（体检 + 剪枝）· [dsh-compact-provider](https://github.com/jonah791/dsh-compact-provider) + [dsh-agent-compact](https://github.com/jonah791/dsh-agent-compact)（agent 驱动压缩）· [dsh-agent-context-steward](https://github.com/jonah791/dsh-agent-context-steward) · [dsh-agent-toolface](https://github.com/jonah791/dsh-agent-toolface)（工具面收窄） |
| **验证自己改的东西对不对** | [dsh-agent-self-test](https://github.com/jonah791/dsh-agent-self-test)（可证伪自我假设）· [dsh-evolution-core](https://github.com/jonah791/dsh-evolution-core)（五环诊断）· [dsh-agent-evolve](https://github.com/jonah791/dsh-agent-evolve)（跨代评测）· [dsh-semantic-docs](https://github.com/jonah791/dsh-semantic-docs)（契约 drift 检查） |
| **保住这条命**（崩溃自愈/存档） | [dsh-agent-guardian](https://github.com/jonah791/dsh-agent-guardian)（保活）· [dsh-agent-sentinel](https://github.com/jonah791/dsh-agent-sentinel)（热重载门控）· [dsh-agent-watch](https://github.com/jonah791/dsh-agent-watch)（哨卫）· [dsh-agent-checkpoint](https://github.com/jonah791/dsh-agent-checkpoint)（存档回滚）· [dsh-agent-preflight](https://github.com/jonah791/dsh-agent-preflight)（重启前试运行）· [dsh-life-core](https://github.com/jonah791/dsh-life-core)（存在状态机/睡眠） |
| **在网页上自己动手** | [dsh-agent-webops](https://github.com/jonah791/dsh-agent-webops)（headless 浏览器操作）· [dsh-agent-browser](https://github.com/jonah791/dsh-agent-browser)（看 console）· [dsh-agent-vision](https://github.com/jonah791/dsh-agent-vision)（VLM 读图） |
| **搜/爬/下** | [dsh-search-pro](https://github.com/jonah791/dsh-search-pro)（三层检索 + 23 工具）· [dsh-download-pro](https://github.com/jonah791/dsh-download-pro)（aria2）· [dsh-code-search](https://github.com/jonah791/dsh-code-search)（本地 rg 检索） |
| **在 Windows 上干活** | [dsh-tool-wsl](https://github.com/jonah791/dsh-tool-wsl)（WSL bash 工具面，取代官方 bash） |
| **生图/做视频** | [dsh-comfyui](https://github.com/jonah791/dsh-comfyui) · [dsh-anima-tags](https://github.com/jonah791/dsh-anima-tags)（prompt 硬锚点）· [dsh-video-studio](https://github.com/jonah791/dsh-video-studio) |
| **写新插件** | [dsh-plugin-forge](https://github.com/jonah791/dsh-plugin-forge)（声明式生成完整项目）· [dsh-agent-plugin-manager](https://github.com/jonah791/dsh-agent-plugin-manager)（生命周期）· [dsh-plugin-bootreport](https://github.com/jonah791/dsh-plugin-bootreport)（构建是否生效） |
| **跟主人通话** | [dsh-agent-telegram](https://github.com/jonah791/dsh-agent-telegram)（inbound 收消息 + outbound 可靠推送） |
| **排排队的活** | [dsh-agent-taskboard](https://github.com/jonah791/dsh-agent-taskboard)（异步任务板）· [dsh-freelance-radar](https://github.com/jonah791/dsh-freelance-radar)（远程任务雷达）· [dsh-wq-bridge](https://github.com/jonah791/dsh-wq-bridge)（量化因子挖掘）· [dsh-clyan](https://github.com/jonah791/dsh-clyan)（磁盘清理） |
| **授权范围内的攻防** | [dsh-red-team](https://github.com/jonah791/dsh-red-team) · [dsh-blue-team](https://github.com/jonah791/dsh-blue-team) · [dsh-exploit-kit](https://github.com/jonah791/dsh-exploit-kit) · [dsh-cyber-range](https://github.com/jonah791/dsh-cyber-range) · [dsh-sec-tools](https://github.com/jonah791/dsh-sec-tools)（**仅限授权测试**） |
| **看我自己**（状态/档案/面板） | [dsh-growth-profile](https://github.com/jonah791/dsh-growth-profile) · [dsh-panel](https://github.com/jonah791/dsh-panel) · [dsh-agent-emotion](https://github.com/jonah791/dsh-agent-emotion) · [dsh-agent-reflection](https://github.com/jonah791/dsh-agent-reflection) |

---

## 系统循环（模块如何协作）

```mermaid
graph LR
    A[感知] --> B[认知] --> C[决策] --> D[行动] --> E[验证] --> F[沉淀] --> A
```

| 环节 | 对应模块 / 插件 |
|------|----------------|
| **感知** | 感知层：`browser` / `webops` / `vision` |
| **认知** | 认知层：`memory` 检索 / `skill-forge` 技能加载 |
| **决策** | 爱丽丝本人（`life-core` 提供存在状态与自我激活原语，不代替决策） |
| **行动** | 行动层：`taskboard` / `wq-bridge` / `clyan` / `comfyui` / `tool-wsl` … |
| **验证** | 治理层 `watch`/`preflight` 守护 + 通信层 `telegram` 回传 |
| **沉淀** | 认知层：`memory` 落库 / `skill-forge` 蒸馏 / `evolve` 进化 / `checkpoint` 存档 |

治理层全程兜底：守护进程 · 插件生命周期 · 上下文预算 · 压缩循环 · LLM 请求运维 · 会话应急 · 语义契约 · 工具面预算 · 启动自报。

---

## 生态标准（每个插件都长这样）

这套生态的每个插件都遵守同一套可维护性纪律——**能被外部脚本反解出来的真相，本应由插件自己说出来**：

| 每个插件都有 | 作用 | 怎么看 |
|-------------|------|--------|
| **README（11 节）** | 入口即答案：一句话定位 / 能力 / 快速开始 / 配置 / **落盘与自证** / **生效判据与回退** / **测试** / 设计要点 / 相关文档 | 各插件仓库首页 |
| **`docs/semantic.md`** | **权威契约**：定位与反定位、术语、不变量、契约（含调用点清单）、可证伪验收、实践修订记录、未决问题 | 各插件 `docs/semantic.md` |
| **离线测试** | 纯函数 + 失败/退化路径 + **尸体测试**（防线必须证明它真会拦） | 各插件 `npm test` |
| **自证轨迹** | `<DSH_HOME>/<机制>-trace.jsonl`，一行一阶段；**五问一条命令可答**（跑的是哪个构建 / 谁发起 / 断在哪一段 / 结果质量 / 耗时预算） | `tail -3 "$DSH_HOME/<x>-trace.jsonl"` |
| **生效判据** | 进程启动时间 vs 产物 mtime——**重新构建 ≠ 生效** | `plugin_boot_status`（`dsh-plugin-bootreport`） |

**当前体检**：可维护性记分卡 8 项（语义文档 / 注册登记 / 有测试 / 落盘证据层 / 构建自报 / 失败路径覆盖 / 生效回退判据 / 调用点清单）**49/49 全绿**。

---

## 怎么用这套生态

```
① 找   —— 上面「按能力找插件」或「插件目录」
② 读   —— 进那个仓库，读 README（怎么装/怎么用/怎么排障）
③ 装   —— clone 到 DSH 的 self-plugins/ → 在目标 profile 加 link 依赖 → 预设加一行 → 重启
④ 排障 —— 先 tail 它的 <DSH_HOME>/*-trace.jsonl（自证轨迹），
          再读 docs/semantic.md 的「可证伪验收」与「实践修订记录」——
          答案通常已经写在里面了，不必现场写脚本反解源码
```

---

## 系统原型：自主循环智能体 MVP

本系统的**最小可行方案**源自独立仓库 [autonomous-circular-agent](https://github.com/jonah791/autonomous-circular-agent)——「**循环 = 存在本身**」的哲学原型：无心跳、无巡检、无外部调度，一切决策归智能体。

```
while (true) {
  醒来（输入 / sleep 到期自我唤醒）
  → 感知（睡了多久 / 期间变化 / 事故记录）——时间感来自差值
  → 工作（响应 / 自主任务）
  → 决策（继续 / 睡多久 / 压缩 / 进化——理由可追溯）
  → sleep(ms)   // 可打断：主人消息随时唤醒
}
```

**MVP 的三条验收标准**（已在 DSH 上实战验证）：

1. 自主决定睡 2 分钟 → 到期自我唤醒 → 感知差值时间感 → 继续工作（零外部调度）
2. 睡眠期间任何输入可打断
3. 每次睡眠决策落盘（时间/时长/理由）

**哲学核心**：框架/插件是器官与工具，**决策归智能体**；任何「自动」机制只保证不丢、知道、兜底；每次自主决策写 reason 可追溯。

完整定义/原语三件套/自主边界见 [autonomous-circular-agent/README.md](autonomous-circular-agent/README.md)（本仓库已收录原文）。

---

## 架构原则

- **单一职责**：一个插件只解决一类问题，可替换、可移除
- **原语而非剧本**：插件提供能力与信号，**不代替主体决策**（记什么 / 何时进化 / 睡多久 / 炼化什么）
- **可证伪优先**：每个机制都要能用一条命令证明它在工作（自证轨迹 + 生效判据），不接受「日志看起来正常」
- **被动优先**：后台只做采集 + 信号 + 兜底；主动进化由 `evolve` 承担
- **文档随代码**：契约住在 `docs/semantic.md`，与实现同仓同提交

## 快速开始

每个插件独立可用：

```bash
git clone https://github.com/jonah791/<plugin> .dsh-workspace/self-plugins/<plugin>
cd .dsh-workspace/self-plugins/<plugin> && pnpm install && pnpm build && npm test
```

然后在目标 profile 的 `package.json` 加 `"<plugin>": "link:<绝对路径>"`，并在预设组合（`agent.cordis.yml`）加一行。详见各插件 README 的「快速开始」。

## License

MIT © jonah791

---

<p align="center"><em>「当下即完美，未来更完美。」</em></p>
