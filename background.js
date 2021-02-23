let date = Date.now();

chrome.runtime.onInstalled.addListener(function () {
  console.log("installed");

  chrome.browserAction.setPopup({ "time passed": date - Date.now() });
});
