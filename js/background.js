chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(null, {
    file: 'js/hider.js'
  });
});

chrome.contextMenus.create({
  id: 'hideEmptyScalar',
  title: 'Hide empty scalar',
  contexts: ['page']
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  console.log('item ' + info.menuItemId + ' was clicked');
  console.log('info: ' + JSON.stringify(info));
  console.log('tab: ' + JSON.stringify(tab));
  if (info.menuItemId == 'hideEmptyScalar') {
    chrome.tabs.executeScript(null, {
      file: 'js/hider.js'
    });
  }
  if (chrome.extension.lastError) {
    console.log("Got expected error: " + chrome.extension.lastError.message);
  }
});
