// Global variable initialized to ensure hider.js only run once
if (typeof initialized === 'undefined') {
  initialized = false
}

(function () {
  if (initialized) {
    return
  }
  initialized = true
  console.info('TensorBoard Empty Scalar Hider: Successfully initialized.')
  const actionList = document.querySelectorAll('.heading, .icon-container')
  for (const action of actionList) {
    action.addEventListener('click', () => {
      displayAllScalar();
      hideScalar();
    })
  }
  hideScalar()
})()

function hideScalar() {
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
  console.info(`TensorBoard Empty Scalar Hider: Successfully hide ${counter} elements.`)
}

function displayAllScalar() {
  const scalarList = document.getElementsByTagName('tf-scalar-card')
  for (const scalar of scalarList) {
    scalar.style.display = 'block'
  }
  document.getElementById('reload-button').click()
}
