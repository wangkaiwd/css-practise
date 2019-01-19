const cp = require('child_process')
const { resolve } = require('path')
  ; (async () => {
    const video = resolve(__dirname, '../crawler/video.js')
    // 用引入的模块衍生新的nodejs进程
    const child = cp.fork(video)
    let invoked = false
    child.on('error', err => {
      if (invoked) return
      invoked = true
      console.log(err)
    })
    // 当子进程结束时触发
    // code: 子进程的退出码
    child.on('exit', code => {
      if (invoked) return
      const err = code === 0 ? null : new Error(`exit code : ${code}`)
      console.log('exit', err)
    })
    // 当子进程使用process.send()发送消息时触发
    child.on('message', data => {
      console.log(data)
    })
  })()