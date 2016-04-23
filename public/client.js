var socket = io();

var buttons = document.querySelectorAll('.response');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    var classes = this.className;
    var Id = classes.split(" ");
    socket.send('voteCast', {vote: this.innerText, surveyId: Id});
  });
}
