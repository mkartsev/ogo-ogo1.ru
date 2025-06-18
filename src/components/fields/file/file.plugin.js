export default class FilePlugin {
  constructor(element, options) {
    this.element = element
    this.defaults = {
      baseClass: "file-input",
      buttonCaption: "Выбрать…",
      removeCaption: "Удалить",
      multipleText: "{0} файлов",
      showMultipleNames: false,
      buttonClass: "btn btn-secondary",
      selectedClass: "file-input__name",
      clearButton: "<button type='button' class='file-input__clear'>&times</button>",
      onInit: function () {},
    }
    this.settings = this.extend(this.defaults, options || {})
    this.component = null
    this.input = null
    this.filename = null
    this.addButton = null
    this.removeButton = null

    this.init()
  }

  supports() {
    return "querySelector" in document && "addEventListener" in window && "closest" in window.Element.prototype
  }

  extend(defaults, options) {
    for (let key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        defaults[key] = options[key]
      }
    }
    return defaults
  }

  createComponent() {
    this.input = this.element

    // Создаем обертку для инпута
    this.component = document.createElement("div")
    this.component.classList.add(`${this.settings.baseClass}__wrapper`)
    this.input.parentNode.insertBefore(this.component, this.input)

    // Создаем кнопку для загрузки
    this.addButton = document.createElement("label")
    this.addButton.classList.add(`${this.settings.baseClass}__label`)
    this.addButton.htmlFor = this.input.id
    this.addButton.innerText = this.settings.buttonCaption

    // Создаем кнопку для очистки
    this.removeButton = document.createElement("button")
    this.removeButton.setAttribute("type", "button")
    this.removeButton.classList.add(`${this.settings.baseClass}__remove`, "hidden")
    this.removeButton.innerText = this.settings.removeCaption

    this.input.setAttribute("tabindex", "-1")

    this.component.prepend(this.input)
    this.component.prepend(this.addButton)
    this.component.prepend(this.removeButton)

    this.component.classList.add("is-initialized")
  }

  change() {
    if (!this.filename) {
      this.filename = document.createElement("label")
      this.filename.htmlFor = this.input.id
      this.filename.classList.add("my-1", "hidden")
      this.component.prepend(this.filename)
    }

    if (this.input.files.length === 0) {
      this.component.classList.remove("has-selected")
      this.addButton.classList.remove("hidden")
      this.removeButton.classList.add("hidden")
      this.filename.classList.add("hidden")
    } else {
      for (var i = 0; i < this.input.files.length; i++) {
        this.filename.textContent = this.input.files[i].name
      }

      this.addButton.classList.add("hidden")
      this.removeButton.classList.remove("hidden")
      this.filename.classList.remove("hidden")
      this.component.classList.add("has-selected")
    }
  }

  clear() {
    this.input.value = null
    this.input.dispatchEvent(new Event("input", { bubbles: true }))
    this.input.dispatchEvent(new Event("change", { bubbles: true }))

    this.component.classList.remove("has-selected")
    this.addButton.classList.remove("hidden")
    this.removeButton.classList.add("hidden")
    this.filename.classList.add("hidden")

    // Обновляем интерфейс после очистки
    this.change()
  }

  dataToOptions(element) {
    function upper(m, l) {
      return l.toUpper()
    }
    let options = {}
    let data = Object.assign({}, element.dataset)
    for (let key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) {
        continue
      }
      let value = data[key]
      if (value === "yes" || value === "y") {
        value = true
      } else if (value === "no" || value === "n") {
        value = false
      }
      options[key.replace(/-(\w)/g, upper)] = value
    }
    return options
  }

  applyDataAttributes() {
    this.settings = this.extend(this.settings, this.dataToOptions(this.element))
  }

  inputEvents(event) {
    this.change()
  }

  removeEvents(event) {
    if (event.type === "click") {
      this.clear()
    }
  }

  resetEvents(event) {
    this.clear()
  }

  bindHandlers() {
    this.removeButton.addEventListener("click", this.removeEvents.bind(this), true)
    this.input.addEventListener("input", this.inputEvents.bind(this), true)

    // Получаем родительскую форму
    const form = this.input.closest("form")

    // Обработчик события reset формы
    if (form) {
      form.addEventListener("reset", this.resetEvents.bind(this), true)
    }
  }

  destroy() {
    if (!this.element.isInitialized) return

    while (this.component.lastElementChild) this.component.removeChild(this.component.lastElementChild)

    this.element.isInitialized = false
    this.component = null
    this.settings = null
  }

  init() {
    if (!this.supports()) throw "FilePlugin: This browser does not support the required JavaScript methods and browser APIs."

    if (this.element.isInitialized) return

    this.destroy()

    if (typeof this.element === "string") {
      this.component = document.querySelector(this.element)
    } else if (typeof this.element === "object") {
      this.component = this.element
    }

    if (!this.component) throw "FilePlugin: Does not found a component wrapper/element!"

    this.applyDataAttributes()

    this.createComponent()

    this.bindHandlers()

    this.element.isInitialized = true

    if (this.component) this.component.classList.add("is-initialized")

    this.settings.onInit()
  }
}