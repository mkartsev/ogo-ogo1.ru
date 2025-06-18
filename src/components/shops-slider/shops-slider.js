import Swiper from "swiper/bundle"

// Слайдер магазинов
const shopsSlider = (() => {
  const ui = {
    sliders:    ".shops-slider",
    prevArrow:  ".shops-slider__prev",
    nextArrow:  ".shops-slider__next",
    pagination: ".shops-slider__pagination"
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
            freeMode: {
              enabled: true,
              sticky: true,
              momentumBounceRatio: 0.05,
              momentumRatio: 0.05,
              momentumVelocityRatio: 3
            },
            mousewheel: {
              forceToAxis: true,
            },
            watchSlidesProgress: true,
            navigation: {
              enabled: false,
              nextEl: nextArrow[index],
              prevEl: prevArrow[index]
            },
            pagination: {
              enabled: true,
              el: pagination[index],
              type: "bullets",
              clickable: true
            },
            slidesPerView: 1,
            spaceBetween: 16,
            breakpoints: {
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
                navigation: {
                  enabled: false,
                  nextEl: nextArrow[index],
                  prevEl: prevArrow[index]
                },
                pagination: {
                  enabled: true,
                  el: pagination[index],
                  type: "bullets",
                  clickable: true
                },
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
                navigation: {
                  enabled: true,
                  nextEl: nextArrow[index],
                  prevEl: prevArrow[index]
                },
                pagination: {
                  enabled: false
                },
              }
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

export default shopsSlider