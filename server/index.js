const Koa = require('koa')
const pug = require('pug')
const { resolve } = require('path')
const views = require('koa-views')
// 新建一个Application实例
const app = new Koa()
const port = 2334

// 加载模板引擎，指定路径为当前的views目录，扩展名是pug
app.use(views(resolve(__dirname, './views'), {
  extension: 'pug'
}))
// 调用Application原型上的方法，传入一个回调函数，放入中间位件数组，将实例对象返回
// 如果是generator函数会走另外的逻辑 
app.use(async (ctx, next) => {
  ctx.type = 'text/html;charset=utf-8'
  // ./当前路径是相对于当前进程
  // ctx.body = pug.renderFile(resolve(__dirname, './template/test.pug'), {
  //   you: 'koa',
  //   me: 'wk'
  // })
  // 使用了koa-views中间件后，将pug.render方法绑定到了ctx上
  await ctx.render('demo', {
    name: 'AAA'
  })
})
// app.listen : 通过http模块创建服务并监听
app.listen(port, err => {
  if (!err) {
    console.log(`服务启动成功，监听${port}端口!`)
  }
})