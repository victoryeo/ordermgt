const mongoose      = require('mongoose')
const config        = require('./config')

const mongoUri = config.mongo.host
console.log(mongoUri)
mongoose.connect(mongoUri, { keepAlive: 10, useNewUrlParser: true })

let db = mongoose.connection
db.on('error', () => {
  console.log(`unable to connect to database: ${mongoUri}`)
});

let schema = mongoose.Schema

let orderSchema = new schema({
    name: String,
    amount:  Number,
    state: String
})

let orderModel = mongoose.model('orderModel', orderSchema)
//console.log(walletModel)

module.exports = orderModel
