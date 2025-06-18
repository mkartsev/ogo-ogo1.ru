import tippy from "tippy.js"
import { hideAll } from "tippy.js"

const tooltip = (() => {
  const ui = {
    selector: ".js-tooltip",
  }

  function bindTooltip(el) {
    if (!el._tippy) {
      tippy(el, {
        allowHTML: true,
        animation: "shift-away",
        theme: "ogo",
        delay: 100,
        hideOnClick: true,
        inertia: true,
        maxWidth: 250,
        offset: [0, 16],
        trigger: "mouseenter",
        interactive: false,
        interactiveBorder: 30,
        touch: () => {
          return el.classList.contains("js-add-to-list") ? ["hold", 20] : true
        },
        content(reference) {
          const title = reference.dataset.tooltipTitle
          const content = reference.dataset.tooltipContent
          const htmlSelector = reference.dataset.tooltipHtml
          const close = reference.dataset.tippyClose

          if (htmlSelector) {
            const html = document.querySelector(htmlSelector)
            if (html) {
              return html.innerHTML
            }
          }

          return (close ? "<div class='tippy-close'></div>" : "") +
            (title ? "<div class='tippy-title'>" + title + "</div>" : "") +
            (content ? content : "")
        },
        appendTo: () => document.body,
      })
    }
  }

  function hide() {
    hideAll()
  }

  function setFavorite(el) {
    if (!el._tippy) {
      bindTooltip(el)
    }
    switch (el.getAttribute("data-action")) {
      case "add":
        el.setAttribute("data-tooltip-content", "В избранное")
        el._tippy.setContent("В избранное")
        break
      case "del":
        el.setAttribute("data-tooltip-content", "Удалить из избранного")
        el._tippy.setContent("Удалить из избранного")
        break
      default:
        break
    }
  }

  function setCompare(el) {
    if (!el._tippy) {
      bindTooltip(el)
    }
    switch (el.getAttribute("data-action")) {
      case "ADD_TO_COMPARE_LIST":
        el.setAttribute("data-tooltip-content", "В сравнение")
        el._tippy.setContent("В сравнение")
        break
      case "DELETE_FROM_COMPARE_LIST":
        el.setAttribute("data-tooltip-content", "Удалить из сравнения")
        el._tippy.setContent("Удалить из сравнения")
        break
      default:
        break
    }
  }

  function handleFavorite(el, show = true) {
    if (!el || !el._tippy) return

    el._tippy.hide()

    // Атрибут show=false будет передаваться из user-list.js, когда жмем на кнопку удаления из избранного и карточка с товаром будет удаляться со страницы
    if (show) {
      setFavorite(el)
      setTimeout(() => el._tippy.show(), 100)
    }
  }

  function handleCompare(el, show = true) {
    if (!el || !el._tippy) return

    el._tippy.hide()

    if (show) {
      setCompare(el)
      setTimeout(() => el._tippy.show(), 100)
    }
  }

  function initTooltips(nodes) {
    nodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.matches(ui.selector) && !node._tippy) {
          bindTooltip(node)
        }
        const tooltipElements = node.querySelectorAll(ui.selector)
        tooltipElements.forEach((el) => {
          if (!el._tippy) {
            bindTooltip(el)
          }
        })
      }
    })
  }

  function observeDynamicContent() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          // Фильтруем только узлы, которые содержат или являются элементами с классом js-tooltip
          const relevantNodes = Array.from(mutation.addedNodes).filter((node) => {
            if (node.nodeType !== Node.ELEMENT_NODE) return false
            return node.matches(ui.selector) || node.querySelector(ui.selector)
          })
          if (relevantNodes.length > 0) {
            initTooltips(relevantNodes)
          }
        }
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  function bindHandlers() {
    const tooltipElements = document.querySelectorAll(ui.selector)
    if (tooltipElements.length > 0) {
      tooltipElements.forEach((el) => {
        if (!el._tippy) {
          bindTooltip(el)
        }
      })
    }

    document.addEventListener("click", (e) => {
      const clicked = e.target
      if (clicked.closest(".tippy-close")) {
        e.preventDefault()
        hide()
      }
    })
  }

  function init() {
    bindHandlers()
    observeDynamicContent() // Запускаем наблюдение за изменениями
    window.tooltip = tooltip
  }

  return {
    init,
    hide,
    setFavorite,
    setCompare,
    handleFavorite,
    handleCompare
  }
})()

export default tooltip