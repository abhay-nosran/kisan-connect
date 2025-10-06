const {Pool} = require("pg") ;
require('dotenv').config();

const client = new Pool({
  user: process.env.SUPABASE_USER,
  password: process.env.SUPABASE_PASSWORD,
  host: process.env.SUPABASE_HOST,
  port: 6543,
  database: process.env.SUPABASE_DATABASE,
})


module.exports = client

