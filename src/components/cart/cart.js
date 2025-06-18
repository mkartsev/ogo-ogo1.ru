import { setIcon } from "@scripts/shared/set-icon.js"
import { resetIcon } from "@scripts/shared/reset-icon.js"
import { fetchData } from "@scripts/utils/fetch.js"
import { formatNumberBySpaces } from "@scripts/utils/number.js"

import { cartCounter } from "@components/counters/counters.js"
import popup from "@components/popup/popup.js"
import userList from "@components/user-list/user-list.js"

const cart = (() => {
  const ui = {
    addToCart: ".js-add-to-cart",
    removeFromCart: ".js-remove-from-cart",
    clearCart: ".js-clear-cart",
    dropdown: ".js-cart-dropdown",
    accessories: ".js-more-accessories"
  }

  /**
   * Создает прокси для объекта, который позволяет отслеживать изменения и предоставляет дополнительные методы.
   *
   * @param {Object} target - Целевой объект, который будет проксироваться.
   * @param {Function} callback - Функция, которая вызывается после изменений в целевом объекте.
   * @returns {Proxy} Прокси-объект с дополнительными методами.
   *
   * @property {number} total - Возвращает cумму значений в объекте.
   * @property {Function} add - Добавляет ключ в объект и прибавляет 1, если ключ уже есть
   * @property {Function} remove - Удаляет заданное количество значений из объекта.
   * @property {Function} clear - Удаляет все значения из объекта.
   *
   * @example
   * const target = {"389198":1,"391062":2,"391065":1}
   * const items = userCartProxy(target, (proxy) => {
   *   callback()
   * });
   *
   * items.add("123456"); // Добавляет элемент в корзину и вызывает callback
   * items.remove("123456"); // Удаляет элемент из корзины и вызывает callback
   */
  const userCartProxy = (target, callback) => {
    return new Proxy(target, {
      set(target, property, value, receiver) {
        const result = Reflect.set(target, property, value, receiver)
        callback(receiver)
        return result
      },
      get(target, property, receiver) {
        switch (property) {
          case "total":
            return Object.values(target).reduce((sum, count) => sum + count, 0)

          case "add":
            return (id) => {
              target[id] = (target[id] || 0) + 1
              callback(receiver)
            }

          case "remove":
            return (id, count = 1) => {
              if (target[id]) {
                if (target[id] <= count) {
                  delete target[id]
                } else {
                  target[id] -= count
                }
                callback(receiver)
              } else {
                console.warn(`ID ${id} не найден в объекте.`)
              }
            }

          case "clear":
            return () => {
              Object.keys(target).forEach(key => delete target[key])
              callback(receiver)
            }

          default:
            return () => Object.keys(target)
        }
      }
    })
  }

  // Создаем прокси к массиву с айди и при изменении массива обновляем счетчики и кнопки
  const items = userCartProxy(window.CartIDDict, (proxy) => {
    cartCounter.set(proxy.total)
    setButtons()
  })

  const addedProductTemplate = (product) => {
    if (!product) return

    return `<div class="product-card product-card--added-to-cart">
              <div class="product-card__image-wrapper">
                <a class="product-card__image-link" href=${product.DETAIL_PAGE_URL}>
                  <img class="product-card__image" src=${product.PREVIEW_PICTURE} alt=${product.NAME} loading="lazy">
                </a>
              </div>
              <div class="product-card__caption">
                <a class="product-card__title" href=${product.DETAIL_PAGE_URL} target="_blank">${product.NAME}</a>
              </div>
              <div class="product-card__price-wrapper">
                <div class="product-card__price"><div class="product-card__price-current">${formatNumberBySpaces(product.PRICE)} ₽</div></div>
              </div>
            </div>`
  }

  async function addToCart(id, quantity = 1, showPopup = true, loadAccessories = true) {
    try {
      const response = await fetchData(process.env.ADD_TO_CART_URL, "GET", { id, quantity })

      if (response.result === "ok") {
        items.add(id)

        if (showPopup) {
          const popupTitle = "Товар добавлен в корзину!"
          const addedProductHTML = addedProductTemplate(response.product[0])
          let accessoriesHTML = ""

          if (loadAccessories) {
            const accessories = await fetchData(process.env.GET_ACCESSORIES_URL, "GET", {
              ACCESSORIES_AJAX: "Y",
              FILTER_ACCESSORIES: "",
              ELEMENT_ID: id
            })
            accessoriesHTML = typeof accessories === "string" ? accessories : ""
          }

          showAddToCartPopup(popupTitle, addedProductHTML, accessoriesHTML)
        }

        await refreshDropdown()
        setButtons()
        userList.setButtons()

        return { result: "ok" }
      } else {
        if (showPopup) {
          const popupTitle = "Произошла ошибка"
          const addedProductHTML = `<p class="h2 my-4 text-center">${response.error}<p>`
          showAddToCartPopup(popupTitle, addedProductHTML, "")
        }
        return { result: "error" }
      }
    } catch (error) {
      console.error("Ошибка добавления товара:", error)
      return { result: "error" }
    }
  }

  async function refreshDropdown() {
    const dropdown = document.querySelector(ui.dropdown)
    if (!dropdown) return

    try {
      const response = await fetchData(process.env.CART_REFRESH_URL, "POST", { action: "refresh" })
      if (response.length > 0) {
        dropdown.outerHTML = response
        dropdown.classList.toggle("active", dropdown.classList.contains("active"))
      }
    } catch (error) {
      console.error("Ошибка обновления корзины:", error)
    }
  }

  async function getMoreAccessories(id, page) {
    const addedAccessories = document.querySelector("#added-product-accessories")
    if (!addedAccessories) return

    try {
      const data = await fetchData(process.env.GET_ACCESSORIES_URL, "GET", {
        ACCESSORIES_AJAX: "Y",
        FILTER_ACCESSORIES: "",
        ELEMENT_ID: id,
        PAGEN_1: page
      })

      if (typeof data === "string") {
        addedAccessories.innerHTML = data
      } else if (typeof data === "object" && data.result === "error") {
        console.error("Ошибка загрузки аксессуаров:", data.error || "Неизвестная ошибка")
      } else {
        console.error("Неожиданный формат данных:", data)
      }
    } catch (error) {
      console.error("Ошибка загрузки аксессуаров:", error)
    }
  }

  function showAddToCartPopup(popupTitle, productHTML, accessoriesHTML) {
    if (popup.exist("popup-add-to-cart")) {
      populateAddToCartPopup(popupTitle, productHTML, accessoriesHTML)
      if (!popup.visible()) {
        popup.show("popup-add-to-cart")
      }
    } else {
      popup.create("popup-add-to-cart", popupTitle, null, "popup--lg")
      populateAddToCartPopup(popupTitle, productHTML, accessoriesHTML)
      popup.show("popup-add-to-cart")
    }
  }

  function populateAddToCartPopup(popupTitle, productHTML, accessoriesHTML) {
    const popupEl = document.getElementById("popup-add-to-cart")
    if (!popupEl) return

    let content = popupEl.querySelector(".popup-content")
    let title = popupEl.querySelector(".popup-title")
    let buttons = popupEl.querySelector(".popup-buttons")

    let buttonsHTML = `<div class="popup-buttons d-flex justify-content-center align-items-center mb-4">
                        <button class="btn btn-secondary me-3" type="button" data-fancybox-close>Продолжить покупки</button>
                        <a class="btn btn-primary" href="/cart">Перейти в корзину</a>
                      </div>`

    title.classList.add("text-center")
    title.innerText = popupTitle

    if (!buttons) {
      content.insertAdjacentHTML("afterbegin", buttonsHTML)
    }

    let addedProduct = content.querySelector("#added-product") || (() => {
      const el = document.createElement("div")
      el.id = "added-product"
      el.classList.add("mb-4")
      content.prepend(el)
      return el
    })()

    let addedAccessories = content.querySelector("#added-product-accessories") || (() => {
      const el = document.createElement("div")
      el.id = "added-product-accessories"
      content.append(el)
      return el
    })()

    addedProduct.innerHTML = productHTML
    if (typeof accessoriesHTML === "string") {
      addedAccessories.innerHTML = accessoriesHTML
    }
  }

  function setButtons() {
    const addButtons = document.querySelectorAll(ui.addToCart)

    if (addButtons.length > 0) {
      addButtons.forEach((el) => {
        let id = el.dataset.id
        if (id in items) {
          setButton(el)
        } else {
          unsetButton(el)
        }
      })
    }
  }

  function setButton(el) {
    if (!el) return

    if (!el.dataset.originalClasses) {
      el.dataset.originalClasses = el.className
      el.dataset.originalText = el.innerText
    }
    el.classList.remove("disabled", "btn-primary", "btn-secondary", "btn-tertiary", "btn-info", "btn-warning", "btn-danger", "btn-purple", "btn-light", "btn-dark")
    el.classList.add("btn-success", "is-active")
    el.innerText = "В корзине"

    setIcon(el, "ui--check-sm")
  }

  function unsetButton(el) {
    if (!el) return

    if (el.dataset.originalClasses) {
      el.className = el.dataset.originalClasses
      el.innerText = el.dataset.originalText
      delete el.dataset.originalClasses
      delete el.dataset.originalText
    } else {
      el.innerText = "Купить"
    }

    el.classList.remove("is-active", "disabled")
    setIcon(el, "ui--shopping-cart-sm")
  }

  const addToCartHandler = (e) => {
    const clickedEl = e.target.closest(ui.addToCart)
    if (!clickedEl) return

    e.preventDefault()

    if (clickedEl.classList.contains("is-active")) {
      const cartUrl = process.env.NODE_ENV === "production" ? "/cart" : "/cart.html"
      window.location.href = cartUrl
    } else {
      clickedEl.disabled = true
      clickedEl.classList.add("disabled")
      setIcon(clickedEl, "ui--spinner", "spin")

      const id = clickedEl.dataset.id
      const quantity = clickedEl.dataset.quantity ?? 1
      const loadAccessories = clickedEl.dataset.accessories !== "false";

      (async () => {
        try {
          const addResponse = await addToCart(id, quantity, true, loadAccessories)
          if (addResponse.result === "error") {
            resetIcon(clickedEl)
          }
        } finally {
          clickedEl.disabled = false
          clickedEl.classList.remove("disabled")
        }
      })()
    }
  }

  const moreAccessoriesHandler = (e) => {
    const clickedEl = e.target.closest(ui.accessories)
    if (!clickedEl) return

    e.preventDefault()

    clickedEl.disabled = true
    clickedEl.classList.add("disabled")
    setIcon(clickedEl, "ui--spinner", "spin")

    const id = clickedEl.dataset.id
    const page = clickedEl.dataset.page

    getMoreAccessories(id, page)
      .then(() => {
        setButtons()
        userList.setButtons()
      })
      .finally(() => {
        clickedEl.disabled = false
        clickedEl.classList.remove("disabled")
        resetIcon(clickedEl)
      })
  }

  function bindHandlers() {
    document.addEventListener("click", addToCartHandler)
    document.addEventListener("click", moreAccessoriesHandler)
  }

  function unbindAddToCartHandler() {
    document.removeEventListener("click", addToCartHandler)
  }

  function rebindAddToCartHandler() {
    document.addEventListener("click", addToCartHandler)
  }

  function init() {
    bindHandlers()
    setButtons()
  }

  return {
    init,
    add: addToCart,
    remove: items.remove,
    clear: items.clear,
    items,
    setButtons,
    refreshDropdown,
    unbindAddToCartHandler,
    rebindAddToCartHandler
  }
})()

export default cart