import { MenuAim } from "es6-menu-aim"
import { computed, listenKeys } from "nanostores"
import Toastify from "toastify-js"
import { fetchData } from "@scripts/utils/fetch.js"
import { debounce } from "@scripts/utils/debounce.js"
import { getParents } from "@scripts/utils/element.js"
import { isEmpty } from "@scripts/utils/is.js"
import footer from "@components/footer/footer.js"
import { $store, addBodyOverflow, removeBodyOverflow } from "@components/store/store.js"

const catalog = (() => {
  const ui = {
    catalog: ".catalog",
    categories: ".catalog-categories",
    subcategories: ".catalog-subcategories",
    trigger: ".js-button-catalog"
  }

  const settings = {
    timeout: 15 * 60 * 1000, // 15 минут
    url: document.querySelector(ui.catalog)?.getAttribute("data-src")
  }

  const catalogElement = document.querySelector(ui.catalog)
  const triggers = document.querySelectorAll(ui.trigger)

  // Если каталога нет, возвращаем заглушку с пустыми методами, чтобы вызов не ломался
  if (!catalogElement) {
    console.warn("Элемент .catalog не найден")
    return {
      init() { },
      open() { },
      close() { },
      toggle() { },
      destroy() { }
    }
  }

  let catalogEmpty = computed($store, (store) => isEmpty(store.catalog))
  let catalogExpire = computed($store, (store) => store.catalogTime + settings.timeout < Date.now())

  // Приватные методы
  const setHeight = () => {
    const header = document.querySelector(".header")
    const footerToolbar = document.querySelector(".footer-toolbar")
    const headerHeight = header?.offsetHeight
    const toolbarHeight = footerToolbar?.offsetHeight

    if (header && footerToolbar) {
      document.documentElement.style.setProperty("--catalog-height", `${window.innerHeight - headerHeight - toolbarHeight}px`)
    }

    if (footerToolbar) {
      document.documentElement.style.setProperty("--catalog-top-offset", `${headerHeight}px`)
    }
  }

  const showFirstItem = () => {
    const firstCategory = document.querySelector(".catalog ul li")
    const firstSubCategory = document.querySelector(".catalog-subcategories .catalog-subcategory")

    firstCategory?.querySelector("a")?.classList.add("is-active")
    firstSubCategory?.classList.add("is-active")
  }

  const hideActiveItems = () => {
    catalogElement.querySelectorAll(".is-active").forEach((el) => el.classList.remove("is-active"))
  }

  const loadSave = () => {
    const save = localStorage.getItem("catalog")
    if (save && !catalogExpire.get()) {
      $store.setKey("catalog", JSON.parse(save).catalog)
      renderMenu($store.get().catalog)
    }
  }

  const renderList = (data, title, text) => {
    const list = document.createElement("ul")

    list.setAttribute("data-name", title || "Назад")
    list.dataset.name = title || "Назад"

    data.forEach((el) => {
      const item = document.createElement("li")
      const link = document.createElement("a")

      link.href = el.url
      if (!text) link.innerHTML = el.title

      list.append(item)

      if (el.title) {
        item.append(link)
      }

      if (el.icon) {
        const icon = document.createElement("span")
        icon.classList.add("catalog-link__icon")
        icon.innerHTML = `<svg class="svg-icon" viewbox="0 0 24 24" focusable="false"><use xlink:href="/assets/img/sprites/sprite.svg#categories--${el.icon}"></use></svg>`
        link.prepend(icon)
        link.classList.add("has-icon")
      }

      if (el.img) {
        const img = document.createElement("img")
        img.src = el.img
        img.classList.add("catalog-link__img")
        link.prepend(img)
        link.classList.add("has-img")
      }

      if (el.img_s) {
        const img = document.createElement("img")
        img.src = el.img_s
        img.classList.add("catalog-link__img-s")
        link.append(img)
        link.classList.add("has-img-s")
      }

      if (el.sub) {
        item.classList.add("has-child")
        item.append(renderList(el.sub, el.title))
      }

      if (el.brands) {
        item.classList.add("has-brands")
        item.append(renderBrands(el.brands))
      }
    })

    return list
  }

  const renderCategories = (data) => {
    const categories = document.createElement("div")
    const categoriesList = document.createElement("ul")

    categories.classList.add("catalog-categories")
    categoriesList.classList.add("catalog-categories__list")

    categories.append(categoriesList)

    data.forEach((el) => {
      const item = document.createElement("li")
      const link = document.createElement("a")

      item.classList.add("catalog-categories__item")
      item.append(link)

      link.href = "#" + el.id
      link.textContent = el.title
      link.classList.add("catalog-categories__link")

      if (el.icon) {
        const icon = document.createElement("span")
        icon.classList.add("catalog-link__icon")
        icon.innerHTML = `<svg class="svg-icon" viewbox="0 0 24 24" focusable="false"><use xlink:href="/assets/img/sprites/sprite.svg#categories--${el.icon}"></use></svg>`
        link.prepend(icon)
      }
      categoriesList.append(item)
    })

    return categories
  }

  const renderBrands = (data) => {
    const div = document.createElement("div")
    div.classList.add("catalog-brands")

    data.forEach((el) => {
      const link = document.createElement("a")
      link.href = el.url
      link.classList.add("catalog-brands__link")
      div.append(link)

      if (el.img) {
        const img = document.createElement("img")
        img.src = el.img
        link.prepend(img)
      }
    })

    return div
  }

  const renderSubCategories = (data) => {
    const subCategories = document.createElement("div")
    subCategories.classList.add("catalog-subcategories")

    data.forEach((el) => {
      const subCategory = document.createElement("div")
      subCategory.classList.add("catalog-subcategory")

      if (el.id) {
        subCategory.setAttribute("id", el.id)
      }

      subCategories.append(subCategory)

      if (el.sub) {
        subCategory.append(renderList(el.sub))
      }

      if (el.brands) {
        const brands = document.createElement("div")
        brands.classList.add("catalog-brands")
        brands.append(renderList(el.brands, null, true))
        subCategory.append(brands)
      }
    })

    return subCategories
  }

  const renderMenu = (data) => {
    if ($store.get().isMobile) {
      const nav = document.createElement("nav")
      nav.classList.add("slide-menu")
      nav.id = "slide-menu"
      nav.append(renderList(data))

      catalogElement.append(nav)

      initSlideMenu()

      const rootCatalogList = document.querySelector(".slide-menu__slider > ul")
      rootCatalogList?.setAttribute("data-name", "Каталог")
      rootCatalogList.dataset.name = "Каталог"

      const backLinks = document.querySelectorAll(
        ".slide-menu__slider .slide-menu__backlink"
      )
      backLinks.forEach((el) => {
        const realParent = getParents(el)[3]
        el.innerHTML = realParent.dataset.name
      })
    } else {
      catalogElement.append(renderCategories(data))
      catalogElement.append(renderSubCategories(data))
      initMenuAim()
    }
  }

  const initSlideMenu = () => {
    const menuElement = document.getElementById("slide-menu")
    if (!menuElement) return

    new SlideMenu(menuElement)

    function setSlideMenuHeight() {
      const activeElements = menuElement.getElementsByClassName(
        "slide-menu__submenu--active"
      )
      const currentElement = activeElements[activeElements.length - 1]

      if (currentElement instanceof HTMLElement) {
        const currentHeight = Math.round(currentElement.getBoundingClientRect().height)
        menuElement.style.height = currentHeight + "px"
        menuElement.style.overflow = "hidden"
      } else {
        menuElement.removeAttribute("style")
      }
    }

    menuElement.addEventListener("sm.forward", () => {
      menuElement.scrollTop = 0
    })

    menuElement.addEventListener("sm.forward-after", () => {
      setTimeout(() => setSlideMenuHeight(), 150)
    })

    menuElement.addEventListener("sm.back", () => {
      menuElement.scrollTop = 0
    })

    menuElement.addEventListener("sm.back-after", () => {
      setTimeout(() => setSlideMenuHeight(), 150)
    })
  }

  const initMenuAim = () => {
    const menuElement = document.querySelector(".catalog-categories__list")
    if (!menuElement) return

    const menuAim = new MenuAim(menuElement, {
      activate: (row) => {
        const link = row.querySelector("a")
        const href = link.getAttribute("href")
        const targetID = href.startsWith("#") ? href.slice(1) : href.split("#")[1]

        document.querySelectorAll(".catalog-categories__list .is-active").forEach((el) => el.classList.remove("is-active"))
        document.querySelectorAll(".catalog-subcategories .is-active").forEach((el) => el.classList.remove("is-active"))

        const targetElement = document.getElementById(targetID)
        if (targetElement) {
          targetElement.classList.add("is-active")
          targetElement.scrollTop = 0
        }
        if (link) {
          link.classList.add("is-active")
        }
      },
      deactivate: (row) => {
        const link = row.querySelector("a")
        const href = link.getAttribute("href")
        const targetID = href.startsWith("#") ? href.slice(1) : href.split("#")[1]

        const targetElement = document.getElementById(targetID)
        if (targetElement) {
          targetElement.classList.remove("is-active")
        }
        if (link) {
          link.classList.remove("is-active")
        }
      }
    })

    Array.from(menuElement.children).forEach((element) => {
      menuAim.hookUp(element)
    })
  }

  // Публичные в инстансе
  const instance = {
    catalog: catalogElement,
    triggers: triggers,

    init() {
      if (!catalogElement) return

      setHeight()
      loadSave()

      listenKeys($store, ["sidebarIsOpen"], (value) => {
        if (value.sidebarIsOpen) instance.close()
      })

      listenKeys($store, ["isMobile"], () => {
        if (!catalogEmpty.get()) {
          catalogElement.textContent = ""
          renderMenu($store.get().catalog)
          if (!$store.get().isMobile) {
            showFirstItem()
          }
        }
      })

      window.addEventListener("click", (e) => {
        const target = e.target

        if (
          !target.closest(ui.catalog) &&
          !target.closest(ui.trigger) &&
          !target.closest(".form-searchbox") &&
          !target.closest(".header-logo") &&
          !target.closest(".header-toolbar__item") &&
          $store.get().catalogIsOpen
        ) {
          instance.close()
        }
        if (target.closest(ui.trigger)) {
          instance.toggle()
        }
      })

      window.addEventListener("resize", debounce(() => setHeight(), 100))
    },

    async open() {
      if (catalogEmpty.get() || catalogExpire.get()) {
        triggers.forEach((el) =>
          el.classList.toggle("is-loading", !$store.get().catalogIsOpen)
        )

        try {
          const data = await fetchData(settings.url, "GET")
          catalogElement.textContent = ""
          renderMenu(data.catalog)

          $store.setKey("catalog", data.catalog)
          $store.setKey("catalogTime", Date.now())

          localStorage.setItem("catalog", JSON.stringify(data))
          localStorage.setItem("catalogTime", Date.now())

          instance.open()
        } catch (error) {
          Toastify({
            text: "Ошибка загрузки каталога",
            duration: 5000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            className: "fs-4 bg-danger bg-gradient"
          }).showToast()
        } finally {
          triggers.forEach((el) => el.classList.remove("is-loading"))
        }
      } else {
        catalogElement.classList.add("is-active")
        triggers.forEach((el) => {
          el.classList.add("is-active")
          footer.removeToolbarActiveItems(el)
        })

        if ($store.get().isMobile) {
          addBodyOverflow()
        } else {
          showFirstItem()
        }

        $store.setKey("catalogIsOpen", true)
      }
    },

    close() {
      if ($store.get().isMobile) {
        removeBodyOverflow()
      } else {
        hideActiveItems()
      }

      catalogElement.classList.remove("is-active")
      triggers.forEach((el) => {
        el.classList.remove("is-active")
      })

      $store.setKey("catalogIsOpen", false)
    },

    toggle() {
      $store.get().catalogIsOpen ? instance.close() : instance.open()
    },

    destroy() { }
  }

  return instance
})()

