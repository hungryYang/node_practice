const net = require('net')

let count = 0,
    users = {}
//传递的是可读可写的net.Stream对象

let server = net.createServer((conn)=>{
  console.log('new connection!')
  // 通过net.Stream setEncoding方法设置编码0
  conn.setEncoding('utf8')

  //当前链接昵称
  let nickname

  //用户退出
  function broadcast (msg,exceptMyself){
    for(let i in users){
      if(!exceptMyself||i !== nickname){
        console.log(1)
        //users[i].write(msg)
        console.log(msg)
      }
    }
  }

  conn.write(`
    > welcome to node-chat!
    > ${count} other people are connected at,
    > please enter your name :
  `)
  count++

  conn.on('data',(data)=>{
    data = data.replace('\r\n','')
    if(!nickname){
      if(users[data]){
        conn.write('> nickname already in use, try again:')
        return
      }else {
        nickname = data
        users[nickname] = conn
        for(let i in users){
          users[i].write(`> ${nickname} joined the room`)
        }
      }
    }else {
      for(let i in users){
        if(i != nickname){
          users[i].write(`> ${nickname} : ${data} \n`)
        }
      }
    }
  })

  //底层套接字关闭时，node会触发close事件。node有两个和连接终止相关的事件：close和end
  //end：当客户端显示关闭TCP连接时触发，发生错误时不会触发
  //close：两种情况都会触发
  conn.on('close',()=>{
    count--
    broadcast(`> ${nickname} left the room \n`)
    delete users[nickname]
  })
})


server.listen(3000,()=>{
  console.log('server listening on 3000')
})