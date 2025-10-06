const {Redis} = require("ioredis")

const redisClient = new Redis() ; // now use local machine local host ports

module.exports = redisClient ;