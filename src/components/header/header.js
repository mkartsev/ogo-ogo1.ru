import { listenKeys } from "nanostores"
import { $store } from "@components/store/store.js"

const header = (() => {
  const ui = {
    header: ".header"
  }
  const headerElement = document.querySelector(ui.header)

  // Если хедера нет, возвращаем заглушку с пустыми методами, чтобы вызов не ломался
  if (!headerElement) {
    console.warn("Элемент .header не найден")
    return {}
  }

  const instance = {
    header: headerElement,
    get isSticky() {
      return headerElement.classList.contains("is-sticky")
    },
    set isSticky(value) {
      headerElement.classList.toggle("is-sticky", Boolean(value))
    },
    init() {
      listenKeys($store, ["isMobile", "catalogIsOpen", "sidebarIsOpen"], (value) => {
        if (value.isMobile) {
          value.catalogIsOpen || value.sidebarIsOpen ? instance.isSticky = true : instance.isSticky = false
        } else {
          instance.isSticky = false
        }
      })
    }
  }

  return instance
})()

export default header
