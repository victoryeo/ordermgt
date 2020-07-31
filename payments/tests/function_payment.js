const chai = require('chai')
const server = require('../index')
const should = chai.should()
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
    channel.assertQueue(queue)
    .then((err, res) => {
      console.log(err)
    })
    let buf = Buffer.from("closed")
    console.log(buf)
    let ret = await channel.sendToQueue(queue, buf)
    console.log(ret)
    assert.isTrue(ret)
  })
  it("should receive the message", async() => {
    channel.assertQueue(queue)
    .then((err, res) => {
      console.log(err)
    })
    channel.consume(queue,
       (msg => {
         console.log(" [x] Received %s", msg.content.toString())
       }),
       {
        noAck: true
       }
    ).then((err, res) => {
        console.log(err)
    })
  })
})
