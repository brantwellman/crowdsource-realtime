const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app)
                 .listen(port, function () {
                  console.log('Listenting on port ' + port + '.');
                 });


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res){
  res.render('index');
});


const socketIo = require('socket.io');
const io = socketIo(server);

module.exports = server;
