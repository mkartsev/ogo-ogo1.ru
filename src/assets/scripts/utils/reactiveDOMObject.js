class ReactiveDOMObject {
  constructor(selectorOrElements) {
    if (typeof selectorOrElements === "string") {
      this.elements = Array.from(document.querySelectorAll(selectorOrElements))
    } else if (selectorOrElements instanceof Element) {
      this.elements = [selectorOrElements]
    } else if (selectorOrElements instanceof NodeList || Array.isArray(selectorOrElements)) {
      this.elements = Array.from(selectorOrElements)
    } else {
      throw new Error("Invalid input: must be a selector string, Element, NodeList, or Array of Elements")
    }

    this.data = {}

    this.initProxy()
    this.initObserver()
    this.updateFromDOM()
  }

  initProxy() {
    this.proxy = new Proxy(this.data, {
      set: (target, key, value) => {
        target[key] = value
        this.updateDOM(key, value)
        return true
      }
    })
  }

  initObserver() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          const element = mutation.target
          const key = mutation.attributeName
          const value = element.getAttribute(key)
          this.proxy[key] = value
        }
      })
    })
    this.elements.forEach(element => {
      this.observer.observe(element, { attributes: true })
    })
  }

  updateFromDOM() {
    this.elements.forEach(element => {
      Array.from(element.attributes).forEach(attr => {
        const key = attr.name
        const value = attr.value
        this.proxy[key] = value
      })
    })
  }

  updateDOM(key, value) {
    this.elements.forEach(element => {
      if (element.getAttribute(key) !== value) {
        element.setAttribute(key, value)
      }
    })
  }

  get(key) {
    return this.proxy[key]
  }

  set(key, value) {
    this.proxy[key] = value
  }

  addChangeListener(callback) {
    Object.keys(this.data).forEach(key => {
      Object.defineProperty(this.proxy, key, {
        set(value) {
          this[`_${key}`] = value
          callback(key, value)
        },
        get() {
          return this[`_${key}`]
        }
      })
    })
  }
}

// Пример использования:
// const reactiveObject = new ReactiveDOMObject("[data-range-input]")

// // Добавление обработчика изменений
// reactiveObject.addChangeListener((key, value) => {
//   console.log(`Attribute ${key} changed to ${value}`)
// // Здесь можно добавить логику обновления других элементов
// })
export default ReactiveDOMObject