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

app.get('/admin', function (req, res) {
  res.render('admin');
});

app.get('/surveys/:id', (req, res) => {
  var survey = app.locals.surveys[req.params.surveyId];

  if (survey.active === true) {
    res.render('survey', {survey: survey});
  } else {
    res.render('closed-survey', {survey: survey});
  }
});

app.get('/sharedsurveys/:id', (req, res) => {
  var survey = app.locals.surveys[req.params.surveyId];

  if (survey.active === true) {
    res.render('shared-survey', {survey: survey});
  } else {
    res.render('closed-survey', {survey: survey});
  }
});

app.get('/admin/surveys/:id', (req, res) => {
  var survey = app.locals.surveys[req.params.surveyId];

  res.render('admin-results', {survey: survey, totalVotes: totalVotes((survey.surveyResponses))});
});

io.on('connection', function (socket) {

  socket.on('message', function (channel, message) {
    var surveyVotes = app.locals.surveys[Survey.surveyResponses];
    var voteTotal = totalVotes(surveyVotes.surveyResponses);
    var vote = message.vote;

    if (channel === 'voteCast') {
      surveyVotes.surveyResponses[vote]++;
      io.sockets.emit('voteCount', surveyVotes.surveyResponses);
    } else if (channel === 'deactivateSurvey') {
      surveyVotes.active = false;
      io.sockets.emit('deactivateSurvey');
    }
  });

});

function totalVotes(responses) {
  if (_.sum(_.values(responses)) === 0) {
    return 1;
  } else {
    return _.sum(_.values(responses));
  }
}

module.exports = server;
