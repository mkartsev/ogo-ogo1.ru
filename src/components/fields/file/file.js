import FilePlugin from "./file.plugin.js"

const file = (() => {
  const ui = {
    selector: ".js-input-file"
  }

  function init() {
    const elements = document.querySelectorAll(ui.selector)

    if (elements.length > 0) {
      elements.forEach((el, options) => {
        new FilePlugin(el, options)
      })
    }
  }

  return {
    init: init
  }
})()

export default file