import { slideUp, slideDown } from "@scripts/utils/slide.js"
import { KEYCODES } from "@scripts/utils/keycodes.js"

const accordion = (() => {
  let supports = !!document.querySelector && !!window.addEventListener
  let settings
  let observer

  let defaults = {
    speed: 250,
    single: false,
    initClass: "js-accordion",
    itemClass: "js-accordion-item",
    headerClass: "js-accordion-header",
    bodyClass: "js-accordion-body",
    activeClass: "is-active"
  }

  function forEach(collection, callback, scope) {
    if (Object.prototype.toString.call(collection) === "[object Object]") {
      for (let prop in collection) {
        if (Object.prototype.hasOwnProperty.call(collection, prop)) {
          callback.call(scope, collection[prop], prop, collection)
        }
      }
    } else {
      for (let i = 0, len = collection.length; i < len; i++) {
        callback.call(scope, collection[i], i, collection)
      }
    }
  }

  function extend(target, ...sources) {
    sources.forEach(function (source) {
      for (let prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
          target[prop] = source[prop]
        }
      }
    })
    return target
  }

  function getDataAttributes($element) {
    let data = {}
      ;[...$element.attributes].forEach(function (attr) {
        if (attr.name.indexOf("data-") === 0) {
          let propName = toCamelCase(attr.name.slice(5))
          let propValue = attr.value
          if (propValue === "") {
            propValue = true
          } else if (propValue === "true" || propValue === "false") {
            propValue = propValue === "true"
          } else if (!isNaN(propValue)) {
            propValue = parseInt(propValue, 10)
          }
          data[propName] = propValue
        }
      })
    return data
  }

  function toCamelCase(str) {
    return str.replace(/-([a-z])/g, function (match, letter) {
      return letter.toUpperCase()
    })
  }

  function toggleAccordion($header) {
    let $item = $header.closest(`.${settings.itemClass}`)
    let $body = $header.nextElementSibling

    if ($item.hasAttribute("disabled")) {
      return
    }
    if (settings.single) {
      let $activeItems = $item
        .closest(`.${settings.initClass}`)
        .querySelectorAll(`.${settings.itemClass}.${settings.activeClass}`)
      forEach($activeItems, function ($activeItem) {
        if ($activeItem !== $item) {
          $activeItem.classList.remove(settings.activeClass)
          slideUp(
            $activeItem.querySelector(`.${settings.bodyClass}`),
            settings.speed,
            function () { }
          )
        }
      })
    }

    $item.classList.toggle(settings.activeClass)
    if ($item.classList.contains(settings.activeClass)) {
      slideDown($body, settings.speed, function () { })
    } else {
      slideUp($body, settings.speed, function () { })
    }
  }

  function destroy() {
    if (!settings) return

    let $accordions = document.querySelectorAll(`.${defaults.initClass}`)
    forEach($accordions, function ($accordion) {
      // Удаляем класс только если это старый аккордеон, не динамически добавленный
      if ($accordion.classList.contains(defaults.initClass)) {
        $accordion.classList.remove(settings.initClass)
        $accordion.removeAttribute("data-initialized") // Убираем пометку инициализации
      }
    })

    let $headers = document.querySelectorAll(`.${defaults.headerClass}`)
    forEach($headers, function ($header) {
      $header.removeAttribute("tabindex")
      $header.removeEventListener("click", function () {
        toggleAccordion($header)
      })
      $header.removeEventListener("keydown", function () {
        toggleAccordion($header)
      })
    })

    settings = null
    if (observer) {
      observer.disconnect()
    }
  }

  function observeDynamicChanges() {
    if (!supports) return

    observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          for (let node of mutation.addedNodes) {
            if (node.nodeType === 1 && node.matches(`.${defaults.initClass}`)) {
              // Инициализируем только новые аккордеоны
              init({ observeDynamicChanges: false })
            }
          }
        }
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })
  }

  function init(options) {
    if (!supports) return

    let $accordions = document.querySelectorAll(`.${defaults.initClass}`)
    forEach($accordions, function ($accordion) {
      if ($accordion.hasAttribute("data-initialized")) return // Пропускаем уже инициализированные аккордеоны

      let dataOptions = getDataAttributes($accordion)
      settings = extend({}, defaults, options, dataOptions)

      $accordion.classList.add(settings.initClass)
      $accordion.setAttribute("data-initialized", "true") // Помечаем аккордеон как инициализированный

      let $headers = $accordion.querySelectorAll(`.${settings.headerClass}`)
      forEach($headers, function ($header) {
        let $item = $header.closest(`.${settings.itemClass}`)

        if (!$item.hasAttribute("disabled")) {
          $header.setAttribute("tabindex", 0)
        }

        $header.addEventListener("click", function () {
          if (!$item.hasAttribute("disabled")) {
            toggleAccordion($header)
          }
        })
        $header.addEventListener("keydown", function (e) {
          if (
            (e.keyCode == KEYCODES.SPACE || e.keyCode == KEYCODES.ENTER) &&
            !$item.hasAttribute("disabled")
          ) {
            e.preventDefault()
            toggleAccordion($header)
          }
        })
      })

      let $activeItems = $accordion.querySelectorAll(
        `.${settings.itemClass}.${settings.activeClass}`
      )
      forEach($activeItems, function ($item) {
        let $body = $item.querySelector(`.${settings.bodyClass}`)
        $body.style.display = "block"
        if (settings.single && $activeItems.length > 1) {
          $item.classList.remove(settings.activeClass)
          $body.style.display = "none"
        }
      })

      if (settings.single && $activeItems.length > 1) {
        $activeItems[0].classList.add(settings.activeClass)
        $activeItems[0].querySelector(`.${settings.bodyClass}`).style.display = "block"
      }
    })

    observeDynamicChanges() // Наблюдаем за динамическими изменениями
  }

  return {
    init: init,
    destroy: destroy
  }
})()

export default accordion
