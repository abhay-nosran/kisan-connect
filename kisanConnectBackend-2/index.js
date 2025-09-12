const express = require('express')
const app = express()
require('dotenv').config()
const { testConnection } = require('./db')
const port = process.env.PORT || 3000 

app.listen(port, async () => {
    await testConnection();
    console.log(`Example app listening on port ${port}`)
})
