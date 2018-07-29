//testing only

const five = require('johnny-five');
let board = new five.Board();

let DATA               = 3;
let DATA_OUTPUT_ENABLE = 4;
let LATCH              = 5;
let CLOCK              = 6;
let RESET              = 7;

let Screen = [[0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0]];
let Light = [[0,0,0,5,5,0,0,0],
             [0,0,5,5,5,5,0,0],
             [0,5,5,5,5,5,5,0],
             [0,5,5,5,5,5,5,0],
             [0,5,5,5,5,5,5,0],
             [0,0,0,5,5,0,0,0],
             [0,0,0,5,5,0,0,0],
             [0,0,0,5,5,0,0,0]];



board.on('ready', function() {
	function sendBit(aData) {
	this.digitalWrite(DATA, aData);
	this.digitalWrite(CLOCK, 1);
	this.digitalWrite(CLOCK, 0);
	this.digitalWrite(DATA, 0);
}
function sendDataFromArray() {
	let lineIndex;
	let rowIndex;
	for (lineIndex = 0; lineIndex < 8; lineIndex++) {
		//Set Anode Line
    for(rowIndex = 0; rowIndex < 8; rowIndex++)
    {
      if (lineIndex == rowIndex)
      {
        sendBit(1);
      }
      else
      {
        sendBit(0);
      }
    }
     //Set Green Row
    for(rowIndex = 0; rowIndex < 8; rowIndex++)
    {
      if ((Screen[lineIndex][rowIndex] && 1) == 0)
      {
        sendBit(1);
      }
      else
      {
        sendBit(0);
      }
    }
     //Set Red Row
    for(rowIndex = 0; rowIndex < 8; rowIndex++)
    {
      if ((Screen[lineIndex][rowIndex] && 2) == 0)
      {
        sendBit(1);
      }
      else
      {
        sendBit(0);
      }
    }
     //Set Blue Row
    for(rowIndex = 0; rowIndex < 8; rowIndex++)
    {
      if ((Screen[lineIndex][rowIndex] && 4) == 0)
      {
        sendBit(1);
      }
      else
      {
        sendBit(0);
      }
    }
     //Send data to output
    this.digitalWrite(LATCH, 1);
    this.digitalWrite(LATCH, 0);
	}
}
function Clear() {
	let lineIndex;
	let rowIndex;
	for(lineIndex = 0; lineIndex < 8; lineIndex++) {
    	for(rowIndex = 0; rowIndex < 8; rowIndex++) {
      		Screen[lineIndex][rowIndex] = 0;
    	}
  	}
}

function ShowLight() {
	let lineIndex;
	let rowIndex;
	for(lineIndex = 0; lineIndex < 8; lineIndex++)
  {
    for(rowIndex = 0; rowIndex < 8; rowIndex++)
    {
      Screen[lineIndex][rowIndex] = Light[lineIndex][rowIndex];
    }
  }
}
  this.pinMode(13, this.MODES.OUTPUT);
  this.pinMode(DATA, this.MODES.OUTPUT);
  this.pinMode(LATCH, this.MODES.OUTPUT);
  this.pinMode(CLOCK, this.MODES.OUTPUT);
  this.pinMode(DATA_OUTPUT_ENABLE, this.MODES.OUTPUT);
  this.pinMode(RESET, this.MODES.OUTPUT);
  this.digitalWrite(DATA_OUTPUT_ENABLE, 0);
  this.digitalWrite(RESET, 1);
  this.digitalWrite(CLOCK, 0);
  this.digitalWrite(LATCH, 0);
  this.digitalWrite(DATA, 0);


  this.loop(5, () => {
    this.digitalWrite(13, this.pins[13].value ? 0 : 1);
    ShowLight();
    sendDataFromArray();
  });
});
