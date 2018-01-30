const qs = require('querystring')
const http = require('http')

let search = process.argv.slice(2).join(' ')

if(!search.length){
  return console.log(`\n Usage: node tweets \n`)
}

console.log(`\n search for : ${search} \n`)
console.log(qs.stringify({q:search}))
http.request({
  host:'http://twitter.com',
  path:'/search?'+qs.stringify({q:search}),
  prot:80
},(res)=>{
  console.log(res)
  let body = ''
  res.setEncoding('utf8')
  res.on('data',(chunk)=>{
    body+=chunk
  })
  res.on('end',()=>{
    let obj = JSON.parse(body)
    obj.results.forEach((tweet)=>{
      console.log(`${tweet.text}`)
      console.log(`${tweet.from_user}`)
      console.log('--')
    })
  })
}).end()
