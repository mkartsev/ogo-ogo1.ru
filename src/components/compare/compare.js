import Toastify from "toastify-js"
import SyncScroll from "@scripts/plugins/sync-scroll.js"
import { fetchData } from "@scripts/utils/fetch.js"
import cart from "@components/cart/cart.js"
import preloader from "@components/preloader/preloader.js"
import userList from "@components/user-list/user-list.js"

const compare = (() => {
  const ui = {
    container: ".compare-data",
    category: ".js-compare-category-select",
    clear: ".js-compare-clear-category",
    filter: ".js-compare-filter-props",
    delete: ".js-compare-delete-item"
  }

  const compareContainer = document.querySelector(ui.container)
  const syncScroll = new SyncScroll()

  // Функция для отображения уведомлений
  const showToast = (text, type = "info") => {
    Toastify({
      text,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      className: `fs-4 bg-${type} bg-gradient`,
    }).showToast()
  }

  // Общая функция для обработки ответа
  const handleResponse = (response, successCallback) => {
    if (typeof response === "object") {
      if (response.result === "ok") {
        showToast(response.message, "info")
      } else if (response.result === "error") {
        showToast(response.error, "danger")
      }
    } else if (typeof response === "string") {
      successCallback(response)
    }
  }

  const sendRequest = async (url, method, data, successCallback) => {
    preloader.show()
    try {
      const response = await fetchData(url, method, data)
      handleResponse(response, successCallback)
    } catch (error) {
      showToast(error.message, "danger")
    } finally {
      preloader.hide()
    }
  }

  async function getCompareData(data, callback) {
    await sendRequest(process.env.COMPARE_URL, "GET", data, callback)
  }

  async function refreshCategory(el) {
    if (!el) return
    const data = { sec: el.getAttribute("data-category") }

    await getCompareData(data, (response) => {
      compareContainer.innerHTML = response
      cart.setButtons()
      userList.setButtons()
    })
  }

  async function clearCategory(el) {
    if (!el) return

    const data = {
      action: el.getAttribute("data-action"),
      id: el.getAttribute("data-id")
    }

    await sendRequest(process.env.COMPARE_URL, "POST", data, (response) => {
      // Разбиваем строку id на массив строк
      const idsToRemove = new Set(data.id.split(","))

      // Удаляем элементы из прокси-массива
      for (let i = userList.comparison.length - 1; i >= 0; i--) {
        if (idsToRemove.has(userList.comparison[i])) {
          userList.comparison.splice(i, 1)
        }
      }

      if (typeof response === "string") {
        compareContainer.innerHTML = response
        cart.setButtons()
        userList.setButtons()
      }
    })
  }

  async function deleteItem(el) {
    if (!el) return

    const data = {
      action: el.getAttribute("data-action"),
      id: el.getAttribute("data-id")
    }

    await sendRequest(process.env.COMPARE_URL, "POST", data, (response) => {
      const index = userList.comparison.indexOf(data.id)
      if (index > -1) userList.comparison.splice(index, 1)

      compareContainer.innerHTML = response
      cart.setButtons()
      userList.setButtons()
    })
  }

  function filterProps(el) {
    let group = document.getElementsByName(el.name)
    let filterBy = el.dataset.filterby
    let propsRows = document.querySelectorAll(".compare-props__group, .compare-props__prop-title, .compare-props__prop-row")

    if (propsRows != undefined && propsRows.length != 0) {
      group.forEach(input => {
        if (input.checked) {
          propsRows.forEach((row) => row.classList.contains(filterBy) ? row.classList.add("hidden") : "")
        } else {
          propsRows.forEach((row) => row.classList.contains(filterBy) ? row.classList.remove("hidden") : "")
        }
      })
    }
  }

  function bindHandlers() {
    document.addEventListener("click", (e) => {
      const categoryEl = e.target.closest(ui.category)
      const filterEl = e.target.closest(ui.filter)
      const clearEl = e.target.closest(ui.clear)
      const deleteEl = e.target.closest(ui.delete)

      if (filterEl) {
        filterProps(filterEl)
      }
      if (categoryEl && !categoryEl.classList.contains("is-active")) {
        e.preventDefault()
        refreshCategory(categoryEl)
      }
      if (clearEl) {
        e.preventDefault()
        clearCategory(clearEl)
      }
      if (deleteEl) {
        e.preventDefault()
        deleteItem(deleteEl)
      }
    })
  }

  function init() {
    if (compareContainer) {
      syncScroll.init()
      bindHandlers()
    }
  }

  return { init }
})()

export default compare