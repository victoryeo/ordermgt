const chai = require('chai')
let server = require('../index')
let should = chai.should()
const amqplib = require('amqplib-mocks')
const { assert } = require('chai')

describe("test rabbitmq server", function() {
  let connection, channal
  let queue = 'sendToPayment'
  this.timeout(5000)

  before(async() => {
    connection = await amqplib.connect("amqp://localhost")
    channel = await connection.createChannel()

  })
  it("should create the channel", async() => {
    await channel.assertQueue(queue)
    assert.isObject(channel)
  })
  it("should send the message", async() => {
    const res = await channel.assertQueue(queue)
    .then((err, res) => {
          channel.sendToQueue(queue, new Buffer("closed"));
    })
  })
})