const catalogAccordion = (() => {
  const items = document.querySelectorAll(".catalog-page__nav-item.has-child .catalog-page__nav-link")

  function accordion(element) {
    const instance = {}
    function init() {
      findElements(instance, element)
      measureHeight(instance)
      subscribe(instance)
    }
    init()
  }

  function findElements(object, element) {
    const instance = object
    instance.element = element
    instance.target = element.nextElementSibling
    instance.parent = element.parentElement
    if (instance.parent.classList.contains("is-active")) {
      instance.isActive = true
    }
  }

  function measureHeight(object) {
    const instance = object
    instance.height = object.target.firstElementChild.clientHeight
  }

  function subscribe(instance) {
    instance.element.addEventListener("click", (event) => {
      event.preventDefault()
      changeElementStatus(instance)
    })
    window.addEventListener("resize", () => measureHeight(instance))
  }

  function changeElementStatus(instance) {
    if (instance.isActive) {
      hideElement(instance)
    } else {
      showElement(instance)
    }
  }

  function hideElement(object) {
    const instance = object
    const { target } = instance
    target.style.height = null
    instance.isActive = false
    instance.parent.classList.remove("is-active")
  }

  function showElement(object) {
    const instance = object
    const { target, height } = instance
    target.style.height = `${height}px`
    instance.isActive = true
    instance.parent.classList.add("is-active")
  }

  function init() {
    items.forEach(accordion)
  }

  return {
    init: init
  }
})()

export default catalog
export { catalogAccordion }
