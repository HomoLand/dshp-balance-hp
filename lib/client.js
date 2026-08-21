window.__ModuleLoader__.load({
	id: "dshp-balance-hp",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const React = require("react");
		const CSS_ID = "dshp-balance-hp/styles";
		function injectStyles(css) {
			if (typeof document === "undefined") return;
			if (document.querySelector("style[data-plugin-css=\"" + CSS_ID + "\"]") !== null) return;
			const tag = document.createElement("style");
			tag.dataset.plugin = "dshp-balance-hp";
			tag.dataset.pluginCss = CSS_ID;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		const inject = ["slots", "remote"];
		async function apply(ctx) {
			await ctx.remote.$mount({
				package: "dshp-balance-hp",
				descriptors: [
					{ id: "dshp-balance-hp#dshpBalance/getState", service: "dshpBalance", namespace: "dshpBalance", method: "getState", invocation: { kind: "direct" }, parameters: [], result: { mode: "src-json" } },
					{ id: "dshp-balance-hp#dshpBalance/refresh", service: "dshpBalance", namespace: "dshpBalance", method: "refresh", invocation: { kind: "direct" }, parameters: [], result: { mode: "src-json" } },
					{ id: "dshp-balance-hp#dshpBalance/setTodayBase", service: "dshpBalance", namespace: "dshpBalance", method: "setTodayBase", invocation: { kind: "direct" }, parameters: [{ name: "args", wire: "args", source: "json", codec: { mode: "src-json" } }], result: { mode: "src-json" } },
					{ id: "dshp-balance-hp#dshpBalance/clearTodayBase", service: "dshpBalance", namespace: "dshpBalance", method: "clearTodayBase", invocation: { kind: "direct" }, parameters: [], result: { mode: "src-json" } },
					{ id: "dshp-balance-hp#dshpBalance/setConfig", service: "dshpBalance", namespace: "dshpBalance", method: "setConfig", invocation: { kind: "direct" }, parameters: [{ name: "args", wire: "args", source: "json", codec: { mode: "src-json" } }], result: { mode: "src-json" } }
				]
			});

    const slots = ctx.slots
      const remote = ctx.remote
      const host = {
        call: async (method, args) => {
          const svc = remote !== undefined && remote !== null ? remote.dshpBalance : null
          if (svc === null || svc === undefined) throw new Error('dshp: remote service unavailable')
          let r = null
          if (method === 'get-state') r = await svc.getState()
          else if (method === 'refresh') r = await svc.refresh()
          else if (method === 'set-today-base') r = await svc.setTodayBase(args === null || args === undefined ? {} : args)
          else if (method === 'clear-today-base') r = await svc.clearTodayBase()
          else if (method === 'set-config') r = await svc.setConfig(args === null || args === undefined ? {} : args)
          else throw new Error('dshp: unknown method ' + method)
          if (r === null || r === undefined || r.ok !== true) {
            const err = r !== null && r !== undefined && r.error !== undefined ? r.error : 'remote error'
            throw new Error(typeof err === 'string' ? err : (err !== null && err !== undefined && err.message !== undefined ? err.message : JSON.stringify(err)))
          }
          return r.value
        },
      }
    if (slots === undefined) return
    const timer = { interval: (fn, ms) => { const id = setInterval(fn, ms); return () => clearInterval(id) } }

    injectStyles(`
.dshp-strip{box-sizing:border-box;display:flex;align-items:center;gap:6px;min-width:0;width:calc(100% - var(--dsh-composer-side-clearance) - var(--dsh-composer-side-clearance) - var(--dsh-composer-dock-inset) - var(--dsh-composer-dock-inset));max-width:calc(var(--dsh-composer-card-max-width) - var(--dsh-composer-dock-inset) - var(--dsh-composer-dock-inset));margin:0 auto;font-size:11px;line-height:1;color:var(--dsw-alias-label-primary)}
.dshp-float{box-sizing:border-box;position:fixed;left:12px;bottom:150px;z-index:60;width:236px;pointer-events:auto;display:flex;flex-direction:column;gap:6px;padding:10px;border-radius:12px;background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l2);box-shadow:0 10px 28px rgba(0,0,0,.22);font-size:11px;line-height:1;color:var(--dsw-alias-label-primary)}
.dshp-float-head{display:flex;align-items:baseline;justify-content:space-between;gap:6px}
.dshp-float-title{font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary)}
.dshp-float-meta{font-size:10px;color:var(--dsw-alias-label-secondary);opacity:.85}
.dshp-float-row{display:flex;align-items:center;justify-content:flex-end;gap:6px}
.dshp-float-nums{display:flex;justify-content:center;align-items:baseline;gap:6px;flex-wrap:wrap;font-variant-numeric:tabular-nums;font-size:11px}
.dshp-float-hearts{display:flex;justify-content:center;padding:2px 0}
.dshp-track{position:relative;flex:1 1 auto;min-width:80px;height:22px;border-radius:8px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);overflow:hidden}
.dshp-float .dshp-track{min-width:0}
.dshp-fill{position:absolute;left:0;top:0;bottom:0;border-radius:7px;transition:width .6s ease,background-color .6s ease;box-shadow:inset 0 1px 0 rgba(255,255,255,.3)}
.dshp-fill.loading{width:30% !important;animation:dshp-pulse 1.2s ease-in-out infinite}
@keyframes dshp-pulse{50%{opacity:.45}}
.dshp-bar-text{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;min-width:0}
.dshp-pill{box-sizing:border-box;max-width:100%;display:inline-flex;align-items:center;gap:2px;background:color-mix(in srgb, var(--dsw-alias-bg-base) 72%, transparent);border:1px solid var(--dsw-alias-border-l1);border-radius:999px;padding:1px 9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;font-variant-numeric:tabular-nums}
.dshp-num{font-weight:600}
.dshp-consumed{color:var(--dsw-alias-label-secondary)}
.dshp-err{color:var(--dsw-alias-state-error-primary)}
.dshp-anchor{position:relative;flex:none;display:flex;align-items:center;outline:none}
.dshp-sync{flex:none;width:22px;height:22px;display:flex;align-items:center;justify-content:center;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:11px;line-height:1}
.dshp-sync:hover{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary)}
.dshp-sync.on{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary)}
.dshp-refresh{flex:none;width:22px;height:22px;display:flex;align-items:center;justify-content:center;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:12px;line-height:1}
.dshp-refresh:hover{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary)}
.dshp-refresh.busy{animation:dshp-spin 1s linear infinite}
@keyframes dshp-spin{to{transform:rotate(360deg)}}
.dshp-pop{position:absolute;bottom:calc(100% + 8px);right:0;z-index:30;width:264px;box-sizing:border-box;display:flex;flex-direction:column;gap:8px;padding:10px;border-radius:12px;background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l2);box-shadow:0 8px 24px rgba(0,0,0,.18);animation:dshp-pop-in .15s ease}
@keyframes dshp-pop-in{from{opacity:0;transform:translateY(4px)}}
.dshp-pop-title{font-size:11px;font-weight:600;color:var(--dsw-alias-label-primary)}
.dshp-pop-row{display:flex;align-items:center;gap:6px}
.dshp-pop-input{flex:1 1 auto;min-width:0;box-sizing:border-box;font:inherit;font-size:11px;line-height:1.6;padding:3px 8px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.dshp-pop-btn{flex:none;font:inherit;font-size:11px;line-height:1.6;padding:3px 10px;border-radius:8px;border:1px solid var(--dsw-alias-brand-primary);background:transparent;color:var(--dsw-alias-brand-primary);cursor:pointer}
.dshp-pop-btn.primary{background:var(--dsw-alias-brand-primary);color:#fff}
.dshp-pop-hint{font-size:10px;color:var(--dsw-alias-label-secondary);line-height:1.5}
.dshp-spacer{flex:1 1 auto;min-width:0}
@media (max-width:640px){.dshp-strip{flex-wrap:wrap}}
.dshp-hearts{display:flex;align-items:center;gap:1px;flex:none}
.dshp-heart-i{display:block;image-rendering:pixelated}
.dshp-heart-out{fill:#151515;stroke:#000;stroke-width:.5}
.dshp-heart-fill{fill:#e83030}
.dshp-row-dock{box-sizing:border-box;display:flex;align-items:center;gap:8px;width:calc(100% - var(--dsh-composer-side-clearance) - var(--dsh-composer-side-clearance));max-width:calc(var(--dsh-composer-card-max-width));margin:0 auto;min-width:0;padding:0 22px;font-size:11px;line-height:1;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-primary)}
.dshp-heart-money{color:var(--dsw-alias-label-secondary);white-space:nowrap}
.dshp-w.skin-minecraft.dshp-float{border-radius:0;background:linear-gradient(180deg,#a7a7a7,#8e8e8e);border:2px solid #3a3a3a;box-shadow:inset 0 0 0 2px #d2d2d2,0 10px 28px rgba(0,0,0,.4)}
.dshp-w.skin-minecraft.dshp-float .dshp-float-title{color:#262626;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.dshp-w.skin-minecraft.dshp-float .dshp-float-meta{color:#3f3f3f}
.dshp-w.skin-minecraft.dshp-float .dshp-num{color:#1f1f1f}
.dshp-w.skin-minecraft.dshp-float .dshp-consumed{color:#4a4a4a}
.dshp-w.skin-minecraft.dshp-float .dshp-err{color:#b01a1a}
.dshp-w.skin-minecraft.dshp-float .dshp-sync,.dshp-w.skin-minecraft.dshp-float .dshp-refresh{border-color:#3a3a3a;color:#262626}
.dshp-w.skin-minecraft.dshp-float .dshp-sync:hover,.dshp-w.skin-minecraft.dshp-float .dshp-refresh:hover{border-color:#1a1a1a;color:#000}
.dshp-w.skin-minecraft.dshp-float .dshp-sync.on{border-color:#1a7a1a;color:#1a7a1a}
.dshp-w.skin-diablo .dshp-track{border-radius:999px;border:2px solid #4d3f2e;background:linear-gradient(180deg,#160a06,#000);box-shadow:inset 0 2px 6px rgba(0,0,0,.9),0 0 6px rgba(212,160,23,.25)}
.dshp-w.skin-diablo .dshp-fill{border-radius:999px;box-shadow:inset 0 1px 2px rgba(255,255,255,.45),inset 0 -3px 6px rgba(0,0,0,.7);background:linear-gradient(180deg,#ffe08a 0%,#d4a017 55%,#8a6a10 100%)}
.dshp-w.skin-diablo .dshp-pill{background:rgba(24,16,6,.75);border-color:#5a4530;color:#f0d68a}
.dshp-w.skin-diablo .dshp-consumed{color:#b8a06a}
.dshp-w.skin-diablo .dshp-diablo-bar{height:16px}
.dshp-w.skin-diablo.dshp-float{background:linear-gradient(180deg,#241708,#0d0603);border-color:#5a4530}
.dshp-w.skin-diablo.dshp-float .dshp-float-title{color:#f0d68a}
.dshp-w.skin-diablo.dshp-float .dshp-float-meta{color:#b8a06a}
.dshp-orb{flex:none;width:24px;height:24px;box-sizing:border-box;position:relative;overflow:hidden;border-radius:50%;background:radial-gradient(circle at 35% 28%,#4a3a20,#0d0603 72%);border:2px solid #6b5636;box-shadow:inset 0 2px 6px rgba(0,0,0,.85),0 0 6px rgba(212,160,23,.3)}
.dshp-orb-liquid{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(180deg,#ffe08a 0%,#d4a017 55%,#8a6a10 100%);border-radius:46% 46% 0 0 / 10px 10px 0 0;transition:height .6s ease;box-shadow:inset 0 1px 1px rgba(255,255,255,.5)}
.dshp-orb-glass{position:absolute;left:14%;top:9%;width:32%;height:22%;border-radius:50%;background:rgba(255,255,255,.32);filter:blur(1px);pointer-events:none}
.dshp-orb-wrap{display:flex;justify-content:center;padding:6px 0 2px}
.dshp-orb-big{width:96px;height:96px;position:relative;overflow:hidden;border-radius:50%;background:radial-gradient(circle at 35% 28%,#4a3a20,#0d0603 72%);border:3px solid #6b5636;box-shadow:inset 0 3px 10px rgba(0,0,0,.9),0 0 14px rgba(212,160,23,.35)}
.dshp-orb-big .dshp-orb-liquid{border-radius:48% 48% 0 0 / 18px 18px 0 0}
.dshp-orb-big .dshp-orb-glass{width:34%;height:20%}
.dshp-w.skin-overwatch.dshp-float{background:rgba(10,19,34,.95);border-color:#22374f;box-shadow:0 10px 28px rgba(0,0,0,.4)}
.dshp-w.skin-overwatch.dshp-float .dshp-float-title{color:#9fb8d8}
.dshp-set{display:flex;flex-direction:column;gap:14px;max-width:560px;padding:4px 0}
.dshp-set-h{font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary)}
.dshp-opts{display:flex;flex-direction:column;gap:8px}
.dshp-opt{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);cursor:pointer}
.dshp-opt:hover{border-color:var(--dsw-alias-border-l2)}
.dshp-opt.on{border-color:var(--dsw-alias-brand-primary);box-shadow:inset 0 0 0 1px var(--dsw-alias-brand-primary)}
.dshp-opt-body{flex:1 1 auto;min-width:0}
.dshp-opt-name{font-size:12px;font-weight:600;color:var(--dsw-alias-label-primary)}
.dshp-opt-desc{font-size:10.5px;color:var(--dsw-alias-label-secondary)}
.dshp-mini{flex:none;width:96px}
.dshp-mini .dshp-track{height:12px;min-width:0}
.dshp-mini .dshp-fill{transition:none}
.dshp-jades{display:flex;align-items:center;gap:3px;flex:none}
.dshp-jade-i{display:block;filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.28))}
`)

    const SKINS = [
      { key: 'default', name: '默认简洁', desc: '跟随主题状态色（绿→黄→红）' },
      { key: 'minecraft', name: 'Minecraft', desc: '10 颗像素红心（半心精度）· 显示在输入框上方，装备栏风格' },
      { key: 'diablo', name: '暗黑破坏神', desc: '金币血球 + 暗金细条 · 悬浮为大号液面血球' },
      { key: 'overwatch', name: '守望先锋', desc: '两层：血量与上限按整格显示（向下取整） · 2px 真透明格缝 · 方格微圆角 · 每格金额可调' },
      { key: 'sanguosha', name: '三国杀', desc: '标准太极半形 · 鱼眼在头 · 默认旋转 -10°（设置中可调，顺时针为正）· 数量可调 · 四舍五入整枚点亮 · 低血量变色（2 玉橙 / 1 玉红）' },
    ]
    const POSITIONS = [
      { key: 'dock', name: '底部状态条', desc: '输入框下方，与上下文统计同宽（Minecraft/守望先锋皮肤显示在输入框上方）' },
      { key: 'float-left', name: '左侧悬浮', desc: '对话框左下方浮动卡片' },
    ]

    const fmt = (n) => (typeof n === 'number' && Number.isFinite(n) ? n.toFixed(2) : '--')

    function hpColor(pct) {
      if (pct <= 0.2) return 'var(--dsw-alias-state-error-primary)'
      if (pct <= 0.5) return 'var(--dsw-alias-state-warn-primary)'
      return 'var(--dsw-alias-state-success-primary)'
    }

    function clockText(ts) {
      if (typeof ts !== 'number' || !Number.isFinite(ts)) return ''
      const d = new Date(ts)
      const pad = (x) => (x < 10 ? '0' + x : String(x))
      return pad(d.getHours()) + ':' + pad(d.getMinutes())
    }

    function loadState() {
      return host.call('get-state', {}).catch((error) => ({ ok: false, error: String(error !== undefined && error !== null && error.message !== undefined ? error.message : error) }))
    }

    const HEART_PATH = 'M2 0 L4 0 L4 1 L5 1 L5 0 L7 0 L7 1 L8 1 L8 3 L7 4 L6 5 L5 6 L4 7 L3 6 L2 5 L1 4 L0 3 L0 1 L1 1 L1 0 Z'
    const HEART_HALF_PATH = 'M2 0 L4 0 L4 3 L3 4 L2 5 L1 4 L0 3 L0 1 L1 1 L1 0 Z'

    function HeartsRow(props) {
      const raw = typeof props.pct === 'number' ? props.pct : 0
      const pct = Math.min(1, Math.max(0, raw))
      const size = typeof props.size === 'number' ? props.size : 15
      const filledUnits = Math.round(pct * 20)
      const hearts = []
      for (let i = 0; i < 10; i++) {
        const units = Math.max(0, Math.min(2, filledUnits - i * 2))
        hearts.push(React.createElement('svg', {
          key: i,
          className: 'dshp-heart-i',
          width: size,
          height: size,
          viewBox: '0 0 9 8',
          shapeRendering: 'crispEdges',
        },
          React.createElement('path', { d: HEART_PATH, className: 'dshp-heart-out' }),
          units === 2 ? React.createElement('path', { d: HEART_PATH, className: 'dshp-heart-fill' }) : null,
          units === 1 ? React.createElement('path', { d: HEART_HALF_PATH, className: 'dshp-heart-fill' }) : null,
        ))
      }
      return React.createElement('div', { className: 'dshp-hearts' }, hearts)
    }

    const JADE_D = 'M 18.18 81.82 A 45 45 0 0 0 81.82 18.18 A 22.5 22.5 0 0 0 50 50 A 22.5 22.5 0 0 1 18.18 81.82 Z M 61.14 38.86 A 6.75 6.75 0 1 0 70.68 29.32 A 6.75 6.75 0 1 0 61.14 38.86 Z'
    const JADE_GLOSS = 'M 87.26 24.76 A 44.5 44.5 0 0 0 85.36 72.63 C 80.9 65.77 72.84 56.15 64.35 49.08 C 60.04 45.62 56.43 45.69 55.87 49.08 C 55.37 51.98 56.79 55.94 59.4 59.26 C 61.53 61.95 64.14 63.58 66.55 63.58 C 68.81 63.58 70.44 61.95 70.65 59.33 C 70.86 56.86 69.59 53.89 67.47 51.34 C 65.63 49.22 63.44 48.02 61.46 48.16 C 59.55 48.37 58.27 49.93 58.41 52.19 C 58.41 53.61 58.91 54.95 59.62 56.08 C 60.18 57.07 60.96 57.71 61.6 57.92 C 62.23 58.13 62.66 57.85 62.8 57.14 C 62.94 56.43 62.66 55.59 62.16 54.67 C 61.74 53.96 61.17 53.39 60.68 53.18 C 60.18 52.97 59.76 52.97 59.55 53.18 C 59.33 53.39 59.33 53.68 59.4 54.03 C 59.48 54.38 59.62 54.67 59.83 54.88 C 60.04 55.09 60.18 55.09 60.25 55.02 Z'

    function rotatePath(d, deg) {
      if (typeof deg !== 'number' || !Number.isFinite(deg) || deg === 0) return d
      const a = (deg % 360) * Math.PI / 180
      const c = Math.cos(a)
      const s = Math.sin(a)
      const num = (v) => String(Math.round(v * 100) / 100)
      const toks = d.match(/[MALCZ]|-?\d+(?:\.\d+)?/g)
      if (toks === null) return d
      const rp = (x, y) => {
        const dx = x - 50
        const dy = y - 50
        return [50 + dx * c - dy * s, 50 + dx * s + dy * c]
      }
      const out = []
      let i = 0
      while (i < toks.length) {
        const t = toks[i]
        if (t === 'M') {
          const p = rp(parseFloat(toks[i + 1]), parseFloat(toks[i + 2]))
          out.push('M', num(p[0]), num(p[1]))
          i += 3
        } else if (t === 'A') {
          const p = rp(parseFloat(toks[i + 6]), parseFloat(toks[i + 7]))
          out.push('A', toks[i + 1], toks[i + 2], toks[i + 3], toks[i + 4], toks[i + 5], num(p[0]), num(p[1]))
          i += 8
        } else if (t === 'C') {
          out.push('C')
          for (let k = 0; k < 3; k++) {
            const p = rp(parseFloat(toks[i + 1 + 2 * k]), parseFloat(toks[i + 2 + 2 * k]))
            out.push(num(p[0]), num(p[1]))
          }
          i += 7
        } else if (t === 'Z') {
          out.push('Z')
          i += 1
        } else {
          i += 1
        }
      }
      return out.join(' ')
    }

    const JADE_TONES = {
      green: { top: '#f0f9cd', mid: '#93d463', bot: '#41853c', stroke: '#1e4a23' },
      orange: { top: '#ffe8ae', mid: '#f0a02e', bot: '#bd5f10', stroke: '#8a4a10' },
      red: { top: '#ffd4c8', mid: '#e8523c', bot: '#9c2514', stroke: '#7a1a10' },
    }

    function Jade(props) {
      const filled = props.filled === true
      const size = props.size
      const uid = props.uid
      const rot = typeof props.rot === 'number' && Number.isFinite(props.rot) ? props.rot : 0
      const jd = rot === 0 ? JADE_D : rotatePath(JADE_D, rot)
      const jg = rot === 0 ? JADE_GLOSS : rotatePath(JADE_GLOSS, rot)
      const tone = JADE_TONES[props.tone] !== undefined ? JADE_TONES[props.tone] : JADE_TONES.green
      const gid = 'dshp-jg-' + uid + (filled ? '-f' : '-e')
      return React.createElement('svg', {
        className: 'dshp-jade-i',
        width: size,
        height: size,
        viewBox: '0 0 100 100',
      },
        React.createElement('defs', null,
          React.createElement('linearGradient', { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 },
            React.createElement('stop', { offset: '0%', stopColor: filled ? tone.top : '#5a626b' }),
            React.createElement('stop', { offset: '55%', stopColor: filled ? tone.mid : '#424a52' }),
            React.createElement('stop', { offset: '100%', stopColor: filled ? tone.bot : '#2d333a' }),
          ),
        ),
        React.createElement('path', {
          d: jd,
          fill: 'url(#' + gid + ')',
          stroke: filled ? tone.stroke : '#1c2025',
          strokeWidth: 1.7,
          strokeLinejoin: 'round',
          fillRule: 'evenodd',
        }),
        filled ? React.createElement('path', { d: jg, fill: '#ffffff', opacity: 0.5 }) : null,
      )
    }

    function JadeRow(props) {
      const raw = typeof props.pct === 'number' ? props.pct : 0
      const pct = Math.min(1, Math.max(0, raw))
      const size = typeof props.size === 'number' ? props.size : 20
      const uid = typeof props.uid === 'string' ? props.uid : 'r'
      const count = typeof props.count === 'number' && Number.isInteger(props.count) && props.count >= 1 ? props.count : 5
      const rot = typeof props.rot === 'number' && Number.isFinite(props.rot) ? props.rot : 0
      const filled = Math.max(0, Math.min(count, Math.round(pct * count)))
      const tone = filled >= 3 ? 'green' : filled === 2 ? 'orange' : filled === 1 ? 'red' : 'green'
      const jades = []
      for (let i = 0; i < count; i++) {
        jades.push(React.createElement(Jade, { key: i, uid: uid + '-' + i, filled: i < filled, size: size, tone: tone, rot: rot }))
      }
      return React.createElement('div', { className: 'dshp-jades' }, jades)
    }

    function OwBar(props) {
      const raw = typeof props.pct === 'number' ? props.pct : 0
      const pct = Math.min(1, Math.max(0, raw))
      const loading = props.loading === true
      const total = typeof props.total === 'number' && props.total > 0 ? props.total : null
      const height = typeof props.height === 'number' ? props.height : 22
      const minWidth = typeof props.minWidth === 'number' ? props.minWidth : 120
      const forceDark = props.forceDark === true
      const fillW = loading ? 30 : Math.round(pct * 1000) / 10
      const slant = 7
      const clip = 'polygon(' + slant + 'px 0px, 100% 0px, calc(100% - ' + slant + 'px) 100%, 0px 100%)'
      const skewDeg = Math.round(Math.atan2(-slant, height) * 180 / Math.PI * 10) / 10

      const DARK_PAL = { seg: '#eef5fb', maxSeg: '#7a8ba3' }
      const LIGHT_PAL = { seg: '#29435f', maxSeg: '#b9c7d8' }

      const probeRef = React.useRef(null)
      const [pal, setPal] = React.useState(forceDark ? DARK_PAL : LIGHT_PAL)

      const wrapRef = React.useRef(null)
      const [barW, setBarW] = React.useState(0)
      React.useEffect(() => {
        const el = wrapRef.current
        if (el === null) return
        const w = Math.round(el.getBoundingClientRect().width)
        if (w > 0 && Math.abs(w - barW) > 1) setBarW(w)
      })

      React.useEffect(() => {
        if (forceDark) {
          setPal((prev) => (prev === DARK_PAL ? prev : DARK_PAL))
          return
        }
        const el = probeRef.current
        if (el === null) return
        const view = el.ownerDocument !== undefined && el.ownerDocument.defaultView !== undefined ? el.ownerDocument.defaultView : null
        if (view === null) return
        let color = ''
        try { color = String(view.getComputedStyle(el).backgroundColor) } catch (e) { return }
        const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(color)
        if (m === null) return
        const lum = 0.2126 * Number(m[1]) + 0.7152 * Number(m[2]) + 0.0722 * Number(m[3])
        const next = lum < 128 ? DARK_PAL : LIGHT_PAL
        setPal((prev) => (prev === next ? prev : next))
      })

      const unit = typeof props.unit === 'number' && Number.isFinite(props.unit) && props.unit > 0 ? props.unit : 2.5
      const quantized = props.quantized === true
      const gapW = 2
      const phase = slant
      const B = barW > 40 ? barW : 600
      const radius = Math.max(1, Math.round(height * 0.09))

      let period = 35
      if (total !== null && barW > 40) {
        const raw = (barW * unit) / total
        period = quantized ? raw : Math.min(60, Math.max(8, raw))
      }
      let nCells = null
      let nBal = null
      if (quantized && total !== null && barW > 40) {
        nCells = Math.max(1, Math.round(total / unit))
        period = Math.max(gapW + 1.5, (B - slant + gapW) / nCells)
        nBal = typeof props.fillCells === 'number'
          ? Math.min(nCells, Math.max(0, Math.round(props.fillCells)))
          : Math.min(nCells, Math.max(0, Math.round((fillW / 100) * nCells)))
      }
      const segW = Math.max(1.5, period - gapW)

      const cells = []
      if (quantized && nCells !== null) {
        for (let i = 0; i < nCells; i++) {
          cells.push({
            key: i + ':c',
            left: phase + i * period,
            width: segW,
            color: i < nBal ? pal.seg : pal.maxSeg,
            squareLeft: false,
            squareRight: false,
            seam: false,
            side: null,
          })
        }
      } else {
        const fillPx = Math.max(0, (fillW / 100) * B)
        const i0 = Math.floor((0 - phase) / period)
        const i1 = Math.ceil((B - phase) / period)
        const effFill = fillPx + 0.01
        for (let i = i0; i <= i1; i++) {
          const left = phase + i * period
          const right = left + segW
          if (right <= 0 || left >= B) continue
          const wW = Math.min(right, effFill) - left
          const gLeft = Math.max(left, effFill)
          const gW = right - gLeft
          const w = Math.max(0, wW)
          const g = Math.max(0, gW)
          cells.push({ key: i + ':w', left: left, width: w, color: pal.seg, seam: g > 0, side: 'w', squareLeft: false, squareRight: false })
          cells.push({ key: i + ':g', left: gLeft, width: g, color: pal.maxSeg, seam: w > 0, side: 'g', squareLeft: false, squareRight: false })
        }
      }

      const baseStyle = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        transform: 'skewX(' + skewDeg + 'deg)',
        transformOrigin: 'left top',
        transition: 'width .6s ease, left .6s ease',
        borderRadius: radius + 'px',
      }

      return React.createElement('div', {
        ref: wrapRef,
        style: {
          position: 'relative',
          flex: '1 1 auto',
          minWidth: minWidth,
          height: height,
          boxSizing: 'border-box',
          opacity: loading ? 0.6 : 1,
          transition: 'opacity .4s ease',
          clipPath: clip,
        },
      },
        React.createElement('div', {
          ref: probeRef,
          style: {
            position: 'absolute',
            width: 1,
            height: 1,
            background: 'var(--dsw-alias-bg-base)',
            visibility: 'hidden',
            pointerEvents: 'none',
          },
        }),
        cells.map((c) => {
          const st = Object.assign({}, baseStyle)
          st.left = c.left + 'px'
          st.width = c.width + 'px'
          st.backgroundColor = c.color
          if (c.squareLeft === true) {
            st.borderTopLeftRadius = 0
            st.borderBottomLeftRadius = 0
          }
          if (c.squareRight === true) {
            st.borderTopRightRadius = 0
            st.borderBottomRightRadius = 0
          }
          if (c.seam === true) {
            if (c.side === 'w') {
              st.borderTopRightRadius = 0
              st.borderBottomRightRadius = 0
            } else {
              st.borderTopLeftRadius = 0
              st.borderBottomLeftRadius = 0
            }
          }
          return React.createElement('div', { key: c.key, style: st })
        }),
      )
    }

    function useBalance() {
      const [state, setState] = React.useState(null)
      const [busy, setBusy] = React.useState(false)
      React.useEffect(() => {
        let alive = true
        const load = async () => {
          const res = await loadState()
          if (alive) setState(res)
        }
        load()
        let stop = null
        stop = timer.interval(() => { load() }, 20000)
        return () => {
          alive = false
          if (stop !== null) stop()
        }
      }, [])
      const refresh = async () => {
        if (busy) return
        setBusy(true)
        try {
          const res = await host.call('refresh', {})
          setState(res)
        } catch (error) {
          setState({ ok: false, error: String(error !== undefined && error !== null && error.message !== undefined ? error.message : error) })
        } finally {
          setBusy(false)
        }
      }
      return { state, setState, busy, refresh }
    }

    function SyncControls(props) {
      const state = props.state
      const setState = props.setState
      const refresh = props.refresh
      const busy = props.busy === true
      const anchored = props.anchored === true
      const base = props.base
      const syncedAt = props.syncedAt
      const [open, setOpen] = React.useState(false)
      const [inputValue, setInputValue] = React.useState('')

      const applySync = async () => {
        const v = parseFloat(inputValue)
        if (!Number.isFinite(v) || v < 0) return
        try {
          const res = await host.call('set-today-base', { base: v })
          setState(res)
          setOpen(false)
          setInputValue('')
        } catch (err) {
          setState({ ok: false, error: String(err !== undefined && err !== null && err.message !== undefined ? err.message : err) })
        }
      }

      const clearSync = async () => {
        try {
          const res = await host.call('clear-today-base', {})
          setState(res)
          setOpen(false)
        } catch (err) {
          setState({ ok: false, error: String(err !== undefined && err !== null && err.message !== undefined ? err.message : err) })
        }
      }

      const popup = open ? React.createElement('div', { className: 'dshp-pop' },
        React.createElement('div', { className: 'dshp-pop-title' }, '同步今日消耗'),
        anchored ? React.createElement('div', { className: 'dshp-pop-hint' }, '当前基准 ¥' + fmt(base) + ' · ' + clockText(syncedAt) + ' 同步') : null,
        React.createElement('div', { className: 'dshp-pop-row' },
          React.createElement('input', {
            className: 'dshp-pop-input',
            type: 'number',
            min: 0,
            step: 0.01,
            placeholder: anchored ? '重新填写平台值' : '平台今日消耗（元）',
            value: inputValue,
            onChange: (e) => setInputValue(e.target.value),
            onKeyDown: (e) => { if (e.key === 'Enter') applySync() },
          }),
          React.createElement('button', { type: 'button', className: 'dshp-pop-btn primary', onClick: applySync }, '应用'),
        ),
        anchored ? React.createElement('button', { type: 'button', className: 'dshp-pop-btn', onClick: clearSync }, '清除基准') : null,
        React.createElement('div', { className: 'dshp-pop-hint' }, '填写 DeepSeek 平台显示的今日消耗；插件以该值为基准，按余额差值自动累计，充值不会计入消耗。'),
      ) : null

      return React.createElement(React.Fragment, null,
        React.createElement('div', {
          className: 'dshp-anchor',
          tabIndex: -1,
          onBlur: (e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false) },
          onKeyDown: (e) => { if (e.key === 'Escape') setOpen(false) },
        },
          React.createElement('button', {
            type: 'button',
            className: 'dshp-sync' + (anchored ? ' on' : ''),
            title: anchored ? '已同步（点击修改）' : '同步平台今日消耗',
            onClick: () => setOpen((v) => !v),
          }, '✎'),
          popup,
        ),
        React.createElement('button', {
          type: 'button',
          className: 'dshp-refresh' + (busy ? ' busy' : ''),
          title: '立即刷新',
          onClick: refresh,
        }, '↻'),
      )
    }

    function Widget(props) {
      const isFloat = props.float === true
      const { state, setState, busy, refresh } = useBalance()

      const config = state !== null && state !== undefined && state.config !== undefined && state.config !== null ? state.config : { skin: 'default', position: 'dock' }
      const skin = typeof config.skin === 'string' ? config.skin : 'default'
      const position = typeof config.position === 'string' ? config.position : 'dock'
      const jadeCount = typeof config.jades === 'number' && Number.isInteger(config.jades) && config.jades >= 1 ? config.jades : 5
      const owUnit = typeof config.owUnit === 'number' && Number.isFinite(config.owUnit) && config.owUnit > 0 ? config.owUnit : 2.5
      const jadeRot = typeof config.jadeRot === 'number' && Number.isFinite(config.jadeRot) ? config.jadeRot : 0

      if (isFloat && position !== 'float-left') return null
      if (!isFloat && position !== 'dock') return null
      if (!isFloat && (skin === 'minecraft' || skin === 'overwatch' || skin === 'sanguosha')) return null

      const balance = state !== null && state !== undefined && typeof state.balance === 'number' && Number.isFinite(state.balance) ? state.balance : null
      const error = state !== null && state !== undefined && state.error !== undefined && state.error !== null ? String(state.error) : null
      const loading = state === null
      const today = state !== null && state !== undefined && state.today !== undefined && state.today !== null ? state.today : null
      const consumption = today !== null && typeof today.consumption === 'number' ? today.consumption : 0
      const base = today !== null && typeof today.base === 'number' ? today.base : null
      const syncedAt = today !== null && typeof today.syncedAt === 'number' ? today.syncedAt : null
      const anchored = base !== null

      const maxHp = balance !== null ? balance + consumption : null
      const pct = balance !== null && maxHp !== null && maxHp > 0 ? Math.min(1, Math.max(0, balance / maxHp)) : 1
      const owNMax = maxHp !== null ? Math.max(1, Math.floor(maxHp / owUnit)) : null
      const owTotal = owNMax !== null ? owNMax * owUnit : null
      const owNBal = balance !== null && owNMax !== null ? Math.min(owNMax, Math.max(0, Math.floor(balance / owUnit))) : null
      const owPct = owNBal !== null && owNMax !== null ? owNBal / owNMax : pct

      const barFillStyle = { width: (pct * 100).toFixed(1) + '%' }
      if (skin === 'default') barFillStyle.backgroundColor = hpColor(pct)
      const liquidStyle = { height: ((pct * 100).toFixed(1)) + '%' }

      let pillChildren = null
      if (loading) {
        pillChildren = React.createElement('span', null, '…')
      } else if (error !== null) {
        pillChildren = React.createElement('span', { className: 'dshp-err' }, '⚠ ' + error)
      } else {
        pillChildren = [
          React.createElement('span', { className: 'dshp-num' }, '¥' + fmt(balance) + ' / ¥' + fmt(maxHp)),
          React.createElement('span', { className: 'dshp-consumed' }, ' · 今日 -¥' + fmt(consumption)),
        ]
      }

      let numChildren = null
      if (loading) {
        numChildren = React.createElement('span', null, '…')
      } else if (error !== null) {
        numChildren = React.createElement('span', { className: 'dshp-err' }, '⚠ ' + error)
      } else {
        numChildren = [
          React.createElement('span', { className: 'dshp-num' }, '¥' + fmt(balance) + ' / ¥' + fmt(maxHp)),
          React.createElement('span', { className: 'dshp-consumed' }, '今日 -¥' + fmt(consumption)),
        ]
      }

      let tooltip = 'DeepSeek 余额'
      if (state !== null && state !== undefined && typeof state.updatedAt === 'number') {
        tooltip += ' · 更新 ' + clockText(state.updatedAt)
      }
      if (anchored) {
        tooltip += ' · 今日基准 ¥' + fmt(base) + '（' + clockText(syncedAt) + ' 同步）'
      } else {
        tooltip += ' · 今日为本地估算，点 ✎ 同步平台数据'
      }
      if (error !== null) tooltip += ' · ' + error

      const bar = React.createElement('div', { className: 'dshp-track' + (skin === 'diablo' ? ' dshp-diablo-bar' : '') },
        React.createElement('div', {
          className: 'dshp-fill' + (loading ? ' loading' : ''),
          style: barFillStyle,
        }),
        React.createElement('div', { className: 'dshp-bar-text' },
          React.createElement('span', { className: 'dshp-pill' }, pillChildren),
        ),
      )

      const orbLiquid = React.createElement('div', { className: 'dshp-orb-liquid', style: liquidStyle })
      const orbSmall = React.createElement('div', { className: 'dshp-orb' },
        orbLiquid,
        React.createElement('div', { className: 'dshp-orb-glass' }),
      )

      const syncProps = { state: state, setState: setState, refresh: refresh, busy: busy, anchored: anchored, base: base, syncedAt: syncedAt }
      const controls = React.createElement(SyncControls, syncProps)

      let meta = '加载中…'
      if (state !== null && state !== undefined) {
        meta = error !== null ? '⚠ ' + error : '更新 ' + clockText(state.updatedAt)
      }

      if (isFloat && skin === 'diablo') {
        return React.createElement('div', { className: 'dshp-float dshp-w skin-diablo', title: tooltip },
          React.createElement('div', { className: 'dshp-float-head' },
            React.createElement('span', { className: 'dshp-float-title' }, 'DeepSeek 余额'),
            React.createElement('span', { className: 'dshp-float-meta' }, meta),
          ),
          React.createElement('div', { className: 'dshp-orb-wrap' },
            React.createElement('div', { className: 'dshp-orb-big' },
              React.createElement('div', { className: 'dshp-orb-liquid', style: liquidStyle }),
              React.createElement('div', { className: 'dshp-orb-glass' }),
            ),
          ),
          React.createElement('div', { className: 'dshp-float-nums' }, numChildren),
          React.createElement('div', { className: 'dshp-float-row' }, controls),
        )
      }

      if (isFloat && skin === 'minecraft') {
        return React.createElement('div', { className: 'dshp-float dshp-w skin-minecraft', title: tooltip },
          React.createElement('div', { className: 'dshp-float-head' },
            React.createElement('span', { className: 'dshp-float-title' }, 'DeepSeek 余额'),
            React.createElement('span', { className: 'dshp-float-meta' }, meta),
          ),
          React.createElement('div', { className: 'dshp-float-hearts' },
            React.createElement(HeartsRow, { pct: loading ? 0 : pct }),
          ),
          React.createElement('div', { className: 'dshp-float-nums' }, numChildren),
          React.createElement('div', { className: 'dshp-float-row' }, controls),
        )
      }

      if (isFloat && skin === 'sanguosha') {
        return React.createElement('div', { className: 'dshp-float dshp-w skin-sanguosha', title: tooltip },
          React.createElement('div', { className: 'dshp-float-head' },
            React.createElement('span', { className: 'dshp-float-title' }, 'DeepSeek 余额'),
            React.createElement('span', { className: 'dshp-float-meta' }, meta),
          ),
          React.createElement('div', { className: 'dshp-float-hearts' },
            React.createElement(JadeRow, { pct: loading ? 0 : pct, size: 22, uid: 'f', count: jadeCount, rot: jadeRot }),
          ),
          React.createElement('div', { className: 'dshp-float-nums' }, numChildren),
          React.createElement('div', { className: 'dshp-float-row' }, controls),
        )
      }

      if (isFloat && skin === 'overwatch') {
        return React.createElement('div', { className: 'dshp-float dshp-w skin-overwatch', title: tooltip },
          React.createElement('div', { className: 'dshp-float-head' },
            React.createElement('span', { className: 'dshp-float-title' }, 'DeepSeek 余额'),
            React.createElement('span', { className: 'dshp-float-meta' }, meta),
          ),
          React.createElement(OwBar, { pct: loading ? 0.3 : owPct, loading: loading, total: owTotal, minWidth: 0, forceDark: true, unit: owUnit, quantized: true, fillCells: owNBal }),
          React.createElement('div', { className: 'dshp-float-nums' }, numChildren),
          React.createElement('div', { className: 'dshp-float-row' }, controls),
        )
      }

      if (isFloat) {
        return React.createElement('div', { className: 'dshp-float dshp-w skin-' + skin, title: tooltip },
          React.createElement('div', { className: 'dshp-float-head' },
            React.createElement('span', { className: 'dshp-float-title' }, 'DeepSeek 余额'),
            React.createElement('span', { className: 'dshp-float-meta' }, meta),
          ),
          bar,
          React.createElement('div', { className: 'dshp-float-row' }, controls),
        )
      }

      if (skin === 'diablo') {
        return React.createElement('div', { className: 'dshp-strip dshp-w skin-diablo', title: tooltip },
          orbSmall,
          bar,
          controls,
        )
      }

      return React.createElement('div', { className: 'dshp-strip dshp-w skin-' + skin, title: tooltip },
        bar,
        controls,
      )
    }

    function RowDock(props) {
      const kind = props.kind
      const { state, setState, busy, refresh } = useBalance()

      const config = state !== null && state !== undefined && state.config !== undefined && state.config !== null ? state.config : { skin: 'default', position: 'dock' }
      if (config.position !== 'dock') return null
      if (kind === 'minecraft' && config.skin !== 'minecraft') return null
      if (kind === 'overwatch' && config.skin !== 'overwatch') return null
      if (kind === 'sanguosha' && config.skin !== 'sanguosha') return null

      const balance = state !== null && state !== undefined && typeof state.balance === 'number' && Number.isFinite(state.balance) ? state.balance : null
      const error = state !== null && state !== undefined && state.error !== undefined && state.error !== null ? String(state.error) : null
      const loading = state === null
      const today = state !== null && state !== undefined && state.today !== undefined && state.today !== null ? state.today : null
      const consumption = today !== null && typeof today.consumption === 'number' ? today.consumption : 0
      const base = today !== null && typeof today.base === 'number' ? today.base : null
      const syncedAt = today !== null && typeof today.syncedAt === 'number' ? today.syncedAt : null
      const anchored = base !== null
      const maxHp = balance !== null ? balance + consumption : null
      const pct = balance !== null && maxHp !== null && maxHp > 0 ? Math.min(1, Math.max(0, balance / maxHp)) : 1
      const jadeCount = typeof config.jades === 'number' && Number.isInteger(config.jades) && config.jades >= 1 ? config.jades : 5
      const owUnit = typeof config.owUnit === 'number' && Number.isFinite(config.owUnit) && config.owUnit > 0 ? config.owUnit : 2.5
      const jadeRot = typeof config.jadeRot === 'number' && Number.isFinite(config.jadeRot) ? config.jadeRot : 0
      const owNMax = maxHp !== null ? Math.max(1, Math.floor(maxHp / owUnit)) : null
      const owTotal = owNMax !== null ? owNMax * owUnit : null
      const owNBal = balance !== null && owNMax !== null ? Math.min(owNMax, Math.max(0, Math.floor(balance / owUnit))) : null
      const owPct = owNBal !== null && owNMax !== null ? owNBal / owNMax : pct

      let moneyText = '…'
      if (!loading) {
        moneyText = error !== null ? ('⚠ ' + error) : ('¥' + fmt(balance) + ' / ¥' + fmt(maxHp) + ' · 今日 -¥' + fmt(consumption))
      }

      let tooltip = 'DeepSeek 余额'
      if (state !== null && state !== undefined && typeof state.updatedAt === 'number') {
        tooltip += ' · 更新 ' + clockText(state.updatedAt)
      }
      if (anchored) {
        tooltip += ' · 今日基准 ¥' + fmt(base) + '（' + clockText(syncedAt) + ' 同步）'
      } else {
        tooltip += ' · 今日为本地估算，点 ✎ 同步平台数据'
      }
      if (error !== null) tooltip += ' · ' + error

      let visual = null
      if (kind === 'overwatch') {
        visual = React.createElement(OwBar, { pct: loading ? 0.3 : owPct, loading: loading, total: owTotal, minWidth: 140, unit: owUnit, quantized: true, fillCells: owNBal })
      } else if (kind === 'sanguosha') {
        visual = React.createElement(JadeRow, { pct: loading ? 0 : pct, size: 20, uid: 'd', count: jadeCount, rot: jadeRot })
      } else {
        visual = React.createElement(HeartsRow, { pct: loading ? 0 : pct })
      }

      return React.createElement('div', { className: 'dshp-row-dock', title: tooltip },
        visual,
        React.createElement('span', { className: 'dshp-heart-money' }, moneyText),
        React.createElement('span', { className: 'dshp-spacer' }),
        React.createElement(SyncControls, { state: state, setState: setState, refresh: refresh, busy: busy, anchored: anchored, base: base, syncedAt: syncedAt }),
      )
    }

    function SettingsView() {
      const [state, setState] = React.useState(null)

      React.useEffect(() => {
        let alive = true
        const load = async () => {
          const res = await loadState()
          if (alive) setState(res)
        }
        load()
        let stop = null
        stop = timer.interval(() => { load() }, 20000)
        return () => {
          alive = false
          if (stop !== null) stop()
        }
      }, [])

      const config = state !== null && state !== undefined && state.config !== undefined && state.config !== null ? state.config : { skin: 'default', position: 'dock', jades: 5, owUnit: 2.5 }

      const pick = async (patch) => {
        try {
          const res = await host.call('set-config', patch)
          setState(res)
        } catch (error) {
          console.error('dshp: set-config failed', error)
        }
      }

      const jadeCount = typeof config.jades === 'number' && Number.isInteger(config.jades) && config.jades >= 1 ? config.jades : 5
      const owUnit = typeof config.owUnit === 'number' && Number.isFinite(config.owUnit) && config.owUnit > 0 ? config.owUnit : 2.5
      const jadeRot = typeof config.jadeRot === 'number' && Number.isFinite(config.jadeRot) ? config.jadeRot : 0
      const [rotDraft, setRotDraft] = React.useState(jadeRot)
      React.useEffect(() => { setRotDraft(jadeRot) }, [jadeRot])
      const applyRot = (v) => {
        if (!Number.isFinite(v)) return
        const cl = Math.max(-180, Math.min(180, Math.round(v)))
        setRotDraft(cl)
        pick({ jadeRot: cl })
      }

      const jadeCountOptions = config.skin !== 'sanguosha' ? null : [3, 4, 5, 6, 8, 10].map((n) => {
        const jsz = Math.max(6, Math.min(11, Math.floor((93 - (n - 1) * 3) / n)))
        return React.createElement('div', {
          key: 'jc-' + n,
          className: 'dshp-opt' + (jadeCount === n ? ' on' : ''),
          onClick: () => pick({ jades: n }),
        },
          React.createElement('div', { className: 'dshp-mini' },
            React.createElement(JadeRow, { pct: 0.6, size: jsz, uid: 'jn-' + n, count: n, rot: rotDraft }),
          ),
          React.createElement('div', { className: 'dshp-opt-body' },
            React.createElement('div', { className: 'dshp-opt-name' }, n + ' 枚'),
            React.createElement('div', { className: 'dshp-opt-desc' }, '每枚 = 总量 1/' + n),
          ),
        )
      })

      const owUnitOptions = config.skin !== 'overwatch' ? null : [1, 2, 2.5, 5, 10].map((u) => (
        React.createElement('div', {
          key: 'ou-' + u,
          className: 'dshp-opt' + (owUnit === u ? ' on' : ''),
          onClick: () => pick({ owUnit: u }),
        },
          React.createElement('div', { className: 'dshp-mini', style: { width: 130 } },
            React.createElement(OwBar, { pct: 0.5, loading: false, total: 60, height: 10, minWidth: 0, unit: u }),
          ),
          React.createElement('div', { className: 'dshp-opt-body' },
            React.createElement('div', { className: 'dshp-opt-name' }, '¥' + u + ' / 格'),
            React.createElement('div', { className: 'dshp-opt-desc' }, '每格代表 ¥' + u + '，格数 = 总量 ÷ ' + u),
          ),
        )
      ))

      const skinOptions = SKINS.map((s) => {
        let preview = null
        if (s.key === 'diablo') {
          preview = React.createElement('div', { className: 'dshp-mini dshp-w skin-diablo' },
            React.createElement('div', { className: 'dshp-orb', style: { width: 18, height: 18 } },
              React.createElement('div', { className: 'dshp-orb-liquid', style: { height: '68%' } }),
            ),
          )
        } else if (s.key === 'minecraft') {
          preview = React.createElement('div', { className: 'dshp-mini' },
            React.createElement(HeartsRow, { pct: 0.68, size: 10 }),
          )
        } else if (s.key === 'overwatch') {
          preview = React.createElement('div', { className: 'dshp-mini' },
            React.createElement(OwBar, { pct: 0.68, loading: false, total: 24, height: 12, minWidth: 0, unit: owUnit }),
          )
        } else if (s.key === 'sanguosha') {
          preview = React.createElement('div', { className: 'dshp-mini' },
            React.createElement(JadeRow, { pct: 0.6, size: 12, uid: 's', count: jadeCount, rot: rotDraft }),
          )
        } else {
          const miniFill = { width: '68%' }
          if (s.key === 'default') miniFill.backgroundColor = hpColor(0.68)
          preview = React.createElement('div', { className: 'dshp-mini dshp-w skin-' + s.key },
            React.createElement('div', { className: 'dshp-track' },
              React.createElement('div', { className: 'dshp-fill', style: miniFill }),
            ),
          )
        }
        return React.createElement('div', {
          key: s.key,
          className: 'dshp-opt' + (config.skin === s.key ? ' on' : ''),
          onClick: () => pick({ skin: s.key }),
        },
          preview,
          React.createElement('div', { className: 'dshp-opt-body' },
            React.createElement('div', { className: 'dshp-opt-name' }, s.name),
            React.createElement('div', { className: 'dshp-opt-desc' }, s.desc),
          ),
        )
      })

      const positionOptions = POSITIONS.map((p) => React.createElement('div', {
        key: p.key,
        className: 'dshp-opt' + (config.position === p.key ? ' on' : ''),
        onClick: () => pick({ position: p.key }),
      },
        React.createElement('div', { className: 'dshp-opt-body' },
          React.createElement('div', { className: 'dshp-opt-name' }, p.name),
          React.createElement('div', { className: 'dshp-opt-desc' }, p.desc),
        ),
      ))

      return React.createElement('div', { className: 'dshp-set' },
        React.createElement('div', null,
          React.createElement('div', { className: 'dshp-set-h' }, '皮肤'),
          React.createElement('div', { className: 'dshp-opts' }, skinOptions),
        ),
        React.createElement('div', null,
          React.createElement('div', { className: 'dshp-set-h' }, '显示位置'),
          React.createElement('div', { className: 'dshp-opts' }, positionOptions),
        ),
        jadeCountOptions !== null ? React.createElement('div', null,
          React.createElement('div', { className: 'dshp-set-h' }, '勾玉数量'),
          React.createElement('div', { className: 'dshp-opts' }, jadeCountOptions),
        ) : null,
        owUnitOptions !== null ? React.createElement('div', null,
          React.createElement('div', { className: 'dshp-set-h' }, '守望先锋 · 每格金额'),
          React.createElement('div', { className: 'dshp-opts' }, owUnitOptions),
        ) : null,
        config.skin === 'sanguosha' ? React.createElement('div', null,
          React.createElement('div', { className: 'dshp-set-h' }, '勾玉调试 · 旋转角度（顺时针为正）'),
          React.createElement('div', { className: 'dshp-opts' },
            React.createElement('div', { className: 'dshp-opt' },
              React.createElement('div', { className: 'dshp-mini' },
                React.createElement(JadeRow, { pct: 0.6, size: 16, uid: 'rot', count: jadeCount, rot: rotDraft }),
              ),
              React.createElement('div', { className: 'dshp-opt-body' },
                React.createElement('input', {
                  type: 'range',
                  min: -180,
                  max: 180,
                  step: 1,
                  value: rotDraft,
                  onChange: (e) => applyRot(Number(e.target.value)),
                  style: { width: '100%', marginBottom: 4 },
                }),
                React.createElement('div', { className: 'dshp-opt-desc' },
                  '当前 ' + rotDraft + '° · 相对勾玉基准姿态（pkg-1：镜像+顺转45°）再旋转',
                ),
                React.createElement('div', { className: 'dshp-pop-row' },
                  React.createElement('input', {
                    className: 'dshp-pop-input',
                    type: 'number',
                    min: -180,
                    max: 180,
                    step: 1,
                    value: rotDraft,
                    onChange: (e) => applyRot(Number(e.target.value)),
                    style: { maxWidth: 90 },
                  }),
                  React.createElement('button', { type: 'button', className: 'dshp-pop-btn', onClick: () => applyRot(0) }, '重置 0°'),
                  React.createElement('button', { type: 'button', className: 'dshp-pop-btn', onClick: () => applyRot(rotDraft + 5) }, '+5°'),
                  React.createElement('button', { type: 'button', className: 'dshp-pop-btn', onClick: () => applyRot(rotDraft - 5) }, '-5°'),
                ),
              ),
            ),
          ),
        ) : null,
      )
    }

    slots.inject('conversation.composer.dock', () => slots.register(
      { name: 'conversation.composer.dock', id: 'deepseek-balance-hp', order: 10, label: () => 'DeepSeek 余额' },
      () => React.createElement(Widget, { float: false }),
    ))

    slots.inject('shell.overlay', () => slots.register(
      { name: 'shell.overlay', id: 'deepseek-balance-float', order: 40, label: () => 'DeepSeek 余额浮窗' },
      () => React.createElement(Widget, { float: true }),
    ))

    slots.inject('conversation.input.dock', () => slots.register(
      { name: 'conversation.input.dock', id: 'deepseek-balance-hearts', order: 10, label: () => 'DeepSeek 余额红心' },
      () => React.createElement(RowDock, { kind: 'minecraft' }),
    ))

    slots.inject('conversation.input.dock', () => slots.register(
      { name: 'conversation.input.dock', id: 'deepseek-balance-ow', order: 10, label: () => 'DeepSeek 余额守望条' },
      () => React.createElement(RowDock, { kind: 'overwatch' }),
    ))

    slots.inject('conversation.input.dock', () => slots.register(
      { name: 'conversation.input.dock', id: 'deepseek-balance-jades', order: 10, label: () => 'DeepSeek 余额勾玉' },
      () => React.createElement(RowDock, { kind: 'sanguosha' }),
    ))

    slots.inject('settings.section', () => slots.register(
      { name: 'settings.section', id: 'deepseek-balance', order: 12, label: () => '余额血条' },
      () => React.createElement(SettingsView),
    ))		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
