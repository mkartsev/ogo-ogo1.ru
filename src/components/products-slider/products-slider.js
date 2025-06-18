import Swiper      from "swiper/bundle"
import { isEmpty } from "@scripts/utils/is.js"
import tooltip     from "@components/tooltip/tooltip.js"

const productsSlider = (() => {
  const ui = {
    sliders:    ".products-slider",
    // prevArrow:  ".products-slider__prev",
    // nextArrow:  ".products-slider__next",
    pagination: ".products-slider__pagination",
  }

  function init() {
    let sliders = document.querySelectorAll(ui.sliders),
      // prevArrow = document.querySelectorAll(ui.prevArrow),
      // nextArrow = document.querySelectorAll(ui.nextArrow),
      pagination = document.querySelectorAll(ui.pagination)

    sliders.forEach((el, index) => {
      if (!el.swiper) {
        const count = el.querySelectorAll(".swiper-slide").length
        const slidesPerView = {}

        let dataOptions = el.getAttribute("data-swiper") || {}
        let settings

        if (!isEmpty(dataOptions)) {
          settings = JSON.parse(dataOptions)
        }

        if (count < 3) {
          slidesPerView[1024] = count
          slidesPerView[768] = count
          slidesPerView[640] = count
        } else {
          slidesPerView[1024] = 4
          slidesPerView[768] = 3
          slidesPerView[640] = 2.2
        }

        const defaults = {
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
          // navigation: {
          //   nextEl: nextArrow[index],
          //   prevEl: prevArrow[index]
          // },
          pagination: {
            el: pagination[index],
            type: "bullets",
            clickable: true
          },
          slidesPerView: 1.1,
          spaceBetween: 16,
          breakpoints: {
            // when window width is >= 640px
            640: {
              slidesPerView: slidesPerView[640],
              spaceBetween: 16
            },
            // when window width is >= 768px
            768: {
              slidesPerView: slidesPerView[768],
              spaceBetween: 16
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: slidesPerView[1024],
              spaceBetween: 8
            }
          }
        }

        const options = Object.assign({}, defaults, settings)

        const slider = new Swiper(el, options)

        slider.on("sliderFirstMove", () => {
          tooltip.hide()
        })
      }
    })
  }

  return {
    init: init
  }
})()

export default productsSlider