'use strict'
// DeepSeek 余额血量条 — Host 端 Cordis 插件入口
// 本包为源码分发：host 半区可直接作为 Cordis 插件挂载；client 半区（src/client.js）
// 由 DSH Web 客户端执行，动态安装时经 cordis_define 注入。
const apply = require('./src/host.js')

module.exports = {
  name: 'dshp-balance-hp',
  inject: ['timer'],
  apply,
}
