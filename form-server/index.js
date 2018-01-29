const http = require('http')

http.createServer((req,res)=>{
  res.writeHead(200,{'Content-Type':'text/html'})
  if('/' === req.url){
    res.end(`
      <form method = "POST" action="/url">
      <h1>form</h1>
          <fieldset>
          <label>Personal information</label>
          <p>Name?</p>
          <input type="text name="name">
          <p><button>Submit</button></p>
      </form>
    `)
  }else if('/url' === req.url){
    res.writeHead(200,{'Content-Type':'text/html'})
    res.end(`Sent a ${req.method} request`)
  }

}).listen(3000)