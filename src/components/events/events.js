import tippy from "tippy.js"
import { hideAll } from "tippy.js"

const events = (() => {
  const ui = {
    copy: ".js-copy-code",
    link: ".js-copy-link"
  }

  function copyCode(el) {
    let data = el.getAttribute("data-copy-code")

    navigator.clipboard.writeText(data)
      .then(() => {
        const tooltip = el.getAttribute("data-copy-code-tooltip")

        if (el._tippy) {
          hideAll()
          el._tippy.setContent(tooltip)
          setTimeout(() => el._tippy.show(), 100)
        } else {
          tippy(el, {
            theme: "ogo",
            inertia: true,
            placement: "top",
            trigger: "click",
            hideOnClick: true,
            content: tooltip
          }).show()
        }
      })
  }

  function copyLink(el) {
    let data = window.location.href
    navigator.clipboard.writeText(data)

      .then(() => {
        const tooltip = el.getAttribute("data-copy-link-tooltip")

        if (el._tippy) {
          hideAll()
          el._tippy.setContent(tooltip)
          setTimeout(() => el._tippy.show(), 100)
        } else {
          tippy(el, {
            arrow: false,
            theme: "ogo",
            inertia: true,
            placement: "top",
            trigger: "click",
            hideOnClick: true,
            content: tooltip
          }).show()
        }
      })
  }

  function declOfNum(n, text_forms) {
    n = Math.abs(n) % 100
    var n1 = n % 10
    if (n > 10 && n < 20) { return text_forms[2] }
    if (n1 > 1 && n1 < 5) { return text_forms[1] }
    if (n1 == 1) { return text_forms[0] }
    return text_forms[2]
  }

  const addZero = (x) => (x < 10 && x >= 0) ? "0" + x : x

  function countdown() {
    const timer = document.querySelector("#countdown")

    if (timer) {
      const tarDate = timer.getAttribute("data-date").split("-")
      const day = parseInt(tarDate[0])
      const month = parseInt(tarDate[1])
      const year = parseInt(tarDate[2])

      let tarTime = timer.getAttribute("data-time")
      let tarhour, tarmin

      if (tarTime != null) {
        tarTime = tarTime.split(":")
        tarhour = parseInt(tarTime[0])
        tarmin = parseInt(tarTime[1])
      }
      let countDownDate = new Date(year, month-1, day, tarhour, tarmin, 0, 0).getTime()

      let x = setInterval(function() {
        let now = new Date().getTime()

        let distance = countDownDate - now
        let days = Math.floor(distance / (1000 * 60 * 60 * 24))
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        // let seconds = Math.floor((distance % (1000 * 60)) / 1000)

        timer.querySelector(".day .num").innerHTML = addZero(days)
        timer.querySelector(".hour .num").innerHTML = addZero(hours)
        timer.querySelector(".min .num").innerHTML = addZero(minutes)
        timer.querySelector(".day .word").innerHTML = declOfNum(days, ["день", "дня", "дней"])
        timer.querySelector(".hour .word").innerHTML = declOfNum(hours, ["час", "часа", "часов"])
        timer.querySelector(".min .word").innerHTML = declOfNum(minutes, ["минута", "минуты", "минут"])

        if (distance < 0) {
          clearInterval(x)
          timer.innerHTML = "Акция завершена"
        }
      }, 1000)
    }
  }

  function bindHandlers() {
    document.addEventListener("click", (e) => {
      const copyEl = e.target.closest(ui.copy)
      const linkEl = e.target.closest(ui.link)

      if (copyEl) {
        e.preventDefault()
        copyCode(copyEl)
      }

      if (linkEl) {
        e.preventDefault()
        copyLink(linkEl)
      }
    })
  }

  function init() {
    countdown()
    bindHandlers()
  }

  return {
    init: init
  }
})()

export default events
