const fs = require('fs')
const stdin = process.stdin
const stdout = process.stdout

fs.readdir(__dirname,(err,files)=>{
  let stats = []

  console.log('')

  if(!files.length){
    return console.log(`No Such Files To Show! \n`)
  }

  console.log(` Select which file or directory you want to see \n`)

  //监听处理
  function option(data){
    let filename = files[Number(data)]
    if(!filename){
      stdout.write(`    Enter your chioce: `)
    }else {
      stdin.pause()

      if(stats[Number(data)].isDirectory()){
        fs.readdir(`${__dirname}/${filename}`,(err,files)=>{
          console.log('')
          console.log(`   (${files.length} files)`)
          files.forEach((file)=>{
            console.log(`   - ${file}`)
          })
          console.log('')
        })
      }else{
        fs.readFile(`${__dirname}/${filename}`,'utf8',(err,data)=>{
          console.log('')
          console.log('\033[90m'+`${data.replace(/(.*)/g,'    $1')}` +'\033[90m')
        })
      }
    }
  }
  //文件读取
  function read(){
    console.log('')
    stdout.write(`    Enter your chioce: `)
    //等待用户输入
    stdin.resume()
    //设置流编码为utf8
    stdin.setEncoding('utf8')

    //监听data事件
    stdin.on('data',option)
  }



  //串行执行
  function file(i){
    var filename = files[i]

    fs.stat(`${__dirname}/${filename}`,(err, stat)=>{
      stats[i] = stat
      if(stat.isDirectory()){
        console.log(`   ${i}` +'\033[36m' + filename + '/\033[39m')
      }else{
        console.log(`   ${i}` +'\033[90m'  + filename + '\033[39m')
      }
      i++

      if(i === files.length){
        read()
      }else{
        file(i)
      }
    })
  }

  file(0)
})