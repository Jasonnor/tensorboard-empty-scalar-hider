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
    console.debug(`TensorBoard Empty Scalar Hider: Successfully hide ${counter} elements.`)
  }

  async function displayAllScalar() {
    // Wait for panes loading
    await sleep(100)
    const scalarList = document.getElementsByTagName('tf-scalar-card')
    for (const scalar of scalarList) {
      // If main class not exist in scalar, wait 50ms
      while (scalar.getElementsByClassName('main').length === 0) {
        console.debug('Still loading, wait 50ms...')
        await sleep(50)
      }
      scalar.style.display = 'block'
    }
    document.getElementById('reload-button').click()
    console.debug(`TensorBoard Empty Scalar Hider: Successfully display all elements.`)
  }

  hiderInitialized = true
  console.info('TensorBoard Empty Scalar Hider: Successfully initialized.')

  // Add action event listener of display then hide
  const actionList = document.querySelectorAll('.heading, .icon-container, #toggle-all')
  for (const action of actionList) {
    action.addEventListener('mouseup', (event) => {
      // Only run script on not opened panes
      const targetElement = event.target || event.srcElement;
      if (targetElement.hasAttribute('open-button')) {
        return
      }
      displayAllScalar().then(hideEmptyScalar)
    })
  }
  hideEmptyScalar()
})()
