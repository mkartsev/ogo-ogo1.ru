import { Tab } from "bootstrap"
import { Fancybox } from "@fancyapps/ui"
import Toastify from "toastify-js"
import { setIcon } from "@scripts/shared/set-icon.js"
import { resetIcon } from "@scripts/shared/reset-icon.js"
import { ru } from "@scripts/plugins/fancybox.ru.js"
import { fetchData } from "@scripts/utils/fetch.js"
import fields from "@components/fields/fields.js"
import forms from "@components/forms/forms.js"
import selectCity from "@components/select-city/select-city.js"

const popup = (() => {
  let options = {
    ...Fancybox.defaults,
    l10n: ru,
    dragToClose: false,
    hideScrollbar: true,
    closeExisting: true,
    commonCaption: true,
    Thumbs: false,
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"],
      },
    },
    // on: {
    //   done: (fancybox, slide) => {
    //     slide.triggerEl = элемент вызвавший фансибокс
    //     slide.contentEl = загруженный элемент в попапе
    //   }
    // }
  }

  let exist = (id) => !!document.getElementById(id)

  let visible = () => Fancybox.getInstance()

  function create(id, title, content, className = "popup--md") {
    // Создаем попап
    let popup = document.createElement("div")
    popup.id = id
    popup.style.display = "none"
    popup.classList.add("popup")
    popup.classList.add(className)

    if (title !== null) {
      let popupTitle = document.createElement("p")
      popupTitle.classList.add("popup-title")
      popupTitle.innerText = title
      popup.appendChild(popupTitle)
    }

    let popupContent = document.createElement("div")
    popupContent.classList.add("popup-content")
    popupContent.innerHTML = content
    popup.appendChild(popupContent)

    document.body.append(popup)
  }

  function show(id, settings = {}) {
    Fancybox.show([
      {
        src: `#${id}`,
        type: "inline",
      },
    ], { ...options, ...settings })
  }

  function close() {
    Fancybox.close()
  }

  async function handlePopupAction(e) {
    const clicked = e.target.closest(".js-auth-popup, .js-callback-popup, .js-city-popup, .js-complain-popup, .js-feedback-popup, .js-question-popup, .js-recovery-popup, .js-registration-popup, .js-supplier-popup, .js-user-wish-popup, .js-fast-buy-popup")

    if (!clicked) return

    switch (true) {
      case clicked.classList.contains("js-auth-popup"):
        e.preventDefault()
        await handleAuthPopup(clicked)
        break

      case clicked.classList.contains("js-callback-popup"):
        e.preventDefault()
        await handlePopup("popup-callback", "Заказать звонок", clicked.href, "popup--md")
        break

      case clicked.classList.contains("js-city-popup"):
        e.preventDefault()
        await handlePopup("popup-city", "Выберите ваш город", clicked.href, "popup--md", () => {
          selectCity.init()
        })
        break

      case clicked.classList.contains("js-complain-popup"):
        e.preventDefault()
        await handlePopup("popup-complain", "Пожаловаться", clicked.href, "popup--md")
        break

      case clicked.classList.contains("js-feedback-popup"):
        e.preventDefault()
        await handleFeedbackPopup(clicked)
        break

      case clicked.classList.contains("js-question-popup"):
        e.preventDefault()
        await handlePopup("popup-question", "Задать вопрос", clicked.href, "popup--md")
        break

      case clicked.classList.contains("js-recovery-popup"):
        e.preventDefault()
        await handlePopup("popup-recovery", "Восстановить пароль", clicked.href, "popup--md")
        break

      case clicked.classList.contains("js-registration-popup"):
        e.preventDefault()
        await handlePopup("popup-registration", "Регистрация", clicked.href, "popup--md")
        break

      case clicked.classList.contains("js-supplier-popup"):
        e.preventDefault()
        await handlePopup("popup-supplier", "Поставщикам", clicked.href, "popup--md")
        break

      case clicked.classList.contains("js-user-wish-popup"):
        e.preventDefault()
        await handlePopup("popup-user-wish", "Что бы вы хотели?", clicked.href, "popup--md")
        break

      case clicked.classList.contains("js-fast-buy-popup"):
        e.preventDefault()
        await handleFastBuyPopup(clicked)
        break
    }
  }

  async function handlePopup(popupId, title, url, popupClass, callback) {
    if (popup.exist(popupId)) {
      popup.show(popupId)
    } else {
      await fetchData(url, "GET")
        .then((data) => {
          popup.create(popupId, title, data, popupClass)

          fields.init()
          forms.initValidator()

          if (callback) callback()

          popup.show(popupId)
        })
      // .catch((error) => console.warn("Что-то пошло не так:", error.message))
    }
  }

  async function handleAuthPopup(clicked) {
    if (popup.exist("popup-auth")) {
      popup.show("popup-auth")
    } else {
      const url = clicked.href
      const data = {
        backurl: window.location.pathname,
      }
      // объект data будет преобразован в URLSearchParams и добавлен в url
      await fetchData(url, "GET", data)
        .then((html) => {
          popup.create("popup-auth", "Вход", html, "popup--sm")

          fields.init()
          forms.initValidator()

          popup.show("popup-auth")
        })
      // .catch((error) => console.warn("Что-то пошло не так:", error.message))
    }
  }

  async function handleFeedbackPopup(clicked) {
    if (popup.exist("popup-feedback")) {
      showFeedbackPopup(clicked)
    } else {
      const url = clicked.href

      await fetchData(url, "GET")
        .then((html) => {
          popup.create("popup-feedback", "Обратная связь", html, "popup--md")

          fields.init()
          forms.initValidator()

          showFeedbackPopup(clicked)
        })
      // .catch((error) => console.warn("Что-то пошло не так:", error.message))
    }
  }

  async function handleFastBuyPopup(clicked) {
    const url = clicked.href
    const id = clicked.dataset.id

    if (popup.exist("popup-fast-buy")) {
      setFastBuyId(id) // Устанавливаем айди в инпут для быстрой покупки
      popup.show("popup-fast-buy", { closeExisting: false })
    } else {
      clicked.disabled = true
      setIcon(clicked, "ui--spinner", "spin")

      await fetchData(url, "GET", null, 100000)
        .then((html) => {
          popup.create("popup-fast-buy", "Купить в 1 клик", html)

          fields.init()
          forms.initValidator()

          popup.show("popup-fast-buy", { closeExisting: false })
        })
        .then(() => setFastBuyId(id))
        .catch((error) => {
          Toastify({
            text: error.message,
            duration: 5000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            className: "fs-4 bg-danger bg-gradient",
          }).showToast()
        })
        .finally(() => {
          clicked.disabled = false
          resetIcon(clicked)
        })
    }
  }

  function checkFeedbackTab(el, content) {
    if (!el.getAttribute("data-show-tab")) return

    const tab = el.getAttribute("data-show-tab")
    const feedbackTabsTriggers = content.querySelectorAll("#feedback-tabs button")

    if (feedbackTabsTriggers.length > 0) {
      feedbackTabsTriggers.forEach((triggerEl) => {
        triggerEl.addEventListener("click", (event) => {
          event.preventDefault()
          const tabTrigger = new Tab(triggerEl)
          tabTrigger.show()
        })
      })

      const tabTrigger = content.querySelector(`button[data-bs-target="${tab}"]`)
      const tabInstance = Tab.getOrCreateInstance(tabTrigger)
      tabInstance.show()
    }
  }

  function showFeedbackPopup(clicked) {
    Fancybox.show(
      [
        {
          src: "#popup-feedback",
          type: "inline",
        },
      ],
      {
        l10n: ru,
        dragToClose: false,
        hideScrollbar: true,
        closeExisting: true,
        on: {
          reveal: (fancybox, slide) => {
            checkFeedbackTab(clicked, slide.contentEl)
            forms.populateForm(clicked)
          }
        },
      }
    )
  }

  function setFastBuyId(id) {
    const fastBuyInput = document.getElementById("fast-buy-id")
    if (fastBuyInput) {
      fastBuyInput.value = id
    }
  }

  function bindHandlers() {
    Fancybox.bind("[data-fancybox]", options)

    document.addEventListener("click", (e) => {
      handlePopupAction(e)
    })
  }

  function init() {
    bindHandlers()
  }

  return {
    init, exist, visible, create, show, close
  }
})()

export default popup
