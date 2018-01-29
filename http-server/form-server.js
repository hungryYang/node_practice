const http = require('http')
const qs = require('querystring')
http.createServer((req,res)=>{
  res.writeHead(200,{'Content-Type':'text/html'})
  if('/' === req.url){
    res.end(`
      <form method = "POST" action="/url">
      <h1>form</h1>
          <fieldset>
          <label>Personal information</label>
          <p>Name?</p>
          <input type="text" name="name">
          <p><button>Submit</button></p>
      </form>
    `)
  }else if('/url' === req.url && req.method === 'POST'){
    let body = ''
    req.on('data',(chunk)=>{
      console.log(chunk)
      body+=chunk
    })
    req.on('end',()=>{
      res.writeHead(200,{'Content-Type':'text/html'})
      res.end(`
        <p> Content-Type: ${req.headers['content-type'] }</p>
        <p>Data: ${qs.parse(body).name}</p>
      `)
    })
  }else {
    res.writeHead(404)
    res.end('404 NOT FOUND')
  }

}).listen(3000)