var socket = io();

var buttons = $('#choices button');
var userVote = $('#user-vote');
var deactivate = $('#deactivate');
var inactivated = $('#survey-inactivated');
var resultsHeader = $('#results-header');


for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    var classes = this.className.split(" ");
    var id = classes[0];
    socket.send('voteCast', {vote: this.innerText, surveyId: id});
    choices.remove();
    userVote.text("Thanks for voting! You have voted for: " + this.innerText);
  });
}

deactivate.on('click', function() {
  socket.send('deactivateSurvey', false);
});

function getId(button) {
  var classes = this.className.split(" ");
  return classes[0];
}

// socket.on('voteCount', function(message) {
//   console.log(message.surveyResponses)
//   var n = 1;
//   for (var response in message.surveyResponses) {
//     console.log(response)
//     $(`#response-${n}`).text(`"${n}. ${response} - ${Math.round((message.surveyResponses[response]/totalVotes(message.surveyResponses))*100)} %"`)
//     n++;
//   }
// });

socket.on('deactivateSurvey', function(){
  buttons.remove();
  inactivated.text("Sorry, this survey has been closed");
  deactivate.remove();
  resultsHeader.text("Final survey results for poll:");
});
