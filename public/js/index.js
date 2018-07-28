let startScreen = document.getElementById('start');
let hintScreen = document.getElementById('hint');
let gameScreen = document.getElementById('game');

let startBtn = document.getElementsByClassName('start-btn')[0];
let bulb = document.getElementById('bulb');

startBtn.addEventListener('click', function(event) {
  console.log('start');

  //go to hint screen
  startScreen.setAttribute('hidden', 'true');
  hintScreen.removeAttribute('hidden');
});

//once hint screen is triggered - bulb is pressed
window.addEventListener('keypress', function(event) {
  if (!hintScreen.getAttribute('hidden') && event.key == 'l') {
    //light up one cell in the LED table

    //go to game screen
    hintScreen.setAttribute('hidden', 'true');
    gameScreen.removeAttribute('hidden');
  }
});
