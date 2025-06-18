import Swiper from "swiper/bundle"

// Слайдер новостей
const newsSlider = (() => {
  const ui = {
    sliders: ".news-slider",
    prevArrow: ".news-slider__prev",
    nextArrow: ".news-slider__next",
    pagination: ".news-slider__pagination"
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
            loop: false,
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
              enabled: false
            },
            pagination: {
              enabled: true,
              el: pagination[index],
              type: "bullets",
              clickable: true
            },
            slidesPerView: 1.2,
            spaceBetween: 16,
            breakpoints: {
              // when window width is >= 768px
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
                navigation: {
                  enabled: false
                },
                pagination: {
                  enabled: true,
                  el: pagination[index],
                  type: "bullets",
                  clickable: true
                }
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
                }
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

export default newsSlider