// Global variable initialized to ensure hider.js only run once
if (typeof hiderInitialized === 'undefined') {
  hiderInitialized = false
}

(function () {
  if (hiderInitialized) {
    return
  }

  function sleep(ms) {
    return new Promise((resolve) =>
      setTimeout(resolve, ms)
    );
  }

  function hideEmptyScalar() {
    const scalarList = document.getElementsByTagName('tf-scalar-card')
    let counter = 0
    for (const scalar of scalarList) {
      if (scalar.style.display === 'none') {
        continue
      }
      if (scalar.getElementsByClassName('symbol style-scope').length === 0) {
        scalar.style.display = 'none'
        counter += 1
      }
    }
    console.debug(`TensorBoard Empty Scalar Hider: Successfully hide ${counter} scalars.`)
  }

  function hideEmptyPane() {
    const paneList = document.getElementsByTagName('tf-category-pane')
    let counter = 0
    for (const pane of paneList) {
      // Ignore not displayed or not extended panes
      if (pane.style.display === 'none' || pane.getElementsByTagName('tf-paginated-view').length === 0) {
        continue
      }
      if (pane.getElementsByClassName('symbol style-scope').length === 0) {
        pane.style.display = 'none'
        counter += 1
      }
    }
    console.debug(`TensorBoard Empty Scalar Hider: Successfully hide ${counter} panes.`)
  }

  async function displayAllScalar() {
    // Wait for panes loading
    await sleep(100)
    const scalarList = document.getElementsByTagName('tf-scalar-card')
    for (const scalar of scalarList) {
      // Wait 50ms if main class not exist in pane
      while (scalar.getElementsByClassName('main').length === 0) {
        console.debug('TensorBoard Empty Scalar Hider: Still loading, wait 50ms...')
        await sleep(50)
      }
      scalar.style.display = 'block'
    }
    document.getElementById('reload-button').click()
    console.debug(`TensorBoard Empty Scalar Hider: Successfully display all scalars.`)
  }

  async function displayAllPane() {
    // Wait for panes loading
    await sleep(100)
    const paneList = document.getElementsByTagName('tf-category-pane')
    for (const pane of paneList) {
      // Ignore not extended pane
      if (pane.getElementsByTagName('tf-paginated-view').length === 0) {
        continue
      }
      // Wait 50ms if main class not exist in pane
      while (pane.getElementsByClassName('main').length === 0) {
        console.debug('TensorBoard Empty Scalar Hider: Still loading, wait 50ms...')
        await sleep(50)
      }
      pane.style.display = 'block'
    }
    document.getElementById('reload-button').click()
    console.debug(`TensorBoard Empty Scalar Hider: Successfully display all panes.`)
  }

  hiderInitialized = true
  console.info('TensorBoard Empty Scalar Hider: Successfully initialized.')

  // Add action event listener of display then hide
  chrome.storage.sync.get({
    hidePanes: false,
  }, function (items) {
    const actionList = document.querySelectorAll('.heading, .icon-container, #toggle-all')
    // TODO: Refactor duplicate codes
    if (items.hidePanes) {
      for (const action of actionList) {
        action.addEventListener('mouseup', (event) => {
          // Only run script on not opened panes
          const targetElement = event.target || event.srcElement;
          if (targetElement.hasAttribute('open-button')) {
            return
          }
          displayAllPane().then(displayAllScalar).then(hideEmptyPane).then(hideEmptyScalar)
        })
      }
      hideEmptyPane()
      hideEmptyScalar()
    } else {
      for (const action of actionList) {
        action.addEventListener('mouseup', (event) => {
          const targetElement = event.target || event.srcElement;
          if (targetElement.hasAttribute('open-button')) {
            return
          }
          displayAllScalar().then(hideEmptyScalar)
        })
      }
      hideEmptyScalar()
    }
  });
})()
