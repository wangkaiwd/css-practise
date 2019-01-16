const Koa = require('koa')
// 新建一个Application实例
const app = new Koa()
const { normalTpl } = require('./template')
const port = 2334
// 调用Application原型上的方法，传入一个回调函数，放入中间位件数组，将实例对象返回
// 如果是generator函数会走另外的逻辑 
app.use(async (ctx, next) => {
  ctx.type = 'text/html;charset=utf-8'
  ctx.body = normalTpl
})
// app.listen : 通过http模块创建服务并监听
app.listen(port, err => {
  if (!err) { console.log(`服务启动成功，监听${port}端口!`) }
})