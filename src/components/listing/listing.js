import { Offcanvas } from "bootstrap"
import { fetchData } from "@scripts/utils/fetch.js"
import { stringToHTML } from "@scripts/utils/string-to-html.js"
import { scrollto } from "@scripts/utils/scrollto.js"
import cart from "@components/cart/cart.js"
import filters from "@components/filters/filters.js"
import preloader from "@components/preloader/preloader.js"
import userList from "@components/user-list/user-list.js"

const listing = (() => {
  const ui = {
    listingGrid: "#listing-grid",
    viewControl: ".js-listing-view-control",
    sortControl: ".listing-controls__sort-select",
    showMore: ".js-show-more"
  }

  /**
   * Чтобы страница восстанавливалась при нажатии "назад" после первого
   * применения, состояние страницы сохраняется сразу после загрузки, до того,
   * как пользователь получит возможность менять фильтры.
   */
  function saveState() {
    if (!document.querySelector(ui.listingGrid)) return

    let state = {}
    state.brands_block = document.querySelector(".js-brands-block")?.outerHTML.trim()
    state.breadcrumbs = document.querySelector(".breadcrumbs")?.outerHTML.trim()
    state.controls = document.querySelector(".listing-controls")?.outerHTML.trim()
    state.count_btn = document.querySelector(".js-count-btn")?.innerText.trim()
    state.count_items = document.querySelector(".js-count-items")?.outerHTML.trim()
    state.filter = document.querySelector(".js-filters")?.outerHTML.trim()
    state.items = document.querySelector(".listing-grid")?.outerHTML.trim()
    state.pagination = document.querySelector(".pagination")?.outerHTML.trim()
    state.show_more = document.querySelector(".js-show-more")?.outerHTML.trim()
    state.tags = document.querySelector(".js-tags")?.outerHTML.trim()
    state.title = document.querySelector(".page-title")?.innerText.trim()

    window.history.replaceState(state, "")
  }

  function update(data, append) {
    if (data.filter) {
      filters.update(data.filter)
    }

    if (data.breadcrumbs) {
      const breadcrumbs = document.querySelector(".breadcrumbs")
      if (breadcrumbs) {
        breadcrumbs.outerHTML = data.breadcrumbs
      }
    }

    if (data.title) {
      const title = document.querySelector(".page-title")
      if (title) {
        title.innerText = data.title
      }
      document.title = data.title
    }

    if (data.show_more) {
      const showMore = document.querySelector(ui.showMore)
      if (showMore) {
        showMore.outerHTML = data.show_more
      }
    } else {
      const showMore = document.querySelector(ui.showMore)
      if (showMore) {
        showMore.outerHTML = ""
      }
    }

    if (data.brands_block) {
      document.querySelector(".js-brands-block")
      const brandsBlock = document.querySelector(".js-brands-block")
      if (brandsBlock) {
        brandsBlock.outerHTML = data.brands_block
      }
    } else {
      const brandsBlock = document.querySelector(".js-brands-block")
      if (brandsBlock) {
        brandsBlock.outerHTML = ""
      }
    }

    if (data.pagination) {
      const pagination = document.querySelector(".pagination")
      if (pagination) {
        pagination.outerHTML = data.pagination
      }
    }

    if (data.count_items) {
      const countItems = document.querySelectorAll(".js-count-items")
      if (countItems.length > 0) {
        countItems.forEach(el => el.outerHTML = data.count_items)
      }
    }

    if (data.count_btn) {
      const countBtns = document.querySelectorAll(".js-count-btn")
      if (countBtns.length > 0) {
        countBtns.forEach(el => el.outerHTML = data.count_btn)
      }
    }

    if (data.controls) {
      const controls = document.querySelector(".listing-controls")

      if (controls) {
        controls.outerHTML = data.controls
      }
    }

    if (data.items) {
      const itemsBlock = stringToHTML(data.items)
      const grid = document.querySelector(".listing-grid")

      // в data.items ожидаем блок <div class="listing-grid listing-grid--view-grid js-listing-items" style="--columns: 3" id="listing-grid">карточки товаров</div>
      if (append) {
        const items = itemsBlock.querySelectorAll(".product-card")
        items.forEach(item => grid.appendChild(item))
      } else {
        grid.outerHTML = itemsBlock.outerHTML
      }
    }

    if (data.tags) {
      const tags = document.querySelector(".js-tags")
      if (tags) {
        tags.outerHTML = data.tags
      }
    }

    if (data.filter_info) {
      const filterInfo = document.querySelector(".js-filter-info")
      if (filterInfo) {
        filterInfo.outerHTML = data.filter_info
      }
    }

    if (data.gtm_data) {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push(JSON.parse(data.gtm_data))
    }

    if (data.tmr_data) {
      window._tmr = window._tmr || []
      let tmr_local_data = JSON.parse(data.tmr_data)
      window._tmr.push(tmr_local_data)
      window.dataLayer.push({
        "event": window.location.href.indexOf("/search/") > 0 ? "view_search_results" : "view_item_list",
        "items": tmr_local_data.productid.map((el) => {
          return {
            "id": el,
            "google_business_vertical": "retail"
          }
        }
        )
      })
    }

    // Устанавливаем зеленые кнопки "В корзине"
    cart.setButtons()

    // Устанавливаем кнопки избранного и сравнения
    userList.setButtons()

    return false
  }

  async function getListingData(element, e) {
    e.preventDefault()

    // Скрываем тултип "смартфильтров"
    let filterSummary = document.querySelector(".filter_summary")
    if (filterSummary) {
      filterSummary.style.display = "none"
    }

    // У элемента вызывающего обновление списка товаров может не быть ссылки
    // Например у селекта сортировки будем брать value
    let url = element.getAttribute("href") || element.value
    let append = element.dataset.append

    // Не нужно получать данные, если жмем на уже активные элементы вида, сортировки, тэгов
    if (element.classList.contains("listing-controls__qty-link") && element.classList.contains("is-active") ||
      element.classList.contains("tags-link") && element.classList.contains("is-active") ||
      element.classList.contains("listing-controls__sort-select") && element.options[element.selectedIndex]) {
      return false
    }

    if (url && url.length > 0) {
      try {
        let response = await fetchData(url, "GET")

        // Чтобы проще было искать элементы в строке, сделаем из неё html
        // И будем выбирать через querySelector
        let result = stringToHTML(response)
        let data = {}

        data.brands_block = result.querySelector(".js-brands-block")?.outerHTML.trim()
        data.breadcrumbs = result.querySelector(".breadcrumbs")?.outerHTML.trim()
        data.controls = result.querySelector(".listing-controls")?.outerHTML.trim()
        data.count_btn = result.querySelector(".js-count-btn")?.innerText.trim()
        data.count_items = result.querySelector(".js-count-items")?.outerHTML.trim()
        data.filter = result.querySelector(".js-filters")?.outerHTML.trim()
        data.gtm_data = result.querySelector("#gtm_data")?.getAttribute("data-gtm")
        data.items = result.querySelector(".listing-grid")?.outerHTML.trim()
        data.pagination = result.querySelector(".pagination")?.outerHTML.trim()
        data.show_more = result.querySelector(".js-show-more")?.outerHTML.trim()
        data.tags = result.querySelector(".js-tags")?.outerHTML.trim()
        data.title = result.querySelector(".page-title")?.innerText.trim()
        data.tmr_data = result.querySelector("#tmr_data")?.getAttribute("data-tmr")

        update(data, append)

        if (!append) {
          document.querySelector(".listing-grid")?.dispatchEvent(new Event("pagination.scroll"))
        }

        window.history.pushState(data, "", url)
      } catch (error) {
        console.log(error)
      }
    }

    return false
  }

  // TODO: Сделать обсервер на 769px чтобы класс у listingGrid переключался сам, когда
  // ширина экрана меньше, не забыть сохранять начальный вид, чтобы
  // вернуть его, если ширина будет больше - [кейс = айпад вертикально, а потом горизонтально]
  function viewHandler(element) {
    if (!element) return

    const viewType = element.dataset.view
    const listingGrid = document.querySelector(ui.listingGrid)

    // Убираем класс `is-active` со всех кнопок
    const viewControls = document.querySelectorAll(ui.viewControl)
    viewControls.forEach(control => control.classList.remove("is-active"))

    // Добавляем класс `is-active` к текущей кнопке
    element.classList.add("is-active")

    // Убираем класс listing-grid--view-* с блока listing-grid
    listingGrid.classList.remove([...listingGrid.classList].filter(cls => cls.startsWith("listing-grid--view-")))

    // Добавляем класс listing-grid--view-[viewType] к блоку listing-grid
    listingGrid.classList.add(`listing-grid--view-${viewType}`)
  }

  function bindHandlers() {
    /**
     * Событие popstate вызывается, когда изменяется активная запись истории.
     * Если изменение записи истории было вызвано методом history.pushState() или history.replaceState(), то
     * состояние события popstate будет содержать state копии входящего в историю объекта
     * Обратите внимание, history.pushState() или history.replaceState() не вызывают событие popstate.
     * Событие popstate будет вызвано при совершении действий в браузере, таких
     * как нажатие кнопок "Вперёд" или "Назад" (или при вызове history.back() или history.forward() из JavaScript)
     *
     * history.pushState() вызывается в компоненте filters при отправке формы(фильтры листинга)
    */
    window.onpopstate = (e) => {
      let state
      if (e.state) {
        state = e.state
      }
      if (state) {
        return update(state)
      }
    }

    document.addEventListener("change", async (e) => {
      const sortSelect = e.target.closest(ui.sortControl)

      if (sortSelect) {
        preloader.show()

        let selected = sortSelect.options[sortSelect.selectedIndex]

        await getListingData(selected, e)
          .finally(() => {
            scrollto(ui.listingGrid, { offset: 16 })
            preloader.hide()
          })
      }
    })

    document.addEventListener("click", async (e) => {
      if (e.target.closest(ui.viewControl)) {
        e.preventDefault()
        viewHandler(e.target)
      }

      if (e.target.closest(ui.showMore)) {
        e.preventDefault()
        preloader.show()

        await getListingData(e.target, e)
          .finally(() => {
            preloader.hide()
          })
      }

      if (e.target.closest(".js-clear-filter")) {
        e.preventDefault()
        preloader.show()

        await getListingData(e.target, e)
          .finally(() => {
            // Если мы на мобилке, то после отправки формы, надо закрыть фильтры
            if (window.matchMedia("(max-width: 1023px)")) {
              const offCanvasEl = document.querySelector(".offcanvas-lg")
              const offCanvas = Offcanvas.getInstance(offCanvasEl)
              offCanvas?.hide()
            }
            preloader.hide()
            scrollto(ui.listingGrid, { offset: 16 })
          })
      }

      if (e.target.closest(".listing-controls__pagination-item, .listing-controls__qty-link, .page-link, .js-brands-block .tags-link")) {
        e.preventDefault()
        preloader.show()

        await getListingData(e.target, e)
          .finally(() => {
            preloader.hide()
            scrollto(ui.listingGrid, { offset: 16 })
          })
      }
    })
  }

  function init() {
    saveState()
    bindHandlers()
  }

  return {
    init, update
  }
})()


export default listing