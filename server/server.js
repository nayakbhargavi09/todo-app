const express = require('express')
const {port} = require('./config/config')
const app = express()
const {checkDBConn} = require('./db/index')

console.log(port)
checkDBConn()
app.listen(port, (res, err) => {
    console.log(`Listening on port: ${port}`)
})