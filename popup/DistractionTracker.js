var setting = [0, 27, 0];
var minutes = 0; 
var seconds = 0;
var hours = 0;
var distractions = 0; 
var running = false;

// TODO: 
// - "can't access property "addEventListener", target is null"

function listenForClicks() {
  document.addEventListener('click', (event) => {
    // Based on https://github.com/BraulioVM/countdown-timer/blob/master/element.js 
    const getNormalizedTime = (hours, minutes, seconds) => {
      minutes += Math.floor(seconds / 60);
      seconds = seconds % 60;
      hours += Math.floor(minutes/60);
      minutes = minutes % 60;
      return [hours, minutes, seconds];
    };

    // Recursive tick function
    const tick = () => {
      if (running == true) {
        if (seconds == 0) {
          if (minutes == 0) {
            if (hours == 0) {
              running = false;
              handleCountEnded();
            } else {
              minutes = 59;
              hours--;
            }
          } else {
            seconds = 59;
            minutes--;
          }
        } else {
          seconds--;
        }
        updateDisplay([hours, minutes, seconds]);
      }

      setTimeout(function() {
        tick();
      }, 1000);
    };

    const handleCountEnded = () => {
      console.log('Timer expired.');
    };

    const handleReset = () => {
      var time = getNormalizedTime(setting[0], setting[1], setting[2]);
      hours = time[0];
      minutes = time[1];
      seconds = time[2];
      updateDisplay([hours, minutes, seconds]);
      tick();
    };

    const handleStart = () => {
      running = true;
      console.log('Timer started.');
    };

    const handleStop = () => {
      running = false; 
      console.log('Timer stopped.');
    }

    const handleDistraction = () => {
      distractionCount++;
      document.getElementById("distraction-count").innerHTML = distractionCount;
    };

    /**
    * Based on https://www.developerdrive.com/build-countdown-timer-pure-javascript/
    * Also checkout...
    * https://github.com/samueljun/tomato-clock/blob/master/src/utils/constants.js 
    * https://github.com/BraulioVM/countdown-timer 
    */
    const updateDisplay = (time) => {
      if (time >= 0) {
        document.getElementById("timer-hours").innerHTML= ("0" + time[0]).slice(-2);
        document.getElementById("timer-mins").innerHTML= ("0" + time[1]).slice(-2);
        document.getElementById("timer-secs").innerHTML= ("0" + time[2]).slice(-2);
      }
      else {
        document.getElementById("timer").innerHTML = `Session Complete! ${distractionCount} Distractions.`;
      }
    };

    /**
     * Handle button clicks
     */
    if (e.target.classList.contains("start")) {
      try {
        handleStart();
      } catch (error) {
        reportError(error);
      }
    }
    else if (e.target.classList.contains("stop")) {
      try {
        handleStop();
      } catch (error) {
        reportError(error);
      }
    }
    else if (e.target.classList.contains("reset")) {
      try {
        handleReset();
      } catch (error) {
        reportError(error);
      }
    }
    else if (e.target.classList.contains("log-distraction")) {
      try {
        handleDistraction();
      } catch (error) {
        reportError(error);
      }
    }
  });
}

// Based on https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension 
/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute distraction tracker content script: ${error.message}`);
}

/**
 * When the popup loads, add a click handler.
 */
listenForClicks();