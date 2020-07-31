process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should()
const testMongoUrl = process.env.MONGO_HOST

chai.use(chaiHttp)

describe("test order", () => {
  it("should assign mongodb url", (done) => {
    process.env.MONGO_URL = testMongoUrl
    done()
  })
  it("should call order api", (done) => {
    chai.request(server)
        .post('/api/order')
        .send({
          'name': 'tea',
          'amount': 1
        })
        .end((err, res) => {
            console.log('err ' + err)
            res.should.have.status(200)
            done()
        })
  })
  it("should get order status", (done) => {
    chai.request(server)
        .get('/api/orderstatus/tea')
        .end((err, res) => {
            console.log('err ' + err)
            res.should.have.status(200)
            done()
        })
  })
  it("should call order cancel api", (done) => {
    chai.request(server)
        .post('/api/ordercancel')
        .send({
          'name': 'tea',
        })
        .end((err, res) => {
            console.log('err ' + err)
            res.should.have.status(200)
            done()
        })
  })
})
