//communication with server
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');

//communication with Arduino
const five = require('johnny-five');
let board = new five.Board();

app.use(express.static(publicPath));

app.get('/', function(req, res) {
  res.sendFile(publicPath + '/index.html');
});

io.on('connection', function(socket) {
  console.log('player connected');

  //get socket - signal to light up LED
  socket.on('light up', function(msg) {
    console.log('light up LED');
    //light up LED
  });
});

http.listen(port, function() {
  console.log('listening on *:3000');
})


board.on('ready', function() {
  this.pinMode(13, this.MODES.OUTPUT);

  this.loop(500, () => {
    this.digitalWrite(13, this.pins[13].value ? 0 : 1);
  });
});
