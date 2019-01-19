// 子进程
const cp = require('child_process')
const { resolve } = require('path')

  ; (async () => {
    const movieData = resolve(__dirname, '../crawler/tralierList.js')
    const child = cp.fork(movieData, [])
    let invoked = false

    child.on('error', err => {
      if (err) return
      invoked = true
      console.log('error', err)
    })
    child.on('exit', code => {
      if (invoked) return
      invoked = false
      const err = code === 0 ? null : new Error(`exit code: ${code}`)
      console.log('exit', err)
    })
    child.on('message', data => {
      console.log('result', data)
    })
  })()