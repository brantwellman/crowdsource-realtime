const assert = require('assert');
const votePercentages = require('../lib/vote-percentages');

describe('votePercentages', () => {

  it('should return vote percentages from all choices', () => {
    var votes = { "choice1": 1, "choice2": 1, "choice3": 1 };
    var percentages = { "choice1": 33, "choice2": 33, "choice3": 33 };
    assert.deepEqual(votePercentages(votes), percentages)
  });
});
