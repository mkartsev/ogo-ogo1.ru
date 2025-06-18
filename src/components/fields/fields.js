// import select from "./select/select.js"
import datepicker from "./datepicker/datepicker.js"
// import autocomplete from "./autocomplete/autocomplete.js"
import file from "./file/file.js"
import password from "./password/password.js"
import phone from "./phone/phone.js"
// import "./quantity/quantity.js"

const fields = (() => {
  let state = {
    inputSyncListener: false,
    inputNumbersListener: false,
    formatBySpaces: false,
  }

  function init() {
    // autocomplete.init()
    datepicker.init()
    file.init()
    phone.init()
    // select.init()
    password.init()

    addListeners()
    // bindHandlers()
  }

  const handleInputSync = (e) => {
    let input = e.target.closest("[data-sync-value-to]")
    if (!input) return

    let syncTarget = document.querySelector(input.getAttribute("data-sync-value-to"))
    if (!syncTarget) return

    if (e.type === "paste" || e.type === "input" || e.type === "keydown") {
      syncTarget.value = input.value
    }
  }

  const inputDecimalNumbers = (e) => {
    const input = e.target.closest(".js-input-numbers")
    if (!input) return

    // Разрешаем цифры, точку и запятую (запятую будем заменять на точку)
    const cleanedValue = input.value.replace(/[^\d.,]/g, "")
      // Заменяем запятую на точку
      .replace(",", ".")
      // Удаляем все точки, кроме первой
      .replace(/(\..*)\./g, "$1")

    // Проверяем, есть ли уже точка в числе
    const dotIndex = cleanedValue.indexOf(".")

    if (dotIndex !== -1) {
      // Если точка есть, ограничиваем количество знаков после неё до двух
      const integerPart = cleanedValue.slice(0, dotIndex)
      const fractionalPart = cleanedValue.slice(dotIndex + 1, dotIndex + 3)
      input.value = `${integerPart}.${fractionalPart}`
    } else if (input.value !== cleanedValue) {
      input.value = cleanedValue
    }
  }

  function addListeners() {
    if (state.inputSyncListener === false) {
      document.body.addEventListener("change", handleInputSync)
      document.body.addEventListener("keydown", handleInputSync)
      document.body.addEventListener("input", handleInputSync)
      document.body.addEventListener("paste", handleInputSync)
      state.inputSyncListener = true
    }

    if (state.inputNumbersListener === false) {
      document.body.addEventListener("change", inputDecimalNumbers)
      document.body.addEventListener("keydown", inputDecimalNumbers)
      document.body.addEventListener("input", inputDecimalNumbers)
      document.body.addEventListener("paste", inputDecimalNumbers)
      state.inputNumbersListener = true
    }
  }

  return { init }
})()

export default fields