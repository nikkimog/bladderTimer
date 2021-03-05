let timeRemaining1 = document.getElementById("timeRemaining");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("background.js got a message");
  console.log(request);
  console.log(sender);
  if (request.cmd === "START_TIMER") {
    // start(request.message, timeRemaining);
    console.log("huh");
    // let response = await start(request.message, timeRemaining);
    // sendResponse(response);
    // need to run start function in background.js, but get an error message
    start(7, timeRemaining1)
    start(request.message, timeRemaining1);
    // sendResponse(request.message);
  }
  sendResponse(request);
});

// restart variable

function start(duration, display) {
  timeLeft = duration;
  console.log("ivestarted");
  sendResponse({ status: true });

  // if (beenStarted === true) {
  //   // console.log("chrome.storage.local", chrome.storage.local);
  //   chrome.storage.local.get(function (result) {
  //     console.log(result);
  //   });
  //   console.log(chrome.storage.local.get("timeLeft"), function (result) {
  //     console.log("value is currently" + result.timeLeft);
  //   });
  // }

  myInterval = setInterval(function () {
    console.log("duration", duration);
    minutes = Math.floor(duration);
    seconds = Math.round((duration - minutes) * 60);

    // minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = `Time Remaining: ${minutes}:${seconds}`;
    let oneSecond = 1.0 / 60.0;
    duration -= oneSecond;
    beenStarted = true;
    // console.log("chrome", chrome);
    chrome.storage.local.set({ timeLeft: duration });

    if (duration <= 0) {
      display.textContent = "Time's up!";
      clearInterval(myInterval);
    }
  }, 1000);
}
