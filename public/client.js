var socket = io();

var buttons = $('#choices button');
var userVote = $('#user-vote');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    var classes = this.className.split(" ");
    var id = classes[0];
    socket.send('voteCast', {vote: this.innerText, surveyId: id});
    choices.remove();
    userVote.text("Thanks for voting! You have voted for: " + this.innerText);
  });

}
