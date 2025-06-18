import Swiper from "swiper/bundle"

// Слайдер баннеров
const heroSlider = (() => {
  const ui = {
    sliders: ".hero-slider",
    prevArrow: ".hero-slider__prev",
    nextArrow: ".hero-slider__next",
    pagination: ".hero-slider__pagination"
  }

  function init() {
    let sliders = document.querySelectorAll(ui.sliders),
      prevArrow = document.querySelectorAll(ui.prevArrow),
      nextArrow = document.querySelectorAll(ui.nextArrow),
      pagination = document.querySelectorAll(ui.pagination)

    if (sliders.length > 0) {
      sliders.forEach((el, index) => {
        if (!el.swiper) {
          new Swiper(el, {
            loop: true,
            autoplay: {
              delay: 5000,
            },
            effect: "fade",
            preloadImages: true,
            lazy: {
              loadPrevNext: true,
              loadOnTransitionStart: true
            },
            pagination: {
              el: pagination[index],
              type: "bullets",
              clickable: true
            },
            navigation: {
              nextEl: nextArrow[index],
              prevEl: prevArrow[index]
            }
          })
        }
      })
    }
  }

  return {
    init: init
  }
})()

export default heroSlider