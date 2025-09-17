const express = require('express')
const app = express()
require('dotenv').config()
const syncDatabase = require('./database/dbCreation')
const port = process.env.PORT || 3000 

app.listen(port, async () => {
    // await testConnection();
    await syncDatabase();
    console.log(`Example app listening on port ${port}`)
})
