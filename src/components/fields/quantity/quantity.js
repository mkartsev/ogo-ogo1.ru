let initFieldQuantity = (field) => {

  if (!field) return

  const input = field.querySelector("input")

  const processButton = plus => {
    const step = +input.getAttribute("step") || 1
    const value = +input.value

    if (plus) {
      setValue(value + step)
    } else {
      setValue(value - step)
    }

    input.dispatchEvent(new Event("change", {bubbles: true}))
    input.dispatchEvent(new Event("input", {bubbles: true}))
  }

  const btnMinus = field.querySelector(".field__minus")

  if (btnMinus) {
    btnMinus.addEventListener("click", () => {
      processButton(false)
    })
  }

  const btnPlus = field.querySelector(".field__plus")

  if (btnPlus) {
    btnPlus.addEventListener("click", () => {
      processButton(true)
    })
  }

  const checkValue = value => {
    let val = value

    if (input.hasAttribute("min")){
      const min = +input.getAttribute("min")
      if (value < min){
        val = min
      }
    }

    if (input.hasAttribute("max")){
      const max = +input.getAttribute("max")
      if (value > max){
        val = max
      }
    }

    return val
  }

  const updateInputWidth = () => {
    const value = input.value
    const length = value.toString().length
    input.style.width = length * 0.6 + "em"
  }

  const setValue = value => {
    input.value = checkValue(value)
    updateInputWidth()
  }

  const inputEvents = event => {
    const value = event.target.value

    if (event.type === "change") {
      input.value = checkValue(value)
    }

    updateInputWidth()
  }

  input.addEventListener("change", inputEvents)
  input.addEventListener("input", inputEvents)

  updateInputWidth()
}

window.initFieldQuantity = initFieldQuantity

document.querySelectorAll(".field--type-quantity").forEach(field => {
  initFieldQuantity(field)
})
