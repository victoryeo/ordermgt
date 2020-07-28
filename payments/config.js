const dotenv = require('dotenv')

dotenv.config()

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '4040',
  mongooseDebug: process.env.MONGOOSE_DEBUG,
  mongo: {
    host: process.env.MONGO_HOST || 'mongodb://localhost/payments',
    port: process.env.MONGO_PORT || 27017,
  },
}

module.exports = config
