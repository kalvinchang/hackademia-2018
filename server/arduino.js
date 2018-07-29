const five = require('johnny-five');
let board = new five.Board();

board.on('ready', function() {
  this.pinMode(13, this.MODES.OUTPUT);

  this.loop(500, () => {
    this.digitalWrite(13, this.pins[13].value ? 0 : 1);
  });
});
