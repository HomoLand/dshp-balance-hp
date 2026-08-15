# dshp-balance-hp · DeepSeek 余额血量条

DSH Web GUI 的余额显示插件：把 DeepSeek 余额做成游戏式「HP 条」。

- **HP** = 当前余额；**上限** = 余额 + 今日消耗（估算，可在界面点 ✎ 同步平台值）
- 每 5 分钟自动刷新，余额变化自动累计今日消耗（充值不计入）
- 全部配置持久化到 DSH 工作区 `.dsh-balance-history.json`，重启不丢

## 皮肤（设置 → 余额血条）

| 皮肤 | 样式 |
|---|---|
| 默认简洁 | 跟随主题状态色的进度条 |
| Minecraft | 10 颗像素红心（半心精度），显示在输入框上方 |
| 暗黑破坏神 | 金币血球 + 暗金细条，悬浮为大号液面血球 |
| 守望先锋 | 整格量化血条（每格金额可调 ¥1/2/2.5/5/10） |
| 三国杀 | 太极半形勾玉（鱼眼在头，默认 -10°），数量 3/4/5/6/8/10 可调，低血量 2 玉橙 / 1 玉红 |

## 安装

本插件是 DSH 动态 Cordis 插件（客户端 + 宿主半区）。两种安装方式：

### A. 动态安装（推荐，适用于本机 / 任意 DSH 实例）

在 DSH 会话中使用 `cordis_define` 创建插件，代码取自：

- Host 半区：`dist/host.raw.js`
- Client 半区：`dist/client.raw.js`

然后 `cordis_run` 激活（首次需在 Web 界面 Run 卡片授权）。

### B. 静态挂载（Host 组合）

将本包安装到部署可解析的位置（如 node_modules），然后在宿主组合补丁
（部署的 `cordis.patch.yml`）中追加：

```yaml
- id: dshp-balance-hp
  name: dshp-balance-hp
```

宿主 `apply(ctx)` 使用 `ctx.get('fs'|'shell'|'credentials'|'sandboxPolicy')` 与
`harness.handle`，需在提供这些服务的宿主环境中运行；Web 客户端半区需由
DSH Web 客户端运行器注入。

## 数据与安全

- 只读余额：`GET https://api.deepseek.com/user/balance`（Bearer 方式，密钥经宿主 `credentials` 解析，不落盘）
- 本地写入仅 `.dsh-balance-history.json`（余额采样、今日基准、配置）
- 无任何外发网络请求，除余额查询外

## 开发

- `src/host.js` — 宿主半区（余额拉取、消耗累计、配置持久化、RPC 处理器）
- `src/client.js` — 客户端半区（5 种皮肤、勾玉 SVG 路径、设置界面）
- 勾玉几何：标准太极半形（大圆 r45 + S 线两段 r22.5），鱼眼 r6.75 位于头部；
  基准姿态为镜像 + 顺时针 45°（S 线头/尾凸点同处 x=50 垂直线），默认再叠加 -10°。

## TODO

- [ ] 优化充值后血量逻辑：充值会使余额跳升，当前「上限 = 余额 + 今日消耗」的口径下，充值会同步抬高上限；需明确充值事件的处理（识别并记录充值、调整今日消耗/上限基准口径、展示净变动），避免充值后血量比例与消耗数字口径不一致。

## License

MIT
