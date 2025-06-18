import { listenKeys } from "nanostores"
import { $store } from "@components/store/store.js"

const footer = (() => {
  const ui = {
    footer: ".footer",
    toolbar: ".footer-toolbar",
    toolbarItem: ".footer-toolbar__item"
  }

  const footerElement = document.querySelector(ui.footer)
  const toolbar = document.querySelector(ui.toolbar)
  const toolbarItems = toolbar?.querySelectorAll(ui.toolbarItem)

  // Если хедера нет, возвращаем заглушку с пустыми методами, чтобы вызов не ломался
  if (!footerElement && !toolbar) {
    console.warn("Элементы .footer или .footer-toolbar не найдены")
    return {
      init() { },
      removeToolbarActiveItems() { }
    }
  }

  // Сохраняем начальное состояние кнопок
  const initialActiveStates = new Map()
  toolbarItems?.forEach((item) => {
    initialActiveStates.set(item, item.classList.contains("is-active"))
  })

  const restoreInitialStates = () => {
    toolbarItems?.forEach((item) => {
      initialActiveStates.get(item) ? item.classList.add("is-active") : item.classList.remove("is-active")
    })
  }

  const instance = {
    footer: footerElement,
    toolbar: toolbar,
    toolbarItems: toolbarItems,

    init() {
      listenKeys($store, ["catalogIsOpen", "sidebarIsOpen"], (value) => {
        if (!value.catalogIsOpen && !value.sidebarIsOpen) {
          restoreInitialStates()
        }
      })
    },

    removeToolbarActiveItems(el) {
      toolbarItems?.forEach((item) => {
        if (item !== el) {
          item.classList.remove("is-active")
        }
      })
    }
  }

  return instance
})()

export default footer
