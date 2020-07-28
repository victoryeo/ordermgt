const chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()

chai.use(chaiHttp);

describe("test order", () => {
  it("should call order api", (done) => {
    chai.request(server)
        .post('/api/order')
        .type('form')
        .send({
          'name': 'tea',
          'amount': 1
        })
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
  })
})
