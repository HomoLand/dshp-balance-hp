// dshp-balance-hp — Host 半区（静态插件）
// 以 TypertRemoteService 暴露 5 个 Remote 端点；客户端经 ctx.remote.dshpBalance.* 调用。
import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol'

/** 纯 JS 模拟 @Remote 装饰器：把方法标记为 Remote 导出（marker 挂在原型上）。 */
function markRemote(proto, methodName, exportName) {
  const initializers = []
  Remote(exportName)(proto[methodName], {
    kind: 'method',
    name: methodName,
    addInitializer: (fn) => initializers.push(fn),
  })
  const dummy = Object.create(proto)
  for (const init of initializers) init.call(dummy)
}

const DAY = 86400000
const SKINS = ['default', 'minecraft', 'diablo', 'overwatch', 'sanguosha']
const POSITIONS = ['dock', 'float-left']

class BalanceGateway extends TypertRemoteService {
  static inject = ['timer']

  constructor(ctx) {
    super(ctx, 'dshpBalance')
    this.history = []
    this.todayBase = null
    this.config = { skin: 'default', position: 'dock', jades: 5, owUnit: 2.5, jadeRot: -10 }
    this.historyReady = false
    this.state = {
      balance: null,
      currency: 'CNY',
      isAvailable: false,
      updatedAt: null,
      error: null,
      fetching: false,
    }
    let historyFile = '/tmp/dsh-balance-history.json'
    const sandboxPolicy = ctx.get('sandboxPolicy')
    if (sandboxPolicy !== undefined && typeof sandboxPolicy.workspaceRoot === 'string' && sandboxPolicy.workspaceRoot.length > 0) {
      historyFile = sandboxPolicy.workspaceRoot.replace(/\/+$/, '') + '/.dsh-balance-history.json'
    }
    this.historyFile = historyFile
    this.round4 = (n) => Math.round(n * 10000) / 10000
    this._start()
  }

  localDayStr(ts) {
    const d = new Date(ts)
    const pad = (x) => (x < 10 ? '0' + x : String(x))
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
  }

  async _start() {
    await this.loadHistory()
    this.ctx.setInterval(() => { this.fetchBalance() }, 300000)
    this.fetchBalance()
  }

  async loadHistory() {
    const fs = this.ctx.get('fs')
    if (fs !== undefined) {
      try {
        const target = await fs.resolve(this.historyFile)
        const info = await fs.stat(target)
        if (info !== undefined && info.type === 'file') {
          const text = await fs.readText(target)
          const parsed = JSON.parse(text)
          if (parsed !== null && typeof parsed === 'object') {
            if (Array.isArray(parsed.history)) {
              this.history = parsed.history.filter((p) => (
                p !== null && typeof p === 'object' && typeof p.ts === 'number' && typeof p.balance === 'number'
              )).slice(-3000)
            }
            if (parsed.todayBase !== undefined && parsed.todayBase !== null && typeof parsed.todayBase === 'object' && typeof parsed.todayBase.day === 'string' && typeof parsed.todayBase.ts === 'number' && typeof parsed.todayBase.base === 'number') {
              this.todayBase = { day: parsed.todayBase.day, ts: parsed.todayBase.ts, base: parsed.todayBase.base }
            }
            if (parsed.config !== undefined && parsed.config !== null && typeof parsed.config === 'object') {
              const cfg = parsed.config
              if (typeof cfg.skin === 'string' && SKINS.indexOf(cfg.skin) >= 0) this.config.skin = cfg.skin
              if (typeof cfg.position === 'string' && POSITIONS.indexOf(cfg.position) >= 0) this.config.position = cfg.position
              if (typeof cfg.jades === 'number' && Number.isInteger(cfg.jades) && cfg.jades >= 1 && cfg.jades <= 20) this.config.jades = cfg.jades
              if (typeof cfg.owUnit === 'number' && Number.isFinite(cfg.owUnit) && cfg.owUnit >= 0.5 && cfg.owUnit <= 20) this.config.owUnit = cfg.owUnit
              if (typeof cfg.jadeRot === 'number' && Number.isFinite(cfg.jadeRot) && cfg.jadeRot >= -360 && cfg.jadeRot <= 360) this.config.jadeRot = cfg.jadeRot
            }
          }
        }
      } catch (error) {
        console.error('dshp: load history failed', error)
      }
    }
    this.historyReady = true
  }

