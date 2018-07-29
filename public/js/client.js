//client side JS
var socket = io(); //client-side version of socket.io

let startScreen = document.getElementById('start');
let tutorialScreen = document.getElementById('tutorial');
let gameScreen = document.getElementById('game');

//individual page items
let startBtn = document.getElementsByClassName('start-btn')[0];
let bulb = document.getElementById('bulb');
let hint = document.getElementById('hint');

let hints = [];

//player info
const NUM_LEVELS = 32;
let level = 0;
let progress = level / NUM_LEVELS;

//let percent = document.getElementById('percent');
let fill = document.getElementById('barFill');

//starting the game
startBtn.addEventListener('click', function(event) {
  console.log('start');

  //go to hint screen
  startScreen.style.display = 'none';
  tutorialScreen.style.display = '';
});

//once hint screen is triggered - bulb is pressed
window.addEventListener('keypress', function(event) {
  if (!tutorialScreen.getAttribute('hidden') && event.key == 'l') {
    //light up one cell in the LED table

    //go to game screen
    tutorialScreen.style.display = 'none';
    gameScreen.style.display = '';
  }
});

//when a hint is triggered - TODO: modularize this part into fcn
hint.addEventListener('click', function(event) {
  //light up the bulb for 5 seconds
  hint.setAttribute('src', 'assets/bulb-lit.png');

  //light up individual LEDs
  socket.emit('light up');

  //update progress
  level++;
  progress = level / NUM_LEVELS;
  //percent.textContent = progress + '%';
  fill.style.height = Math.min(progress * 50, 50) + 'vh'; //TODO: animation
});

//end game - reset
