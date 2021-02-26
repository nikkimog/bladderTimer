let date = Date.now();

chrome.runtime.onInstalled.addListener(function () {
  console.log("installed");

  chrome.browserAction.setPopup({ "time passed": date - Date.now() });
});

// defining elements
let urgeTechniques = document.getElementById("urgeTechniques");
let restartTimer = document.getElementById("restartTimer");
let startTimer = document.getElementById("startTimer");
let howMuchTime = document.getElementById("howMuchTime");
let timeForm = document.getElementById("timeForm");
let timeInput = document.getElementById("timeInput");
let timeRemaining = document.getElementById("timeRemaining");

//starting hidden
urgeTechniques.style.display = "none";
restartTimer.style.display = "none";
timeRemaining.style.display = "none";

//functions hiding and showing
function hide(section) {
  section.style.display = "none";
}

function show(section) {
  section.style.display = "block";
}

// restart variable
let myInterval = "";

startTimer.addEventListener("click", function (e) {
  console.log("clicked");
  console.log(e.target);
  hide(startTimer);
  show(urgeTechniques);
  show(restartTimer);
  hide(howMuchTime);
  show(timeRemaining);
  start(timeInput.value, timeRemaining);
  console.log("timeInput.value", timeInput.value);
  timeInput.value = "";
});

restartTimer.addEventListener("click", function () {
  hide(restartTimer);
  hide(urgeTechniques);
  show(startTimer);
  show(howMuchTime);
  hide(timeRemaining);
  clearInterval(myInterval);
  timeRemaining.textContent = "";
});

// timer functionality
timeForm.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    console.log("entered");
    hide(startTimer);
    show(urgeTechniques);
    show(restartTimer);
    hide(howMuchTime);
    show(timeRemaining);

    timerAmt = e.target.value;

    start(e.target.value, timeRemaining);
    timeInput.value = "";
  }
});

function start(duration, display) {
  myInterval = setInterval(function () {
    console.log("duration", duration);
    minutes = Math.floor(duration);
    seconds = Math.round((duration - minutes) * 60);

    // minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = `Time Remaining: ${minutes}:${seconds}`;
    let oneSecond = 1.0 / 60.0;
    console.log(oneSecond, "oneSecond");
    duration -= oneSecond;
    console.log("duration after subtracting onesecond", duration);
    if (duration <= 0) {
      display.textContent = "Time's up!";
      clearInterval(myInterval);
    }
  }, 1000);
}
