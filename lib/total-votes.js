const _ = require("lodash");

function totalVotes(responses) {
  if (_.sum(_.values(responses)) === 0) {
    return 1;
  } else {
    return _.sum(_.values(responses));
  }
}

module.exports = totalVotes;
