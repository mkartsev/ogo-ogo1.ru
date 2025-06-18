const password = (() => {
  const ui = {
    selector: ".field__show-password",
  }

  let state = {
    initialized: false
  }

  function togglePassword(el) {
    if (!el) return

    const field = el.closest(".field--type-password")
    const input = field.querySelector("input")

    if (!input) return

    if (input.getAttribute("type") == "password") {
      input.setAttribute("type", "text")
    } else {
      input.setAttribute("type", "password")
    }
  }

  function bindHandlers() {
    document.addEventListener("click", (e) => {
      const clickedEl = e.target.closest(ui.selector)
      if (clickedEl) {
        e.preventDefault()
        togglePassword(clickedEl)
      }
    })
  }

  function init() {
    if (!state.initialized) {
      bindHandlers()
      state.initialized = true
    }
  }

  return {
    init: init
  }
})()

export default password