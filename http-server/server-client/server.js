const qs = require('querystring')
const http = require('http')

http.createServer((req,res)=>{
  let body = ''
  req.on('data',(chunk)=>{
    body+=chunk
  })
  req.on('end',()=>{
    res.writeHead(200)
    res.end('end')
    console.log(`\n got name ${qs.parse(body).name} \n`)
  })

}).listen(3000)