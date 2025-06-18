import Toastify from "toastify-js"
import { fetchData } from "@scripts/utils/fetch.js"
import popup from "@components/popup/popup.js"

const delivery = (() => {
  const ui = {
    delivery: {
      trigger: ".js-product-delivery",
      pickup: ".js-product-pickup",
      block: ".product-delivery",
    }
  }

  const deliveryBlock = document.querySelector(ui.delivery.block)
  let id = deliveryBlock?.dataset.id
  let query = {
    id: id
  }

  const deliveryData = async (query) => {
    return await fetchData(process.env.PRODUCT_DELIVERY_URL, "GET", query, 180_000) // таймаут для загрузки доставки 3 минуты
  }

  async function renderDelivery(query) {
    try {
      const data = await deliveryData(query)
      deliveryBlock?.innerHTML = data

    } catch (error) {
      deliveryBlock?.innerHTML = "<div class=`\"`callout bg-danger-subtle\"><b>Ошибка:</b> данные доставки не получены. Попробуйте перезагрузить страницу</div>"

      Toastify({
        text: error.message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        className: "fs-4 bg-danger bg-gradient",
      }).showToast()
    }
  }

  // Создаем наблюдателя, который будет загружать контент в блок доставки
  function createObserver(callback) {
    return new IntersectionObserver(async (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const block = entry.target
          try {
            // Вызываем callback после успешного обновления содержимого
            if (typeof callback === "function") {
              callback()
            } else {
              console.error("callback должен быть функцией", callback)
            }
          } catch (error) {
            Toastify({
              text: error.message,
              duration: 5000,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
              className: "fs-4 bg-danger bg-gradient",
            }).showToast()
          } finally {
            observer.unobserve(block)
          }
        }
      }
    }, { rootMargin: "-100px 0% 0% 0%", threshold: 0 }) // За 100 пкс до того, как блок попадет во вьюпорт
  }

  function bindObservers() {
    const deliveryObserver = createObserver(() => renderDelivery(query))
    document.querySelectorAll(ui.delivery.trigger)?.forEach(block => deliveryObserver.observe(block))
  }

  function bindHandlers() {
    document.addEventListener("click", (e) => {
      let pickupButton = e.target.closest(ui.delivery.pickup)

      if (pickupButton) {
        e.preventDefault()

        const popupSettings = {
          on: {
            // Когда попап готов к показу, запускаем триггер готовности карты и она рисует нам точки и баллуны
            // Событие "ymapAPIready" считывается в компоненте maps/maps.js
            // done: () => {
            //   if (typeof window.ymaps !== "undefined") {
            //     window.ymaps.ready(function () {
            //       // $(document).trigger("ymapAPIready")
            //       // $(window).trigger("ymapAPIready")
            //       window.ymapAPIready = true
            //     })
            //   }
            // },
          }
        }

        popup.show("popup-pickup", popupSettings)
      }
    })
  }

  function init() {
    bindObservers()
    bindHandlers()
  }

  return {
    init: init
  }
})()

export default delivery