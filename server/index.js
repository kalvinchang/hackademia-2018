//communication with server
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');
process.setMaxListeners(0);

//communication with Arduino
const five = require('johnny-five');
let board = new five.Board();

app.use(express.static(publicPath));

app.get('/', function(req, res) {
  res.sendFile(publicPath + '/index.html');
});

//must use localhost to connect to Arduino
board.on('ready', function() {
  var led = new five.Led(13);

  io.sockets.on('connection', function(socket) {
    console.log('player connected');

    //get socket - signal to light up LED
    socket.on('light up', function(msg) {
      console.log('light up LED');
      //light up LED
      led.on();

      setTimeout(function() {
        led.off();
      }, 2000);
    });
  })
});

http.listen(port, function() {
  console.log('listening on *:3000');
})

//broadcasting: https://socket.io/get-started/chat/#Broadcasting
