const assert = require('assert');
const totalVotes = require('../lib/total-votes');

describe('totalVotes', () => {

  it('should return total votes from all choices', () => {
    var votes = { "choice1": 1, "choice2": 2, "choice3": 3 };
    assert.equal(totalVotes(votes), 6);
  });

  it('should return 1 when the vote toal is 0', () => {
    var votes = { "choice1": 0, "choice2": 0, "choice3": 0 };
    assert.equal(totalVotes(votes), 1);
  });
});
