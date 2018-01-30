const qs = require('querystring')
const http = require('http')

function send(theName){
  const postData = qs.stringify({'name':theName})
  const req = http.request({
    host:'127.0.0.1',
    port:3000,
    url:'/',
    method:'POST',
  },(res)=>{

    res.setEncoding('utf8')
    res.on('data', (chunk) => {

    });
    res.on('end',()=>{
      console.log('\n request complete! \n')
      process.stdout.write('\n your name:')
    })
  })

  req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
  });

  req.end(postData)
}

process.stdout.write('\n your name:')
process.stdin.resume()
process.stdin.setEncoding('utf-8')
process.stdin.on('data',(name)=>{
  send(name.replace('\n',''))
})