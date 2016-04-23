'use strict';

class Survey{
  constructor(surveyId, pollQuestion, pollResponses) {
    this.surveyId = surveyId;
    this.surveyQuestion = pollQuestion;
    this.surveyResponses = this.clearEmptyQuestions(pollResponses);
  }

  clearEmptyQuestions(questions) {
    var keys = Object.keys(questions);
    console.log(keys)
    keys.forEach(function(key) {
      if (key === ""){
        delete questions[key];
      }
    });
    return questions;
  }
}

module.exports = Survey;
