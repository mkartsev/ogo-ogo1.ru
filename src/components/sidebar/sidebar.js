import "@grubersjoe/slide-menu/dist/slide-menu.js"
import { listenKeys } from "nanostores"
import footer from "@components/footer/footer.js"
import { $store, addBodyOverflow, removeBodyOverflow, setHeaderSticky, unsetHeaderSticky } from "@components/store/store.js"

const sidebar = (() => {
  const ui = {
    sidebar: ".sidebar",
    trigger: ".js-button-sidebar",
    close: ".sidebar-menu__close"
  }

  const sidebarElement = document.querySelector(ui.sidebar)
  const triggers = document.querySelectorAll(ui.trigger)

  // Если сайдбара нет, возвращаем заглушку с пустыми методами, чтобы вызов не ломался
  if (!sidebarElement) {
    console.warn("Элемент .sidebar не найден")
    return {
      init() { },
      open() { },
      close() { },
      toggle() { },
      destroy() { }
    }
  }

  // Переменная для хранения экземпляра SlideMenu
  let slideMenu = null

  const instance = {
    sidebar: sidebarElement,
    triggers: triggers,

    init() {
      slideMenu = new SlideMenu(sidebarElement, {
        position: "left",
        showBackLink: false
      })

      listenKeys($store, ["isMobile", "catalogIsOpen"], (value) => {
        if (value.catalogIsOpen) instance.close()
        if (!value.isMobile) instance.close()
      })

      window.addEventListener("click", (e) => {
        const clickedTrigger = e.target.closest(ui.trigger)
        const clickedClose = e.target.closest(ui.close)
        const clickedOutside =
          !e.target.closest(ui.sidebar) &&
          !e.target.closest(ui.trigger) &&
          !e.target.closest(".form-searchbox") &&
          !e.target.closest(".header-logo") &&
          !e.target.closest(".header-toolbar__item") &&
          $store.get().sidebarIsOpen

        if (clickedTrigger) {
          instance.toggle()
        }

        if (clickedClose) {
          e.preventDefault()
          instance.close()
        }

        if (clickedOutside) {
          instance.close()
        }
      })
    },

    open() {
      if ($store.get().isMobile) {
        addBodyOverflow()
      }

      slideMenu?.open()
      sidebarElement?.classList.add("is-active")
      triggers?.forEach((el) => {
        el.classList.add("is-active")
        footer.removeToolbarActiveItems(el)
      })

      $store.setKey("sidebarIsOpen", true)
    },

    close() {
      if ($store.get().isMobile) {
        removeBodyOverflow()
      }

      slideMenu?.close()
      sidebarElement?.classList.remove("is-active")
      triggers?.forEach((el) => {
        el.classList.remove("is-active")
      })

      $store.setKey("sidebarIsOpen", false)
    },

    toggle() {
      $store.get().sidebarIsOpen ? instance.close() : instance.open()
    },

    destroy() {
      instance.close()

      if (slideMenu) {
        slideMenu.destroy?.()
        slideMenu = null
      }

      $store.setKey("sidebarIsOpen", false)
    }
  }

  return instance
})()

export default sidebar
