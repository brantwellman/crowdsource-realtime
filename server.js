const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const generateId = require('./lib/generate-id');

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

app.post('/surveys', (request, res) => {
  // var surveyId = generateId();
  var pollData = request.body.poll;
  var poll = {};

  pollData.responses.forEach(function(response){
    poll[response] = 0;
  });


  console.log(poll);
  res.render('admin');
});

module.exports = server;
