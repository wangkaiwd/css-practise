const puppeteer = require('puppeteer')
const url = 'https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0';
const sleep = time => new Promise((resolve, reject) => {
  setTimeout(resolve, time)
})
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
    for (let i = 0; i < 5; i++) {
      // page.click: 找到一个匹配selector选择器的元素，如果需要会把此元素滚动到可视，然后通过page.mouse点击它。
      // 如果选择器没有匹配到任何元素，此方法将会报错
      await page.click('.more', { delay: 1000 })
    }
    const result = await page.evaluate(() => {
      var $ = window.$
      var $list = $('.list a')
      console.log('list', $list)
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
    await browser.close();
    console.log(result)
    console.log({ poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2543862640.jpg' })
  })();