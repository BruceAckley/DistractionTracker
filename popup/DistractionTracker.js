// TODO: 
//   - Implement click handlers.

var timerStart = getCurrentTime();

// TODO: Remove hardcoded 10 minute duration.
var timerEnd = addMinutes(getCurrentTime(), 10);

var distractionCount = 0;

var timer = setInterval(() => {

  let timeRemaining = timerEnd - timerStart; 
  updateTimeReadout(timeRemaining);

}, 1000);

const handleStartTimer = () => {

};

const handleStopTimer = () => {

};

const handleResetTimer = () => {

};

const handleLogDistraction = () => {

  distractionCount++;
  document.getElementById("distraction-count").innerHTML = distractionCount;

};

/**
* Based on https://www.developerdrive.com/build-countdown-timer-pure-javascript/
*/
const updateTimeReadou = (time) => {
  if (time >= 0) {

    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let secs = Math.floor((time % (1000 * 60)) / 1000);

    document.getElementById("timer-hours").innerHTML= ("0" + hours).slice(-2);
    document.getElementById("timer-mins").innerHTML= ("0" + mins).slice(-2);
    document.getElementById("timer-secs").innerHTML= ("0" + secs).slice(-2);

  }
  else {

    document.getElementById("timer").innerHTML = `Session Complete! ${distractionCount} Distractions.`;

  }
};

/**
* Listen for clicks on the buttons, and send the appropriate message to
* the content script in the page.
*/
const listenForClicks = () => {
  document.addEventListener("click", (event) => {

    console.log(event);
    console.log('target');
    console.log(event.target);

  });
};

const addMinutes = (date, minutes) => {

  return new Date(date.getTime() + minutes * 60000);

};

const getCurrentTime = () => new Date().getTime();