"use strict";

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const generateId = require('./lib/generate-id');
const Survey = require('./lib/survey');
const _ = require("lodash");
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app)
                 .listen(port, function () {
                  console.log('Listenting on port ' + port + '.');
                 });
const socketIo = require('socket.io');
const io = socketIo(server);


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.locals.title = 'Crowdsource';
app.locals.surveys = {};

app.get('/', function (req, res){
  res.render('index');
});

app.post('/surveys', (request, res) => {
  var pollId = generateId();
  var pollData = request.body.poll;
  var pollQuestion = pollData.question;
  var pollResponses = {};

  pollData.responses.forEach(function(response){
    pollResponses[response] = 0;
  });

  var newSurvey = new Survey(pollId, pollQuestion, pollResponses);
  app.locals.surveys[newSurvey.id] = newSurvey;
  res.render('admin', { newSurvey: newSurvey });
});

function totalVotes(responses) {
  if (_.sum(_.values(responses)) === 0) {
    return 1;
  } else {
    return _.sum(_.values(responses));
  }
}
  // return _.sum(_.values(responses));


// function votePercents(responses) {
//   for(var key in responses) {
//     if(responses.hasOwnProperty(key)) {
//       (responses[key]/totalVotes(responses))*100;
//     }
//   }
// }

// Math.round((survey.surveyResponses[response]/totalVotes)*100)

app.get('/admin', function (req, res) {
  res.render('admin');
});

app.get('/surveys/:id', (req, res) => {
  var survey = app.locals.surveys[req.params.surveyId];
  // console.log(survey.active)
  if (survey.active === true) {
    res.render('survey', {survey: survey});
  } else {
    res.render('closed-survey', {survey: survey});
  }
});

app.get('/admin/surveys/:id', (req, res) => {
  var survey = app.locals.surveys[req.params.surveyId];
  // console.log(survey.surveyResponses)
  // var totalVotes = _.sum(_.values(survey.surveyResponses));
  // console.log(totalVotes)
//   console.log(survey)
// console.log(votePercents(survey.surveyResponses))
  res.render('admin-results', {survey: survey, totalVotes: totalVotes((survey.surveyResponses))});
  // res.render('admin-results', {survey: survey, votePercents: votePercents(survey.surveyResponses)});
});

io.on('connection', function (socket) {

  socket.on('message', function (channel, message) {
    var surveyVotes = app.locals.surveys[Survey.surveyResponses];
    var voteTotal = totalVotes(surveyVotes.surveyResponses);
    // console.log(surveyVotes.surveyResponses)
    // console.log(channel)
    // var test = app.locals.surveys;
    var vote = message.vote;
    // console.log(vote)
    // console.log(Survey.active);
    if (Survey.active === false) {
      // console.log("You can't vote")
    } else if (channel === 'voteCast') {
      surveyVotes.surveyResponses[vote]++;
      // socket.emit('userVote', vote);
      // console.log(surveyVotes.surveyResponses)
      // io.sockets.emit('voteCount', surveyVotes);
    //   votes[socket.id] = message;
      // console.log(surveyVotes.surveyResponses);
    } else if (channel === 'deactivateSurvey') {
      // console.log(message)
      // console.log(surveyVotes)
      surveyVotes.active = false;
      io.sockets.emit('deactivateSurvey');
    }
  });

});

module.exports = server;
