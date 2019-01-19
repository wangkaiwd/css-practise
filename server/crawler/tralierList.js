const puppeteer = require('puppeteer')
const url = 'https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0';
; (async () => {
  console.log('Start visit the target page');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // url:导航到的地址， {waitUntil: load/domcontentloaded/networkidle0,networkidle2}
  // networkidle2: 只有2个网路连接时触发(至少500毫秒后)
  await page.goto(url, { waitUntil: 'networkidle2' });
  // 等待指定的选择器匹配的元素出现在页面中，如果调用此方法时已经有匹配的元素，那么此方法立即返回。
  // 如果指定的选择器在超时时间后仍不出现，此方法会报错
  await page.waitForSelector('.more', { timeout: 1000 })
  for (let i = 0; i < 1; i++) {
    // page.click: 找到一个匹配selector选择器的元素，如果需要会把此元素滚动到可视，然后通过page.mouse点击它。
    // 如果选择器没有匹配到任何元素，此方法将会报错
    await page.click('.more', { delay: 1000 })
  }
  // todo: 如何将evaluate回调函数中的console.log()中的内容输出
  page.on('console', msg => {
    // console.log('msg', msg.args()[0])
  })
  // 传入一个函数在页面上下文中执行
  // 传入的函数中执行的console.log()会执行，但并不会在node执行的命令行中打印
  // 只有在page.on方法：page.on('console.log')监听才会在命令行中打印
  const result = await page.evaluate(() => {
    // 这里的内容会在导航到的地址页面中执行
    var $ = window.$
    var $list = $('.list a')
    // console.log('list', $list)
    var data = []
    if ($list.length >= 1) {
      $list.each((index, item) => {
        const $item = $(item),
          doubanId = $item.find('div').data('id'),
          title = $item.find('p').clone().children().remove().end().text().replace(/\n+/g, '').trim(),
          rate = Number($item.find('strong').text()),
          poster = $item.find('img').attr('src').replace('s_ratio', 'l_ratio')
        data.push({ doubanId, title, rate, poster })
      })
    }
    return data
  })
  // 关闭Chromium及其所有页面（如果页面被打开的话）
  await browser.close();
  console.log('end visit page')
  console.log(result)
})();