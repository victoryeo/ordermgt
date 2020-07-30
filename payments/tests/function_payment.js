const chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()
const amqplib = require('amqplib-mocks')
const { assert } = require('chai')

chai.use(chaiHttp);

describe("test rabbitmq server", (done) => {
  let connection, channal
  let queue = 'test'
  
  before(async() => {
    connection = await amqplib.connect("amqp://localhost")
    channel = await connection.createChannel()
    await channel.assertQueue(queue)
  })
  it("should create the channel", (done) => {
    assert.isObject(channel)
  })
})
