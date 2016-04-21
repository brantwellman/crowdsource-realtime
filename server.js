"use strict";

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const generateId = require('./lib/generate-id');
const Survey = require('./lib/survey');

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

app.locals.poll = {};

app.get('/', function (req, res){
  res.render('index');
});

app.get('/admin', function (req, res) {
  res.render('admin');
});

// app.get('/surveys/:id', (req, res) {
//   app.locals.surveys
//   res.render('survey, ')
// });

app.post('/surveys', (request, res) => {
  var pollId = generateId();
  // console.log(surveyId)
  var pollData = request.body.poll;
  var pollQuestion = pollData.question;
  var pollResponses = {};
  // console.log(pollData);

  pollData.responses.forEach(function(response){
    pollResponses[response] = 0;
  });

  var newSurvey = new Survey(pollId, pollQuestion, pollResponses);
  // console.log(newSurvey.surveyId);
  res.render('admin', { newSurvey: newSurvey });
});

module.exports = server;