  persistHistory() {
    const fs = this.ctx.get('fs')
    if (fs === undefined || !this.historyReady) return
    fs.resolve(this.historyFile).then((target) => (
      fs.writeText(target, JSON.stringify({ version: 1, history: this.history.slice(-3000), todayBase: this.todayBase, config: this.config }))
    )).catch((error) => {
      console.error('dshp: save history failed', error)
    })
  }

  startOfToday(now) {
    const d = new Date(now)
    d.setHours(0, 0, 0, 0)
    return d.getTime()
  }

  consumptionSince(fromTs, now) {
    let spent = 0
    let prevTs = null
    let prevBal = null
    for (let i = 0; i < this.history.length; i++) {
      const p = this.history[i]
      if (p.ts > now) break
      if (prevTs === null) {
        prevTs = p.ts
        prevBal = p.balance
        continue
      }
      if (p.ts < fromTs) {
        prevTs = p.ts
        prevBal = p.balance
        continue
      }
      let baseBal = prevBal
      if (prevTs < fromTs) {
        const span = p.ts - prevTs
        if (span > 0) {
          const f = (fromTs - prevTs) / span
          baseBal = prevBal + (p.balance - prevBal) * f
        }
      }
      const delta = baseBal - p.balance
      if (delta > 0) spent += delta
      prevTs = p.ts
      prevBal = p.balance
    }
    return spent
  }

  recordSample(balance) {
    const now = Date.now()
    const last = this.history.length > 0 ? this.history[this.history.length - 1] : null
    if (last === null || (now - last.ts > 30000 && Math.abs(last.balance - balance) > 1e-9)) {
      this.history.push({ ts: now, balance: this.round4(balance) })
      if (this.history.length > 3000) this.history = this.history.slice(-3000)
      this.persistHistory()
    }
  }

  async fetchBalance() {
    if (this.state.fetching) return
    this.state.fetching = true
    try {
      const credentials = this.ctx.get('credentials')
      const shell = this.ctx.get('shell')
      if (credentials === undefined || shell === undefined) {
        this.state.error = '缺少宿主服务 (credentials/shell)'
        return
      }
      let apiKey = null
      try {
        const hit = await credentials.resolve('DEEPSEEK_API_KEY')
        if (hit !== undefined && hit !== null && typeof hit.value === 'string' && hit.value.length > 0) apiKey = hit.value
      } catch (error) {
        console.error('dshp: credential resolve failed', error)
      }
      if (apiKey === null) {
        this.state.error = '未找到 DeepSeek API Key'
        return
      }
      const spec = shell.resolve({
        command: 'curl -sS --max-time 20 "https://api.deepseek.com/user/balance" -H "Authorization: Bearer $DSH_BAL_KEY"',
        env: { DSH_BAL_KEY: apiKey },
        timeoutMs: 30000,
        stdoutMaxBytes: 65536,
      })
      const result = await shell.run(spec)
      if (result.sandbox !== undefined && result.sandbox.denied === true) {
        this.state.error = '沙箱拒绝执行命令'
        return
      }
      if (result.exitCode !== 0) {
        const errText = result.stderr !== undefined && typeof result.stderr.text === 'string' ? result.stderr.text.trim() : ''
        this.state.error = '请求失败: ' + (errText.length > 0 ? errText.slice(0, 200) : 'exit ' + String(result.exitCode))
        return
      }
      const text = result.stdout !== undefined && typeof result.stdout.text === 'string' ? result.stdout.text.trim() : ''
      let parsed = null
      try {
        parsed = JSON.parse(text)
      } catch (error) {
        parsed = null
      }
      if (parsed === null || typeof parsed !== 'object' || !Array.isArray(parsed.balance_infos) || parsed.balance_infos.length === 0) {
        const apiMsg = parsed !== null && typeof parsed === 'object' && parsed.error !== undefined && parsed.error !== null && typeof parsed.error === 'object' && typeof parsed.error.message === 'string' ? parsed.error.message : ''
        this.state.error = '余额接口异常' + (apiMsg.length > 0 ? ': ' + apiMsg : '')
        return
      }
      const info = parsed.balance_infos[0]
      const balance = parseFloat(info.total_balance)
      if (!Number.isFinite(balance)) {
        this.state.error = '余额字段解析失败'
        return
      }
      this.state.balance = balance
      this.state.currency = typeof info.currency === 'string' && info.currency.length > 0 ? info.currency : 'CNY'
      this.state.isAvailable = parsed.is_available === true
      this.state.updatedAt = Date.now()
      this.state.error = null
      this.recordSample(balance)
    } catch (error) {
      this.state.error = '网络错误: ' + String(error !== undefined && error !== null && error.message !== undefined ? error.message : error)
    } finally {
      this.state.fetching = false
    }
  }

