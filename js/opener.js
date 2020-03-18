(function () {
    console.info('Open all closed TensorBoard panes.')
    document.querySelectorAll('tf-category-pane button:not([open-button])').forEach(
        function (value, index, obj) {
            value.click()
        }
    )
})()
