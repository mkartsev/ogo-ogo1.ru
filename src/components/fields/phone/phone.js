const phone = (() => {
  let state = {
    initialized: false
  }

  const getInputNumbersValue = function (input) {
    return input.value.replace(/\D/g, "")
  }

  const handlePhoneInput = function (e) {
    let input = e.target.closest("input[type='tel']")

    if  (!input ) return

    let inputNumbersValue = getInputNumbersValue(input)

    if (e.type === "paste") {
      let pasted = e.clipboardData || window.clipboardData
      if (pasted) {
        let pastedText = pasted.getData("Text")
        if (/\D/g.test(pastedText)) {
          input.value = inputNumbersValue
          return
        }
      }
    }

    if (e.type === "input") {
      // let input = e.target,
      let inputNumbersValue = getInputNumbersValue(input),
        selectionStart = e.target.selectionStart,
        formattedInputValue = ""

      if (!inputNumbersValue) {
        return input.value = ""
      }

      if (input.value.length != selectionStart) {
        if (e.data && /\D/g.test(e.data)) {
          input.value = inputNumbersValue
        }
        return
      }

      if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] == "9") {
          inputNumbersValue = "7" + inputNumbersValue
        }

        let firstSymbols = "+7"

        formattedInputValue = input.value = firstSymbols + " "

        if (inputNumbersValue.length > 1) {
          formattedInputValue += "(" + inputNumbersValue.substring(1, 4)
        }
        if (inputNumbersValue.length >= 5) {
          formattedInputValue += ") " + inputNumbersValue.substring(4, 7)
        }
        if (inputNumbersValue.length >= 8) {
          formattedInputValue += "-" + inputNumbersValue.substring(7, 9)
        }
        if (inputNumbersValue.length >= 10) {
          formattedInputValue += "-" + inputNumbersValue.substring(9, 11)
        }
      } else {
        formattedInputValue = "+" + inputNumbersValue.substring(0, 16)
      }
      input.value = formattedInputValue
    }

    if (e.type === "keydown") {
      let inputValue = input.value.replace(/\D/g, "")
      if (e.keyCode == 8 && inputValue.length == 1) {
        input.value = ""
      }
    }
  }

  function init() {
    if (!state.initialized) {
      document.body.addEventListener("keydown", handlePhoneInput)
      document.body.addEventListener("input", handlePhoneInput, false)
      document.body.addEventListener("paste", handlePhoneInput, false)

      state.initialized = true
    }
  }

  return {
    init: init,
  }
})()

export default phone