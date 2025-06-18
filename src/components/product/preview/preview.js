import { Fancybox } from "@fancyapps/ui"
import { ru } from "@scripts/plugins/fancybox.ru.js"
import { wrapElement } from "@scripts/utils/element.js"
import cart from "@components/cart/cart.js"
import photoSlider from "@components/photo-slider/photo-slider.js"
import popup from "@components/popup/popup.js"
import userList from "@components/user-list/user-list.js"

const preview = (() => {
  const ui = {
    previewButton: ".js-product-preview"
  }

  function showPreview(el) {
    const url = el.href
    const previewId = el.dataset.id
    const gtmData = el.closest("[data-gtm]")?.dataset.gtm

    if (gtmData) addToDataLayer(gtmData)

    if (popup.exist(`popup-product-preview-${previewId}`)) {
      popup.show(`popup-product-preview-${previewId}`)
    } else {
      Fancybox.show(
        [
          {
            src: `${url}?ELEMENT_ID=${previewId}`,
            type: "ajax"
          }
        ],
        {
          l10n: ru,
          dragToClose: false,
          hideScrollbar: true,
          closeExisting: true,
          on: {
            reveal: (fancybox, slide) => {
              let wrapper = document.createElement("div")
              wrapper.classList.add("popup", "popup--lg")
              wrapper.id = `popup-product-preview-${previewId}`
              wrapper.style.display = "block"

              wrapElement(slide.contentEl, wrapper)

              // Создаем попап без хедера
              popup.create(
                `popup-product-preview-${previewId}`,
                null,
                slide.contentEl.innerHTML,
                "popup--lg"
              )

              photoSlider.init()
              cart.setButtons()
              userList.setButtons()
            }
          }
        }
      )
    }
  }

  function addToDataLayer(obj) {
    if (!obj) {
      return
    }

    window.dataLayer = window.dataLayer || []
    let data = JSON.parse(obj)

    window.dataLayer.push({
      event: "eec.impressionClick",
      "event-action": "Быстрый просмотр",
      "event-category": "ecommerce",
      "event-label": data.name,
      "event-non-interaction": "False",
      ecommerce: {
        detail: {
          actionField: {
            list: data.list
          },
          products: [
            {
              id: data.id,
              name: data.name,
              brand: data.brand,
              category: data.category,
              position: data.position,
              price: data.price.replace(/\s/g, "")
            }
          ]
        }
      }
    })
  }

  function bindHandlers() {
    document.addEventListener("click", (e) => {
      const previewButton = e.target.closest(ui.previewButton)

      if (previewButton) {
        e.preventDefault()
        showPreview(previewButton)
      }
    })
  }

  function init() {
    bindHandlers()
  }

  return {
    init
  }
})()

export default preview
