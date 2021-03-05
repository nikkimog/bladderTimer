let timeLeft = "";

let myInterval = "";

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
  section.style.display = "flex";
}

startTimer.addEventListener("click", function (e) {
  chrome.runtime.sendMessage(
    { message: timeInput.value, cmd: "START_TIMER" },
    function (response) {
      console.log("response", response);
    }
  );
  console.log("clicked");
  console.log(e.target);
  hide(startTimer);
  show(urgeTechniques);
  show(restartTimer);
  hide(howMuchTime);
  show(timeRemaining);
  //   start(timeInput.value, timeRemaining);

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
  timeRemaining.textContent = "Time Remaining:";
  // chrome.storage.local.clear(function () {
  //   var error = chrome.runtime.lastError;
  //   if (error) {
  //     console.error(error);
  //   }
  // });
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

chrome.runtime.sendMessage({ message: timeLeft }, function (response) {
  console.log("response", response);
});
