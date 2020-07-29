process.env.NODE_ENV = 'test';

const chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()

chai.use(chaiHttp);

describe("test order", () => {
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
})
