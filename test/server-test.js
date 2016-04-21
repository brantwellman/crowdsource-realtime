const assert = require('assert');
const app = require('../server');
const request = require('request');

describe('Server', () => {

  before(done => {
    this.port = 9876;

    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });
  });

  after(() => {
    this.server.close();
  });

  it('should exist', () => {
    assert(app);
  });

  describe('GET /', () => {

    it('should return a 200', (done) => {
      request.get('http://localhost:3000/index.html', (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should have a the app title on the page', (done) => {
      // var title = app.locals.title;

      request.get('http://localhost:3000', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes("Welcome to Crowdsource!"), `"${response.body}" does not include "Welcome to Crowdsource!".`);
        done();
      });
    });

  });


});
