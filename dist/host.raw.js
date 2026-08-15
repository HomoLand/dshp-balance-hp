return {
  inject: ['timer'],
  apply(ctx) {
    const fs = ctx.get('fs')
    const shell = ctx.get('shell')
    const credentials = ctx.get('credentials')
    const sandboxPolicy = ctx.get('sandboxPolicy')

    const DAY = 86400000
    const SKINS = ['default', 'minecraft', 'diablo', 'overwatch', 'sanguosha']
    const POSITIONS = ['dock', 'float-left']
    let historyFile = '/tmp/dsh-balance-history.json'
    if (sandboxPolicy !== undefined && typeof sandboxPolicy.workspaceRoot === 'string' && sandboxPolicy.workspaceRoot.length > 0) {
      historyFile = sandboxPolicy.workspaceRoot.replace(/\/+$/, '') + '/.dsh-balance-history.json'
    }

    const state = {
      balance: null,
      currency: 'CNY',
      isAvailable: false,
      updatedAt: null,
      error: null,
      fetching: false,
    }

    let history = []
    let todayBase = null
    let config = { skin: 'default', position: 'dock', jades: 5, owUnit: 2.5, jadeRot: -10 }
    let historyReady = false

    const round4 = (n) => Math.round(n * 10000) / 10000

    function localDayStr(ts) {
      const d = new Date(ts)
      const pad = (x) => (x < 10 ? '0' + x : String(x))
      return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
    }

    async function loadHistory() {
      if (fs !== undefined) {
        try {
          const target = await fs.resolve(historyFile)
          const info = await fs.stat(target)
          if (info !== undefined && info.type === 'file') {
            const text = await fs.readText(target)
            const parsed = JSON.parse(text)
            if (parsed !== null && typeof parsed === 'object') {
              if (Array.isArray(parsed.history)) {
                history = parsed.history.filter((p) => (
                  p !== null && typeof p === 'object' && typeof p.ts === 'number' && typeof p.balance === 'number'
                )).slice(-3000)
              }
              if (parsed.todayBase !== undefined && parsed.todayBase !== null && typeof parsed.todayBase === 'object' && typeof parsed.todayBase.day === 'string' && typeof parsed.todayBase.ts === 'number' && typeof parsed.todayBase.base === 'number') {
                todayBase = { day: parsed.todayBase.day, ts: parsed.todayBase.ts, base: parsed.todayBase.base }
              }
              if (parsed.config !== undefined && parsed.config !== null && typeof parsed.config === 'object') {
                if (typeof parsed.config.skin === 'string' && SKINS.indexOf(parsed.config.skin) >= 0) config.skin = parsed.config.skin
                if (typeof parsed.config.position === 'string' && POSITIONS.indexOf(parsed.config.position) >= 0) config.position = parsed.config.position
                if (typeof parsed.config.jades === 'number' && Number.isInteger(parsed.config.jades) && parsed.config.jades >= 1 && parsed.config.jades <= 20) config.jades = parsed.config.jades
                if (typeof parsed.config.owUnit === 'number' && Number.isFinite(parsed.config.owUnit) && parsed.config.owUnit >= 0.5 && parsed.config.owUnit <= 20) config.owUnit = parsed.config.owUnit
                if (typeof parsed.config.jadeRot === 'number' && Number.isFinite(parsed.config.jadeRot) && parsed.config.jadeRot >= -360 && parsed.config.jadeRot <= 360) config.jadeRot = parsed.config.jadeRot
              }
            }
          }
        } catch (error) {
          console.error('dshp: load history failed', error)
        }
      }
      historyReady = true
    }

    const persistHistory = ctx.debounce(() => {
      if (fs === undefined || !historyReady) return
      fs.resolve(historyFile).then((target) => (
        fs.writeText(target, JSON.stringify({ version: 1, history: history.slice(-3000), todayBase: todayBase, config: config }))
      )).catch((error) => {
        console.error('dshp: save history failed', error)
      })
    }, 2000)

    function startOfToday(now) {
      const d = new Date(now)
      d.setHours(0, 0, 0, 0)
      return d.getTime()
    }

    function consumptionSince(fromTs, now) {
      let spent = 0
      let prevTs = null
      let prevBal = null
      for (let i = 0; i < history.length; i++) {
        const p = history[i]
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

    function recordSample(balance) {
      const now = Date.now()
      const last = history.length > 0 ? history[history.length - 1] : null
      if (last === null || (now - last.ts > 30000 && Math.abs(last.balance - balance) > 1e-9)) {
        history.push({ ts: now, balance: round4(balance) })
        if (history.length > 3000) history = history.slice(-3000)
        persistHistory()
      }
    }

    async function fetchBalance() {
      if (state.fetching) return
      state.fetching = true
      try {
        if (credentials === undefined || shell === undefined) {
          state.error = '缺少宿主服务 (credentials/shell)'
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
          state.error = '未找到 DeepSeek API Key'
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
          state.error = '沙箱拒绝执行命令'
          return
        }
        if (result.exitCode !== 0) {
          const errText = result.stderr !== undefined && typeof result.stderr.text === 'string' ? result.stderr.text.trim() : ''
          state.error = '请求失败: ' + (errText.length > 0 ? errText.slice(0, 200) : 'exit ' + String(result.exitCode))
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
          state.error = '余额接口异常' + (apiMsg.length > 0 ? ': ' + apiMsg : '')
          return
        }
        const info = parsed.balance_infos[0]
        const balance = parseFloat(info.total_balance)
        if (!Number.isFinite(balance)) {
          state.error = '余额字段解析失败'
          return
        }
        state.balance = balance
        state.currency = typeof info.currency === 'string' && info.currency.length > 0 ? info.currency : 'CNY'
        state.isAvailable = parsed.is_available === true
        state.updatedAt = Date.now()
        state.error = null
        recordSample(balance)
      } catch (error) {
        state.error = '网络错误: ' + String(error !== undefined && error !== null && error.message !== undefined ? error.message : error)
      } finally {
        state.fetching = false
      }
    }

    function getState(args) {
      const now = Date.now()
      const dayStr = localDayStr(now)
      let consumption = round4(consumptionSince(startOfToday(now), now))
      let base = null
      let syncedAt = null
      if (todayBase !== null && todayBase.day === dayStr) {
        base = todayBase.base
        syncedAt = todayBase.ts
        consumption = round4(base + consumptionSince(todayBase.ts, now))
      }
      return {
        ok: true,
        balance: state.balance,
        currency: state.currency,
        isAvailable: state.isAvailable,
        updatedAt: state.updatedAt,
        error: state.error === null || state.error === undefined ? null : String(state.error),
        today: { consumption: consumption, base: base, syncedAt: syncedAt },
        config: { skin: config.skin, position: config.position, jades: config.jades, owUnit: config.owUnit, jadeRot: config.jadeRot },
      }
    }

    function safeGetState(args) {
      try {
        return getState(args)
      } catch (error) {
        return { ok: false, error: String(error !== undefined && error !== null && error.message !== undefined ? error.message : error) }
      }
    }

    harness.handle('get-state', (args) => safeGetState(args))
    harness.handle('refresh', async (args) => {
      await fetchBalance()
      return safeGetState(args)
    })
    harness.handle('set-today-base', (args) => {
      const value = args !== undefined && args !== null ? parseFloat(args.base) : NaN
      if (!Number.isFinite(value) || value < 0) return { ok: false, error: '无效的消耗金额' }
      const now = Date.now()
      todayBase = { day: localDayStr(now), ts: now, base: round4(value) }
      persistHistory()
      return safeGetState({})
    })
    harness.handle('clear-today-base', () => {
      todayBase = null
      persistHistory()
      return safeGetState({})
    })
    harness.handle('set-config', (args) => {
      if (args !== undefined && args !== null && typeof args === 'object') {
        if (typeof args.skin === 'string' && SKINS.indexOf(args.skin) >= 0) config.skin = args.skin
        if (typeof args.position === 'string' && POSITIONS.indexOf(args.position) >= 0) config.position = args.position
        if (typeof args.jades === 'number' && Number.isInteger(args.jades) && args.jades >= 1 && args.jades <= 20) config.jades = args.jades
        if (typeof args.owUnit === 'number' && Number.isFinite(args.owUnit) && args.owUnit >= 0.5 && args.owUnit <= 20) config.owUnit = args.owUnit
        if (typeof args.jadeRot === 'number' && Number.isFinite(args.jadeRot) && args.jadeRot >= -360 && args.jadeRot <= 360) config.jadeRot = args.jadeRot
      }
      persistHistory()
      return safeGetState({})
    })

    ctx.interval(() => { fetchBalance() }, 300000)

    loadHistory().then(() => fetchBalance())
  },
}