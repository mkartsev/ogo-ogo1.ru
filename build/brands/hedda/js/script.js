// function throttle(func, ms) {
//   let isThrottled = false,
//     savedArgs,
//     savedThis

//   function wrapper() {

//     if (isThrottled) { // (2)
//       savedArgs = arguments
//       savedThis = this
//       return
//     }

//     func.apply(this, arguments) // (1)

//     isThrottled = true

//     setTimeout(function() {
//       isThrottled = false // (3)
//       if (savedArgs) {
//         wrapper.apply(savedThis, savedArgs)
//         savedArgs = savedThis = null
//       }
//     }, ms)
//   }

//   return wrapper
// }

function smoothScroll(element) {
  var $target = document.querySelector(element.getAttribute("href"))
  $target.scrollIntoView({
    behavior: "smooth",
  })
}

const hedda = (() => {
  const ui = {
    menu: ".hedda-menu",
    menuButton: ".hedda-burger",
    colorSwitch: ".hedda-item__thumb",
    // gallery: ".hedda-item__gallery",
    // thumbs: ".hedda-item__thumbs",
  }

  const settings = {
    breakpoint: window.matchMedia("(max-width: 1024px)"),
  }

  let state = {
    menuVisible: false,
    isMobile: null,
  }

  let $menu = document.querySelector(ui.menu)
  let $menuButton = document.querySelector(ui.menuButton)

  function openMenu() {
    state.menuVisible = true
    $menu.classList.add("is-open")
    $menuButton.classList.add("is-active")
  }

  function closeMenu() {
    state.menuVisible = false
    $menu.classList.remove("is-open")
    $menuButton.classList.remove("is-active")
  }

  const accordion = function (event) {
    event.preventDefault()

    if ($(this).next().hasClass("is-open")) {
      $(this).next().removeClass("is-open")
      $(this).next().slideUp(250)
      $(this).removeClass("is-open")
    } else {
      $(this).parent().parent().find("li .hedda-menu__toggle").removeClass("is-open")
      $(this).parent().parent().find("li .hedda-menu__inner").removeClass("is-open")
      $(this).parent().parent().find("li .hedda-menu__inner").slideUp(250)
      $(this).next().toggleClass("is-open")
      $(this).next().slideToggle(250)
      $(this).addClass("is-open")
    }
  }

  const colorSwitch = (element) => {
    let targetImg = element.getAttribute("data-target-img")
    document.getElementById(targetImg).setAttribute("src", element.href)

    element.parentElement.querySelectorAll(ui.colorSwitch).forEach((el) => el.classList.remove("is-active"))
    element.classList.add("is-active")
  }

  function createAccordion() {
    $menu.querySelectorAll(".hedda-menu__toggle").forEach((el) => {
      el.addEventListener("click", accordion, false)
    })
  }

  function destroyAccordion() {
    $menu.querySelectorAll(".hedda-menu__toggle").forEach((el) => {
      el.removeEventListener("click", accordion, false)
      $(el).removeClass("is-open")
      $(el).parent().parent().find("li .hedda-menu__toggle").removeClass("is-open")
      $(el).parent().parent().find("li .hedda-menu__inner").removeClass("is-open")
      $(el).parent().parent().find("li .hedda-menu__inner").removeAttr("style")
    })
  }

  function checkBreakpoint(e) {
    state.isMobile = e.matches
  }

  function bindHandlers() {
    settings.breakpoint.onchange = (e) => {
      checkBreakpoint(e)

      if (!state.isMobile) {
        document.querySelector(ui.menuButton)?.classList.remove("is-active")
        destroyAccordion()
      } else {
        createAccordion()
      }
    }

    window.addEventListener("click", (e) => {
      const target = e.target

      if (target.closest(ui.menuButton)) {
        state.menuVisible ? closeMenu() : openMenu()
      }

      if (!target.closest(ui.menu) && !target.closest(ui.menuButton)) {
        closeMenu()
      }
    })

    document.querySelectorAll(ui.colorSwitch).forEach((el) => {
      el.addEventListener("click", function (e) {
        e.preventDefault()
        colorSwitch(el)
      })
    })

    document.querySelectorAll(".js-smooth-scroll").forEach((el) => {
      el.addEventListener("click", function (e) {
        e.preventDefault()
        smoothScroll(el)
      })
    })
  }

  function init() {
    checkBreakpoint(settings.breakpoint)
    bindHandlers()

    if (!state.isMobile) {
      closeMenu()
      destroyAccordion()
    } else {
      createAccordion()
    }
  }

  return {
    init: init,
  }
})()

document.addEventListener("DOMContentLoaded", function () {
  hedda.init()
})
