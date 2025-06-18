import Inputmask from "inputmask/dist/inputmask.es6.js"

const inputMask = (() => {
  const selectors = document.querySelectorAll(".js-input-mask")

  function init() {
    Inputmask().mask(selectors)
    window.inputMask = inputMask
  }

  return {
    init: init}
})()

export default inputMask