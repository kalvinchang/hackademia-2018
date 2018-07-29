//communication with server
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

app.get('/', function(req, res) {
  res.sendFile(publicPath + '/index.html');
});

io.on('connection', function(socket) {
  console.log('player connected');
});

http.listen(port, function() {
  console.log('listening on *:3000');
})
