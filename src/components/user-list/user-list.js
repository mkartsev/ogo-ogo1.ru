import Toastify from "toastify-js"
import { setIcon } from "@scripts/shared/set-icon.js"
import { fetchData } from "@scripts/utils/fetch.js"
import { debounce } from "@scripts/utils/debounce.js"
import { compareCounter, favoritesCounter } from "@components/counters/counters.js"
import tooltip from "@components/tooltip/tooltip.js"

const userList = (() => {
  const ui = {
    addToList: ".js-add-to-list",
  }

  async function sendRequest(data) {
    try {
      const response = await fetchData(process.env.ADD_TO_LIST_URL, "POST", data)
      return await response
    } catch (error) {
      Toastify({
        text: error.message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        className: "fs-4 bg-danger bg-gradient",
      }).showToast()
    }
  }

  // comparison add: ADD_TO_COMPARE_LIST
  // comparison del: DELETE_FROM_COMPARE_LIST
  // favorites add: add
  // comparison del: del

  function userListProxy(target, list, callback) {
    return new Proxy(target, {
      set(target, property, value, receiver) {
        const result = Reflect.set(target, property, value, receiver)
        callback(receiver)
        return result
      },
      get(target, property, receiver) {
        switch (property) {
          case "push":
          case "add":
            return async (id) => {
              let action = list === "comparison" ? "ADD_TO_COMPARE_LIST" : "add"
              const response = await sendRequest({ id, list, action })
              if (response.result === "ok") {
                target.push(id)
                callback(receiver)
              }
              if (response.result == "error") {
                Toastify({
                  text: response.error,
                  duration: 3000,
                  close: true,
                  gravity: "top",
                  position: "right",
                  stopOnFocus: true,
                  className: "fs-4 text-body bg-warning bg-gradient",
                }).showToast()
              }
            }
          case "delete":
          case "remove":
            return async (id) => {
              let action = list === "comparison" ? "DELETE_FROM_COMPARE_LIST" : "del"
              const response = await sendRequest({ id, list, action })
              if (response.result === "ok") {
                const index = target.indexOf(id)
                if (index > -1) {
                  target.splice(index, 1)
                  callback(receiver)
                }
              }
              if (response.result == "error") {
                Toastify({
                  text: response.error,
                  duration: 3000,
                  close: true,
                  gravity: "top",
                  position: "right",
                  stopOnFocus: true,
                  className: "fs-4 text-body bg-warning bg-gradient",
                }).showToast()
              }
            }
          case "length":
            return Array.isArray(target) ? target.length : Object.keys(target).length
          case "unique":
            return Array.isArray(target) ? [...new Set(target)] : [...new Set(Object.values(target))]
          case "uniqueCount":
            return Array.isArray(target) ? new Set(target).size : new Set(Object.values(target)).size
          default:
            return Reflect.get(target, property, receiver)
        }
      }
    })
  }

  // Создаем прокси к массивам со списками айди и при изменении массива обновляем счетчики и кнопки
  const comparison = userListProxy(window.CompareIDList, "comparison", (proxy) => {
    compareCounter.set(proxy.uniqueCount)
    setCompareButtons()
  })

  const favorites = userListProxy(window.FavoriteIDList, "favorites", (proxy) => {
    favoritesCounter.set(proxy.uniqueCount)
    setFavoritesButtons()
  })

  function clickHandler(el) {
    if (!el) return
    const id = el.getAttribute("data-id")
    const list = el.getAttribute("data-list")
    const action = el.getAttribute("data-action")

    let showTooltip = true

    switch (list) {
      case "comparison":
        action === "ADD_TO_COMPARE_LIST" ? comparison.add(id) : comparison.remove(id)
        tooltip.handleCompare(el, showTooltip)
        break

      case "favorites":
        action === "add" ? favorites.add(id) : favorites.remove(id)

        if (window.location.pathname === "/user/wishlist/") {
          const itemToRemove = el.closest(".product-card")
          if (itemToRemove) itemToRemove.remove()
          showTooltip = false
        }

        tooltip.handleFavorite(el, showTooltip)
        break
    }
  }

  const debounceСlickHandler = debounce(clickHandler, 100)
  // const debounceRemoveClickHandler = debounce(removeClickHandler, 100)

  function setCompareButtons() {
    const addButtons = document.querySelectorAll(ui.addToList)

    if (addButtons.length > 0) {
      // Фильтруем кнопки по спискам, потом для каждой проверяем,
      // есть ли её data-id в прокси к списку сравнения
      // меняем атрибуты и устанавливаем тултип
      Array.from(addButtons)
        .filter((el) => el.getAttribute("data-list") === "comparison")
        .forEach((el) => {
          if (comparison.includes(el.getAttribute("data-id"))) {
            el.setAttribute("data-action", "DELETE_FROM_COMPARE_LIST")
            // Если у элемента есть атрибут data-text, то он будет выведен после иконки
            if (el.dataset.text) {
              el.dataset.text = "В сравнении"
            }
            // Если на элементе нет атрибута data-static-icon, то меняем иконку
            if (!el.hasAttribute("data-static-icon")) {
              setIcon(el, "ui--comparison-fill")
            }
          } else {
            el.setAttribute("data-action", "ADD_TO_COMPARE_LIST")
            // Если у элемента есть атрибут data-text, то он будет выведен после иконки
            if (el.dataset.text) {
              el.dataset.text = "Сравнить"
            }
            // Если на элементе нет атрибута data-static-icon, то меняем иконку
            if (!el.hasAttribute("data-static-icon")) {
              setIcon(el, "ui--comparison")
            }
          }
          tooltip.setCompare(el)
        })
    }
  }

  function setFavoritesButtons() {
    const addButtons = document.querySelectorAll(ui.addToList)

    if (addButtons.length > 0) {
      // Фильтруем кнопки по спискам, потом для каждой проверяем,
      // есть ли её data-id в прокси к списку избранного
      // меняем атрибуты и устанавливаем тултип
      Array.from(addButtons)
        .filter((el) => el.getAttribute("data-list") === "favorites")
        .forEach((el) => {
          if (favorites.includes(el.getAttribute("data-id"))) {
            el.setAttribute("data-action", "del")
            // Если у элемента есть атрибут data-text, то он будет выведен после иконки
            if (el.dataset.text) {
              el.dataset.text = "В избранном"
            }
            // Если на элементе нет атрибута data-static-icon, то меняем иконку
            if (!el.hasAttribute("data-static-icon")) {
              setIcon(el, "ui--heart-fill")
            }
          } else {
            el.setAttribute("data-action", "add")
            // Если у элемента есть атрибут data-text, то он будет выведен после иконки
            if (el.dataset.text) {
              el.dataset.text = "В избранное"
            }
            // Если на элементе нет атрибута data-static-icon, то меняем иконку
            if (!el.hasAttribute("data-static-icon")) {
              setIcon(el, "ui--heart")
            }
          }

          tooltip.setFavorite(el)
        })
    }
  }

  function setButtons() {
    setCompareButtons()
    setFavoritesButtons()
  }

  function bindHandlers() {
    document.addEventListener("click", (e) => {
      const addElement = e.target.closest(ui.addToList)
      // const removeElement = e.target.closest(ui.removeFromList)

      if (addElement) {
        e.preventDefault()
        debounceСlickHandler(addElement)
      }

      // if(addElement) {
      //   e.preventDefault()
      //   debounceRemoveClickHandler(removeElement)
      // }
    })
  }

  function init() {
    setButtons()
    bindHandlers()
  }

  return {
    init, setButtons, comparison, favorites
  }
})()

export default userList