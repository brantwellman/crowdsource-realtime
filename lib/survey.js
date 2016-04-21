'use strict';

class Survey{
  constructor(surveyId, pollQuestion, pollResponses) {
    this.surveyId = surveyId;
    this.surveyQuestion = pollQuestion;
    this.surveyResponses = pollResponses;
  }
}

module.exports = Survey;
