import Toastify      from "toastify-js"
import { fetchData } from "@scripts/utils/fetch.js"

const changeCity = (() => {
  function init() {
    document.addEventListener("click", (e) => {
      const clickedEl = e.target.closest(".js-change-city")

      if (clickedEl) {
        e.preventDefault()
        const cityValue = clickedEl.getAttribute("data-city")
        changeCityHandler(cityValue)
      }
    })
  }

  async function changeCityHandler(id) {
    // id - ожидаем число
    if (typeof id !== "undefined" && parseInt(id) > 0) {
      const url = process.env.SET_CITY_URL
      const method = "POST"
      const data = {
        city_id: id
      }

      await fetchData(url, method, data)
        .then((data) => {
          if (data.result === "ok") {
            window.location.reload()
          }
          if (data.result === "error") {
            console.log("Не удалось сменить город")
          }
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

  return {
    init: init,
    change: changeCityHandler
  }
})()

export default changeCity
