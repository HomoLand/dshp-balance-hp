window.__ModuleLoader__.load({
	id: "dshp-balance-hp-bridge",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const JsonValue = { parse: (v) => v };
		const CONTRIBUTION = {
			package: "dshp-balance-hp-bridge",
			descriptors: [
				{ id: "dshp-balance-hp#dshpBalance/getState", service: "dshpBalance", namespace: "dshpBalance", method: "getState", invocation: { kind: "direct" }, parameters: [], result: { mode: "strict", typeSymbol: "dshp-balance-hp#JsonValue", schema: JsonValue } },
				{ id: "dshp-balance-hp#dshpBalance/refresh", service: "dshpBalance", namespace: "dshpBalance", method: "refresh", invocation: { kind: "direct" }, parameters: [], result: { mode: "strict", typeSymbol: "dshp-balance-hp#JsonValue", schema: JsonValue } },
				{ id: "dshp-balance-hp#dshpBalance/setTodayBase", service: "dshpBalance", namespace: "dshpBalance", method: "setTodayBase", invocation: { kind: "direct" }, parameters: [{ name: "args", wire: "args", source: "json", codec: { mode: "strict", typeSymbol: "dshp-balance-hp#JsonValue", schema: JsonValue } }], result: { mode: "strict", typeSymbol: "dshp-balance-hp#JsonValue", schema: JsonValue } },
				{ id: "dshp-balance-hp#dshpBalance/clearTodayBase", service: "dshpBalance", namespace: "dshpBalance", method: "clearTodayBase", invocation: { kind: "direct" }, parameters: [], result: { mode: "strict", typeSymbol: "dshp-balance-hp#JsonValue", schema: JsonValue } },
				{ id: "dshp-balance-hp#dshpBalance/setConfig", service: "dshpBalance", namespace: "dshpBalance", method: "setConfig", invocation: { kind: "direct" }, parameters: [{ name: "args", wire: "args", source: "json", codec: { mode: "strict", typeSymbol: "dshp-balance-hp#JsonValue", schema: JsonValue } }], result: { mode: "strict", typeSymbol: "dshp-balance-hp#JsonValue", schema: JsonValue } }
			]
		};
		const inject = ["remote"];
		async function apply(ctx) {
			await ctx.remote.$mount(CONTRIBUTION);
		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
