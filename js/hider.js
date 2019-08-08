(function () {
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
})();
