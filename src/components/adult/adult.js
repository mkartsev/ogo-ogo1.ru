import Toastify      from "toastify-js"
import { fetchData } from "@scripts/utils/fetch.js"
import { KEYCODES }  from "@scripts/utils/keycodes.js"
import popup         from "@components/popup/popup.js"

const adult = (() => {
  const ui = {
    categories: ".js-adult-category", // Если на странице есть этот класс, то попап будет показан сразу
    blocks: ".js-adult-block",        // Клик по этому блоку будет показыать попап, класс снимается с блоков после ответа от сервера
    elements: [
      ".js-adult-block .js-adult-element", // Взаимодействие с элементами внутри блока будет блокироваться
      ".js-adult-block a",
      ".js-adult-block button",
      ".js-adult-block input",
      ".js-adult-block select",
      ".js-adult-block textarea",
    ],
    confirmButton: ".js-adult-confirm",
    notConfirmButton: ".js-adult-notconfirm",
  }

  const $categories = document.querySelectorAll(ui.categories)
  const $blocks = document.querySelectorAll(ui.blocks)
  const $elements = document.querySelectorAll(ui.elements.toString())

  function checkAdult() {
    if (document.querySelectorAll(ui.categories).length > 0) {
      showPopup()
    }
  }

  async function showPopup() {
    if (popup.exist("popup-adult")) {
      popup.show("popup-adult")
    } else {
      await fetchData(process.env.ADULT_FORM_URL)
        .then((html) => {
          popup.create("popup-adult", "Подтвердите свой возраст", html, "popup--md")
          popup.show("popup-adult")
        })
        .catch((error) => {
          Toastify({
            text: error.message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            className: "fs-4 bg-danger bg-gradient",
          }).showToast()
        })
    }
  }

  function disableElements() {
    if ($elements.length > 0) {
      $elements.forEach((el) => {
        el.style.pointerEvents = "none"
        el.addEventListener("keydown", handleDisabledInteractions)
      })
    }
  }

  /**
    * После подтверждения возраста, функция enableElements() будет
    * вызывать функцию observeDynamicBlocks(), которая
    * создает экземпляр MutationObserver для отслеживания изменений в DOM.
    * Когда на страницу динамически добавляются новые узлы, MutationObserver
    * проверяет, являются ли эти узлы блоками с классом js-adult-block.
    * Если да, то вызывается функция enableBlock(), которая разблокирует
    * взаимодействие с элементами внутри этого блока и удаляет класс js-adult-block.
   */
  function enableElements() {
    if ($elements.length > 0) {
      $elements.forEach((el) => {
        el.style.pointerEvents = "unset"
        el.removeEventListener("keydown", handleDisabledInteractions)
      })
    }

    if ($blocks.length > 0) {
      $blocks.forEach((el) => {
        enableBlock(el)
      })
    }

    if ($categories.length > 0) {
      $categories.forEach((el) => {
        el.classList.remove(ui.categories.substring(1))
      })
    }

    observeDynamicBlocks()
  }

  function observeDynamicBlocks() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const addedNodes = mutation.addedNodes
          addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE && node.matches(ui.blocks)) {
              enableBlock(node)
            }
          })
        }
      })
    })

    const observerConfig = {
      childList: true,
      subtree: true,
    }

    observer.observe(document.body, observerConfig)
  }

  function enableBlock(block) {
    block.classList.remove(ui.blocks.substring(1))
    block.removeEventListener("click", handleBlockClick)
    const elements = block.querySelectorAll(ui.elements.toString())
    elements.forEach((el) => {
      el.style.pointerEvents = "unset"
      el.removeEventListener("keydown", handleDisabledInteractions)
    })
  }

  function handleBlockClick(e) {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    showPopup()
  }

  function handleDisabledInteractions(e) {
    // Ожидаем "e" как событие клавы "keydown"
    // Если событие на клаве не кнопка Tab, то отключаем всё
    if (e.keyCode != KEYCODES.TAB) {
      showPopup()
      e.returnValue = false
      return false
    }
  }

  async function sendAdultForm(form) {
    const url = form.getAttribute("action")
    const method = form.getAttribute("method")
    const data = new URLSearchParams(new FormData(form))

    await fetchData(url, method, data)
      .then((data) => {
        if (data.result == "ok") {
          enableElements()
        } else if (data.result == "error") {
          console.log("Пользователю меньше 18 лет")
        }
      })
  }

  function bindHandlers() {
    document.addEventListener("click", (e) => {
      const clickedElement = e.target
      const form = clickedElement.closest(".form-adult")

      switch (true) {
        case clickedElement.closest(ui.confirmButton) !== null:
          e.preventDefault()
          if (form) {
            sendAdultForm(form)
          }
          popup.close()
          break

        case clickedElement.closest(ui.notConfirmButton) !== null:
          window.location = "/"
          break

        case clickedElement.closest(ui.blocks) !== null:
          handleBlockClick(e)
          break
      }
    })
  }

  function init() {
    checkAdult()
    disableElements()
    bindHandlers()
  }

  return {
    init: init,
    showPopup: showPopup,
  }
})()

export default adult
