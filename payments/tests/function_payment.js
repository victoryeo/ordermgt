const chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()

chai.use(chaiHttp);

describe("test payment", () => {
  it("should call payments api", (done) => {
    chai.request(server)
        .post('/api/payments')
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
