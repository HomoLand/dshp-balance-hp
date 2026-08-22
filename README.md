# dshp-balance-hp · DeepSeek 余额血量条（v1.0.1 静态插件）

DSH Web GUI 的余额显示插件：把 DeepSeek 余额做成游戏式「HP 条」。

- **HP** = 当前余额；**上限** = 余额 + 今日消耗（估算，可在界面点 ✎ 同步平台值）
- 每 5 分钟自动刷新，余额变化自动累计今日消耗（充值不计入）
- 全部配置持久化到 DSH 工作区 `.dsh-balance-history.json`，重启不丢

![效果图](assets/效果图.png)

## 皮肤（设置 → 余额血条）

| 皮肤 | 样式 |
|---|---|
| 默认简洁 | 跟随主题状态色的进度条 |
| Minecraft | 10 颗像素红心（半心精度），显示在输入框上方 |
| 暗黑破坏神 | 金币血球 + 暗金细条，悬浮为大号液面血球 |
| 守望先锋 | 整格量化血条（每格金额可调 ¥1/2/2.5/5/10） |
| 三国杀 | 太极半形勾玉（鱼眼在头，默认 -10°），数量 3/4/5/6/8/10 可调，低血量 2 玉橙 / 1 玉红 |

## 安装

### A. 静态安装（推荐，与其他插件一致）

本包是标准 DSH 双半区插件包：宿主半区为 `TypertRemoteService`（`lib/host.js`），
客户端半区为 `window.__ModuleLoader__` bundle（`lib/client.js`），
自带组合补丁 `cordis.patch.yml`（安装即注入 `- id: dshp-balance-hp` 行）。

安装步骤（以 `profiles/web` 为例）：

```bash
# 1. 把包放入 profile 的 node_modules
mkdir -p /opt/dsh/profiles/web/node_modules/dshp-balance-hp
cp -r package.json lib cordis.patch.yml /opt/dsh/profiles/web/node_modules/dshp-balance-hp/

# 2. 把包名加入 profile 的 bundle 列表（package.json → dsh.profile.bundles）
#    "dshp-balance-hp"

# 3. 重启 Web 生效
sudo systemctl restart dsh
```

依赖 `@deepseek-ai/dsh-typert-protocol` 从部署根向上解析（已随 DSH 安装）。
若使用官方流程：`dsh plugin --profile web add dshp-balance-hp`（pnpm 转发）。

### B. 动态安装（开发/调试用）

在 DSH 会话中使用 `cordis_define` 创建插件，代码取自：

- Host 半区：`dist/host.raw.js`
- Client 半区：`dist/client.raw.js`

然后 `cordis_run` 激活（首次需在 Web 界面 Run 卡片授权）。

## 数据与安全

- 只读余额：`GET https://api.deepseek.com/user/balance`（Bearer 方式，密钥经宿主 `credentials` 解析，不落盘）
- 本地写入仅 `.dsh-balance-history.json`（余额采样、今日基准、配置）
- 无任何外发网络请求，除余额查询外

## 开发

- `lib/host.js` — 宿主半区（`BalanceGateway extends TypertRemoteService`，5 个 Remote 端点：get-state/refresh/set-today-base/clear-today-base/set-config；余额拉取、消耗累计、配置持久化）
- `lib/client.js` — 客户端 bundle（`window.__ModuleLoader__.load`；5 种皮肤、勾玉 SVG 路径、设置界面、经 `ctx.remote.dshpBalance` 调宿主）
- `src/`、`dist/` — 动态安装（调试）用源码与原文
- 勾玉几何：标准太极半形（大圆 r45 + S 线两段 r22.5），鱼眼 r6.75 位于头部；
  基准姿态为镜像 + 顺时针 45°（S 线头/尾凸点同处 x=50 垂直线），默认再叠加 -10°。

## TODO

- [ ] 优化充值后血量逻辑：充值会使余额跳升，当前「上限 = 余额 + 今日消耗」的口径下，充值会同步抬高上限；需明确充值事件的处理（识别并记录充值、调整今日消耗/上限基准口径、展示净变动），避免充值后血量比例与消耗数字口径不一致。

## License

MIT
