import Swiper from "swiper/bundle"

const shopSlider = (() => {
  const ui = {
    sliders:   ".shop-slider",
    prevArrow: ".shop-slider__prev",
    nextArrow: ".shop-slider__next",
  }

  function init() {
    let sliders = document.querySelectorAll(ui.sliders),
      prevArrow = document.querySelectorAll(ui.prevArrow),
      nextArrow = document.querySelectorAll(ui.nextArrow)

    if (sliders.length > 0) {
      sliders.forEach((el, index) => {
        if (!el.swiper) {
          new Swiper(el, {
            loop: true,
            mousewheel: {
              forceToAxis: true,
            },
            watchSlidesProgress: true,
            navigation: {
              enabled: false
            },
            slidesPerView: 1.2,
            spaceBetween: 16,
            breakpoints: {
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
                navigation: {
                  enabled: false
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

export default shopSlider