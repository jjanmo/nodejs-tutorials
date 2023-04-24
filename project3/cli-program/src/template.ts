const type = process.argv[2]
const name = process.argv[3] // 파일 이름
const directory = process.argv[4] || '.' // 파일 경로

const HTMLTemplate = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Template</title>
    </head>
    <body>
      <h1>Node CLI</h1>
    </body>
  </html>
`

const routerTemplate = `
  const express = require('express)
  const router = express.Router()

  router.get('/', (req, res, next) => {
    try{
      res.send('Hello World')
    }catch(e){
      console.error(e)
      next(e)
    }
  })

  module.exports = router
`
