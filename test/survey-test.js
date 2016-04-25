const assert = require('assert');
const Survey = require('../lib/survey');

describe('surveyTest', () => {

  it('should remove empty string/choices from possible responses object', () => {
    var responses = { "choice1": 0, "choice2": 0, "": 0 };
    var survey = new Survey("4444", "What is the question?", responses);
    var finalResponses = { "choice1": 0, "choice2": 0 };
    assert.deepEqual(survey.surveyResponses, finalResponses);
  });

  it('should be created with and active default status', () => {
    var responses = { "choice1": 0, "choice2": 0, "": 0 };
    var survey = new Survey("4444", "What is the question?", responses);
    assert(survey.active);
  });
});
