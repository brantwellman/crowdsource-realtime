const _ = require("lodash");
const totalVotes = require('../lib/total-votes');

function votePercentages(responses) {
  return _.mapValues(responses, function(votes) {
    return Math.round((votes/totalVotes(responses))*100);
  });
}

module.exports = votePercentages;