  getState() {
    const now = Date.now()
    const dayStr = this.localDayStr(now)
    let consumption = this.round4(this.consumptionSince(this.startOfToday(now), now))
    let base = null
    let syncedAt = null
    if (this.todayBase !== null && this.todayBase.day === dayStr) {
      base = this.todayBase.base
      syncedAt = this.todayBase.ts
      consumption = this.round4(base + this.consumptionSince(this.todayBase.ts, now))
    }
    return {
      ok: true,
      balance: this.state.balance,
      currency: this.state.currency,
      isAvailable: this.state.isAvailable,
      updatedAt: this.state.updatedAt,
      error: this.state.error === null || this.state.error === undefined ? null : String(this.state.error),
      today: { consumption: consumption, base: base, syncedAt: syncedAt },
      config: { skin: this.config.skin, position: this.config.position, jades: this.config.jades, owUnit: this.config.owUnit, jadeRot: this.config.jadeRot },
    }
  }

  async refresh() {
    await this.fetchBalance()
    return this.getState()
  }

  setTodayBase(args) {
    const value = args !== undefined && args !== null ? parseFloat(args.base) : NaN
    if (!Number.isFinite(value) || value < 0) return { ok: false, error: '无效的消耗金额' }
    const now = Date.now()
    this.todayBase = { day: this.localDayStr(now), ts: now, base: this.round4(value) }
    this.persistHistory()
    return this.getState()
  }

  clearTodayBase() {
    this.todayBase = null
    this.persistHistory()
    return this.getState()
  }

  setConfig(args) {
    if (args !== undefined && args !== null && typeof args === 'object') {
      if (typeof args.skin === 'string' && SKINS.indexOf(args.skin) >= 0) this.config.skin = args.skin
      if (typeof args.position === 'string' && POSITIONS.indexOf(args.position) >= 0) this.config.position = args.position
      if (typeof args.jades === 'number' && Number.isInteger(args.jades) && args.jades >= 1 && args.jades <= 20) this.config.jades = args.jades
      if (typeof args.owUnit === 'number' && Number.isFinite(args.owUnit) && args.owUnit >= 0.5 && args.owUnit <= 20) this.config.owUnit = args.owUnit
      if (typeof args.jadeRot === 'number' && Number.isFinite(args.jadeRot) && args.jadeRot >= -360 && args.jadeRot <= 360) this.config.jadeRot = args.jadeRot
    }
    this.persistHistory()
    return this.getState()
  }
}

markRemote(BalanceGateway.prototype, 'getState', 'getState')
markRemote(BalanceGateway.prototype, 'refresh', 'refresh')
markRemote(BalanceGateway.prototype, 'setTodayBase', 'setTodayBase')
markRemote(BalanceGateway.prototype, 'clearTodayBase', 'clearTodayBase')
markRemote(BalanceGateway.prototype, 'setConfig', 'setConfig')

export default BalanceGateway
