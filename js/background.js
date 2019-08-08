chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(null, {
    file: 'js/hider.js'
  });
});
