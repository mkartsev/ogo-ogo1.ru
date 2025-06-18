import cart from "@components/cart/cart.js"
import userList from "@components/user-list/user-list.js"

class Counter {
  constructor(selector) {
    this.selector = selector
    this.counters = new Map()
    this.value = 0
    this.init()
    this.observeDOM()
  }

  init() {
    this.counters.clear()
    const elements = document.querySelectorAll(this.selector)
    elements.forEach(el => {
      this.counters.set(el, new Set())
      this.updateElement(el)
    })
  }

  set(number) {
    this.value = number
    this.counters.forEach((set, el) => this.updateElement(el))
  }

  get() {
    return this.value
  }

  updateElement(el) {
    el.classList.toggle("hidden", this.value === 0)
    el.textContent = this.value
  }

  destroy() {
    this.counters.clear()
    if (this.observer) {
      this.observer.disconnect()
    }
  }

  observeDOM() {
    const observer = new MutationObserver(mutations => {
      let relevantChange = false

      mutations.forEach(mutation => {
        if (mutation.type === "childList") {
          // Проверка на добавленные или удаленные элементы
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.matches(this.selector)) {
              relevantChange = true
            }
          })
          mutation.removedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.matches(this.selector)) {
              relevantChange = true
            }
          })
        } else if (mutation.type === "attributes" && mutation.target.matches(this.selector)) {
          relevantChange = true
        }
      })

      // Перезапуск init только при нужных изменениях
      if (relevantChange) {
        this.init()
      }
    })

    observer.observe(document.body, { childList: true, subtree: true, attributes: true })
    this.observer = observer
  }
}

const cartCounter = new Counter(".js-cart-counter")
const compareCounter = new Counter(".js-compare-counter")
const favoritesCounter = new Counter(".js-favorite-counter")

function init() {
  cartCounter.set(cart.items.total)
  compareCounter.set(userList.comparison.uniqueCount)
  favoritesCounter.set(userList.favorites.uniqueCount)
}

export { cartCounter, compareCounter, favoritesCounter }
export default init