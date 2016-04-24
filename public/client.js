var socket = io();

var buttons = $('#choices button');
var userVote = $('#user-vote');
var deactivate = $('#deactivate');
var inactivated = $('#survey-inactivated');
// var closed = $('#closed');
var resultsHeader = $('#results-header');


for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    // var id = getId(this);
    // console.log(id)
    var classes = this.className.split(" ");
    var id = classes[0];
    socket.send('voteCast', {vote: this.innerText, surveyId: id});
    choices.remove();
    userVote.text("Thanks for voting! You have voted for: " + this.innerText);
  });
}

deactivate.on('click', function() {
  // console.log(id)
  socket.send('deactivateSurvey', false);
});

function getId(button) {
  var classes = this.className.split(" ");
  return classes[0];
}

socket.on('deactivateSurvey', function(){
  buttons.remove();
  inactivated.text("Sorry, this survey has been closed");
  deactivate.remove();
  // closed.text('You have closed this survey');
  resultsHeader.text("Final survey results for poll:");
});
