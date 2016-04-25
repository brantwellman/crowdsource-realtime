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

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
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
      request.get('http://localhost:3000', (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should have a the app title on the page', (done) => {

      request.get('http://localhost:3000', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes("Welcome to Crowdsource!"), `"${response.body}" does not include "Welcome to Crowdsource!".`);
        done();
      });
    });
  });

  describe('GET /admin', () => {

    it('should have app basic information on the page', (done) => {

      request.get('http://localhost:3000/admin', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes("Your Survey has been created"), `"${response.body}" does not include "Your Survey has been created"`);
        done();
      });
    });
  });

  describe('GET /surveys/:id', () => {
    var validSurvey = {
      survey: {
        surveyId: "5555",
        surveyQuestion: 'How many are there?',
        surveyResponses: { "0": 0, "1": 0, "2": 0 },
      }
    };

    it('should not return 404', (done) => {
      this.request.get('/surveys/testSurvey', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

    it('should return a page that has the survey question', (done) => {

      this.request.get('/surveys/5555', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(validSurvey.surveyQuestion));
        done();
      });
    });

    it('should return a page that has the survey responses', (done) => {

      this.request.get('/surveys/5555', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(validSurvey.surveyResponses));
        done();
      });
    });

  });

  describe('GET /sharedsurveys', () => {
    var validSurvey = {
      survey: {
        surveyId: "5555",
        surveyQuestion: 'How many are there?',
        surveyResponses: { "0": 1, "1": 1, "2": 1 },
      }
    };

    it('should return a page with survey results', (done) => {

      this.request.get('/sharedsurveys/5555', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes("33"));
        done();
      });
    });
  });

  describe('GET /admin/surveys/:id', () => {
    var validSurvey = {
      survey: {
        surveyId: "5555",
        surveyQuestion: 'How many are there?',
        surveyResponses: { "0": 1, "1": 1, "2": 1 },
      }
    };

    it('should return a page with survey results', (done) => {

      this.request.get('/admin/surveys/5555', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes("33"));
        done();
      });
    });

    it('should return a page with a deactivate button', (done) => {

      this.request.get('/admin/surveys/5555', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(validSurvey.surveyResponses));
        done();
      });
    });
  });

  describe('POST /surveys', () => {

    it('should not return 404', (done) => {
      this.request.post('/surveys', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

  });

});
