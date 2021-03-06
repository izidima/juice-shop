var sinon = require('sinon')
var chai = require('chai')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

describe('continueCode', function () {
  var retrieveCurrentContinueCode, challenges, req, res

  beforeEach(function () {
    retrieveCurrentContinueCode = require('../../routes/continueCode')
    challenges = require('../../data/datacache').challenges
    req = {}
    res = { json: sinon.spy() }
  })

  it('should be undefined when no challenges exist', function () {
    retrieveCurrentContinueCode()(req, res)
    expect(res.json).to.have.been.calledWith({ continueCode: undefined })
  })

  it('should be undefined when no challenges are solved', function () {
    challenges.c1 = { solved: false }
    challenges.c2 = { solved: false }

    retrieveCurrentContinueCode()(req, res)
    expect(res.json).to.have.been.calledWith({ continueCode: undefined })
  })

  it('should be hashid value of IDs of solved challenges', function () {
    challenges.c1 = { id: 1, solved: true }
    challenges.c2 = { id: 2, solved: true }
    challenges.c3 = { id: 3, solved: false }

    retrieveCurrentContinueCode()(req, res)
    expect(res.json).to.have.been.calledWith({ continueCode: 'yXjv6Z5jWJnzD6a3YvmwPRXK7roAyzHDde2Og19yEN84plqxkMBbLVQrDeoY' })
  })
})
