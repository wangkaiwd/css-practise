## Puppeteer
> `puppeteer`: 操纵木偶的人，操纵傀儡
`Puppeteer`是一个`Node`库，它提供了一个高级`API`来通过`DevTools`协议控制`Chromium`或`Chrome`。`Puppeteer`默认以`headless`模式运行，但是可以通过修改配置问文件运行"有头"模式

### `Puppeteer`能做什么
可以在浏览器中手动执行的绝大多数操作都可以使用`Puppeteer`来完成。下面是一些示例：

* 生成页面`PDF`
* 抓取`SPA`(单页应用)并生成预渲染内容(即："SSR"(服务端渲染))
* 自动提交表单，进行UI测试，键盘输入等