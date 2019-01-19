const puppeteer = require('puppeteer')
const base = 'https://movie.douban.com/subject/';
const doubanId = '27110296'
const videBase = 'https://movie.douban.com/trailer/239189/#content';
const sleep = time => new Promise((resolve, reject) => {
  setTimeout(resolve, time)
})
  ; (async () => {
    console.log('Start visit the target page');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // url:导航到的地址， {waitUntil: load/domcontentloaded/networkidle0,networkidle2}
    // networkidle2: 只有2个网路连接时触发(至少500毫秒后)
    await page.goto(base + doubanId, { waitUntil: 'networkidle2' });

    // todo: 如何将evaluate回调函数中的console.log()中的内容输出
    page.on('console', msg => {
      // console.log('msg', msg.args()[0])
    })
    // 传入一个函数在页面上下文中执行
    // 传入的函数中执行的console.log()会执行，但并不会在node执行的命令行中打印
    // 只有在page.on方法：page.on('console.log')监听才会在命令行中打印

    await sleep(2000)
    const result = await page.evaluate(() => {
      // 这里的内容会在导航到的地址页面中执行
      var $ = window.$
      var $prevue = $('.related-pic-video')
      if ($prevue && $prevue.length > 0) {
        var href = $prevue.attr('href')
        var cover = $prevue.css('background-image')
        var start = cover.indexOf('"')
        var end = cover.lastIndexOf('"')
        var httpCover = cover.slice(start + 1, end)
        return {
          href,
          cover: httpCover
        }
      }
    })
    let video;
    if (result.href) {
      await page.goto(result.href, { waitUntil: 'networkidle2' })
      await sleep(2000)
      video = await page.evaluate(() => {
        var $ = window.$
        const $source = $('video source')
        if ($source && $source.length > 0) {
          return $source.attr('src')
        }
        return ''
      })
    }
    const data = {
      doubanId,
      video,
      cover: result.cover
    }
    // 关闭Chromium及其所有页面（如果页面被打开的话）
    await browser.close();
    console.log('end visit page')
    process.send(data)
    process.exit()
  })();