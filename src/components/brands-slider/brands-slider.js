import Swiper from "swiper/bundle"
import tooltip from "@components/tooltip/tooltip.js"

// Слайдер брендов
const brandsSlider = (() => {
  const ui = {
    sliders: ".brands-slider",
    prevArrow: ".brands-slider__prev",
    nextArrow: ".brands-slider__next",
    pagination: ".brands-slider__pagination",
  }

  function init() {
    let sliders = document.querySelectorAll(ui.sliders),
      prevArrow = document.querySelectorAll(ui.prevArrow),
      nextArrow = document.querySelectorAll(ui.nextArrow),
      pagination = document.querySelectorAll(ui.pagination)

    if (sliders.length > 0) {
      sliders.forEach((el, index) => {
        if (!el.swiper) {
          const slider = new Swiper(el, {
            lazy: {
              loadPrevNext: true,
            },
            loop: false,
            freeMode: {
              enabled: true,
              sticky: true,
              momentumBounceRatio: 0.05,
              momentumRatio: 0.05,
              momentumVelocityRatio: 3
            },
            navigation: {
              enabled: false,
            },
            pagination: {
              enabled: true,
              el: pagination[index],
              type: "bullets",
              clickable: true
            },
            grid: {
              rows: 2,
              fill: "row"
            },
            slidesPerView: 2.5,
            spaceBetween: 16,
            breakpoints: {
              768: {
                grid: {
                  rows: 2,
                  fill: "row"
                },
                slidesPerView: 3.5,
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
              1024: {
                grid: {
                  rows: 2,
                  fill: "row"
                },
                slidesPerView: 5,
                spaceBetween: 20,
                navigation: {
                  enabled: true,
                  nextEl: nextArrow[index],
                  prevEl: prevArrow[index]
                },
                pagination: {
                  enabled: true,
                  el: pagination[index],
                  type: "bullets",
                  clickable: true
                }
              }
            }
          })

          slider.on("sliderFirstMove", () => {
            tooltip.hide()
          })
        }
      })
    }
  }

  return {
    init: init
  }
})()

export default brandsSlider