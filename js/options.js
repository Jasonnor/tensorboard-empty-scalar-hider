function loadOptions() {
  chrome.storage.sync.get({
    hidePanes: false,
  }, function (items) {
    document.getElementById('hidePanes').checked = items.hidePanes
    console.debug(`TensorBoard Empty Scalar Hider: Loading form config hidePanes: ${items.hidePanes}`)
  });
}

function saveOptions() {
  const hidePanes = document.getElementById('hidePanes').checked
  chrome.storage.sync.set({
    hidePanes: hidePanes,
  }, function (items) {
    console.debug(`TensorBoard Empty Scalar Hider: Set hidePanes as ${hidePanes}`)
  });
}

function clearOptions() {
  chrome.storage.sync.clear();
  location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
  loadOptions();
  document.getElementById('save').addEventListener('click', saveOptions);
  document.getElementById('clear').addEventListener('click', clearOptions);
});
