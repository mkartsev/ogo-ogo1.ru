import { Offcanvas }    from "bootstrap"
import { fetchData }    from "@scripts/utils/fetch.js"
import { stringToHTML } from "@scripts/utils/string-to-html.js"
import { scrollto }     from "@scripts/utils/scrollto.js"
import listing          from "@components/listing/listing.js"
import preloader        from "@components/preloader/preloader.js"

const filters = (() => {
  const ui = {
    listingGrid: "#listing-grid",
    filters:     ".js-filters",
    clearFilter: ".js-clear-filter"
  }

  // Обновление значений полей ввода
  function updateInputValues(oldInputs, newValue,) {
    oldInputs.forEach(oldInput => {
      if (oldInput.value != newValue) {
        oldInput.value = newValue
      }
    })
  }

  // Обновление текстовых и числовых полей:
  function updateTextAndNumberFields(oldInputs, newFilter) {
    oldInputs.forEach(oldInput => {
      const name = oldInput.name
      const newInput = newFilter.querySelector(`[name='${name}']`)
      let newMinValue = newInput?.getAttribute("min")
      let newMaxValue = newInput?.getAttribute("max")

      if (newMinValue && oldInput.getAttribute("min") !== newMinValue) {
        oldInput.setAttribute("min", newMinValue)
      }

      if (newMaxValue && oldInput.getAttribute("max") !== newMaxValue) {
        oldInput.setAttribute("max", newMaxValue)
      }

      if (newInput && oldInput.value !== newInput.value) {
        oldInput.value = newInput.value
        oldInput.dispatchEvent(new Event("change", { bubbles: false }))
      }
    })
  }

  // Обновление ссылок для очистки фильтров
  function updateClearFilters(oldClearFilters, newFilter) {
    oldClearFilters.forEach(oldClearFilter => {
      const newClearFilter = newFilter.querySelector(ui.clearFilter)
      if (newClearFilter && oldClearFilter.getAttribute("href") !== newClearFilter.getAttribute("href")) {
        oldClearFilter.setAttribute("href", newClearFilter.getAttribute("href"))
      }
    })
  }

  // Обновление чекбоксов и радиокнопок
  function updateCheckboxesAndRadios(oldInputs, newFilter) {
    oldInputs.forEach(oldInput => {
      const id = oldInput.id
      const newInput = newFilter.querySelector(`#${id}`)
      if (newInput && (oldInput.checked !== newInput.checked || oldInput.disabled !== newInput.disabled)) {
        oldInput.checked = newInput.checked
        oldInput.disabled = newInput.disabled
      }
    })
  }

  // Обновление всей формы фильтров
  function update(string) {
    const filters = document.querySelectorAll(ui.filters)
    const newFilter = stringToHTML(string)

    filters.forEach(form => {
      // Обновление значений для полей ввода для размера страницы, сортировки и порядка
      ["PAGESIZE", "SORT", "ORDER"].forEach(fieldName => {
        const oldInputs = form.querySelectorAll(`input[name='${fieldName}']`)
        const newValue = newFilter.querySelector(`input[name='${fieldName}']`)?.value
        updateInputValues(oldInputs, newValue)
      })

      // Обновление чекбоксов и радиокнопок
      const oldCheckboxesAndRadios = form.querySelectorAll("input[type='checkbox'], input[type='radio']")
      updateCheckboxesAndRadios(oldCheckboxesAndRadios, newFilter)

      // Обновление текстовых и числовых полей
      const oldTextAndNumberFields = form.querySelectorAll("input[type='text'], input[type='number']")
      updateTextAndNumberFields(oldTextAndNumberFields, newFilter)

      // Обновление ссылок для очистки фильтров
      const oldClearFilters = form.querySelectorAll(ui.clearFilter)
      updateClearFilters(oldClearFilters, newFilter)

    })
  }

  async function submitHandler(form) {
    // Скрываем тултип "смартфильтров"
    let filterSummary = document.querySelector(".filter_summary")
    if (filterSummary) {
      filterSummary.style.display = "none"
    }

    // Убираем имя из полей рейнджслайдеров, если их значения равны минимально и максимально возможным, чтобы они не попали в запрос
    document.querySelectorAll(".js-min").forEach((el) => {
      let min = el.getAttribute("min")
      if (el.value == min) {
        el.removeAttribute("name")
      }
    })

    document.querySelectorAll(".js-max").forEach((el) => {
      let max = el.getAttribute("max")
      if (el.value == max) {
        el.removeAttribute("name")
      }
    })

    let dataUrl = new URLSearchParams(new FormData(form))
    // Нам нужен window.location.pathname, для разработки путь будет замокан на /listing.html
    let url = process.env.NODE_ENV === "production" ? window.location.pathname : process.env.LISTING_URL

    /**
     * Анализируем URL-адрес, чтобы определить, является ли он "предустановленным" фильтром (например, "/market/bloki_pitaniya--moshnost--1000/")
     * Если да, то извлекаем первую часть URL-адреса из регулярного выражения.
     * Если URL-адрес не является предустановленным фильтром, то
     * Удаляем из URL-адреса все части после третьей или четвертой части, в зависимости от того, является ли третья часть словом "action"
     *
     * Как вы назовете человека, который такое сделал на старом проде?
     */
    let urlRes = url.match(/\/(.+?)--(.+?)--(.+?)\/$/)

    if (urlRes) {
      url = "/" + urlRes[1] + "/"
    } else {
      let urlParts = url.split("/")
      let limit = (urlParts.length > 2 && urlParts[2] === "action") ? 5 : 4
      while (urlParts.length > limit) {
        urlParts.splice(-2, 1)
        url = urlParts.join("/")
        urlParts = url.split("/")
      }
    }

    await fetchData(url, "GET", dataUrl)
      .then((response) => {
        // Если в ответ придет объект, то ожидаем редирект куда-то и ничего не делаем
        if (typeof response == "object") {
          if (response.redirect) {
            window.location.href = response.redirect
          }
          return
        }

        // Чтобы проще было искать элементы в строке, сделаем из неё html
        // И будем выбирать через querySelector
        let result = stringToHTML(response)
        let data = {}

        data.brands_block = result.querySelector(".js-brands-block")?.outerHTML.trim()
        data.breadcrumbs  = result.querySelector(".breadcrumbs")?.outerHTML.trim()
        data.controls     = result.querySelector(".listing-controls")?.outerHTML.trim()
        data.count_btn    = result.querySelector(".js-count-btn")?.innerText.trim()
        data.count_items  = result.querySelector(".js-count-items")?.outerHTML.trim()
        data.filter       = result.querySelector(".js-filters")?.outerHTML.trim()
        data.gtm_data     = result.querySelector("#gtm_data")?.getAttribute("data-gtm")
        data.items        = result.querySelector(".listing-grid")?.outerHTML.trim()
        data.pagination   = result.querySelector(".pagination")?.outerHTML.trim()
        data.show_more    = result.querySelector(".js-show-more")?.outerHTML.trim()
        data.tags         = result.querySelector(".js-tags")?.outerHTML.trim()
        data.title        = result.querySelector(".page-title")?.innerText.trim()
        data.tmr_data     = result.querySelector("#tmr_data")?.getAttribute("data-tmr")

        // Надо понять почему так
        if (!data.count_items && (document.querySelectorAll(".js-configurator-section").length > 0)) {
          data.count_items = result.find(".js-count-items").html()
        }

        // Обновляем свои поля
        update(data.filter)

        // Потом отправляем данные в листинг, где он обновит нужные блоки на странице,
        // false - это параметр append, значит вывод листинга будет заменён, а не добавлен к текущему
        listing.update(data, false)

        // Записывем url в историю
        let pushUrl = url + "?" + dataUrl.toString()
        window.history.pushState(data, "", pushUrl)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        document.querySelectorAll(".js-min, .js-max").forEach(function(el) {
          el.setAttribute("name", el.dataset.name)
        })
      })
  }

  function bindHandlers() {
    const filters = document.querySelectorAll(ui.filters)

    filters?.forEach(form => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault()
        const formBtns = form.querySelectorAll("[type=submit], [type=button], [type=reset], .js-clear-filter")
        formBtns?.forEach(el => {
          el.disabled = true
          el.classList.add("disabled")
        })

        preloader.show()
        await submitHandler(form)
          .finally(() => {
            preloader.hide()
            scrollto(ui.listingGrid, {offset: 16})

            formBtns?.forEach(el => {
              el.disabled = false
              el.classList.remove("disabled")
            })

            // Если мы на мобилке, то после отправки формы надо закрыть фильтры
            if (window.matchMedia("(max-width: 1023px)")) {
              const offCanvasEl = document.querySelector(".offcanvas-lg")
              const offCanvas = Offcanvas.getInstance(offCanvasEl)
              offCanvas?.hide()
            }
          })

        return false
      })
    })
  }

  function init() {
    bindHandlers()
  }

  return {
    init, update
  }
})()

export default filters