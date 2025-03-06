import pg from 'pg'
import 'dotenv/config'
const { Pool } = pg
 
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.DBPASS,
    port: process.env.DBPORT || 3000,
  });

console.log(`DB is running on port ${process.env.DBPORT || 3000}`)

export default pool ;