const http = require('http')
const fs = require('fs')



http.createServer((req,res)=>{
  let {method, url} = req

  function serve(path,type){
    res.writeHead(200,{'Content-Type':type})
    fs.createReadStream(path).pipe(res)
  }

  if('GET' === method && '/images' === url.substr(0,7) && '.jpg' === url.substr(-4)){
    fs.stat(__dirname+url,(err,stat)=>{
      if(err || !stat.isFile()){
        res.writeHead(404)
        res.end('NOT FOUND')
        return
      }
      serve(__dirname+url,'application/jpg')
    })
  } else if('GET' === method && '/' === url){
    serve(__dirname + '/index.html','text/html')
  } else{
    res.writeHead(404)
    res.end('NOT FOUND')
  }
}).listen(3000)