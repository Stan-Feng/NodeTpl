const app = require('../app');
const request = require('supertest');
const should = require('chai').should();

describe('Unit Tests: \n', () => {
});

describe('Integration Tests: \n', () => {
  it('It should get all lions \n', (done) => {
    request(app).get('/api/lions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, resp) {
        if (err) done(err);
        resp.body.should.be.an('array');
        done();
      });
  });
});
