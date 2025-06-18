import Swiper from "swiper/bundle"
import tooltip from "@components/tooltip/tooltip.js"

const checkout = (() => {
  const ui = {
    sliders: ".delivery-service-slider"
  }

  function init() {
    const sliders = document.querySelectorAll(ui.sliders)

    if (sliders.length > 0) {
      sliders.forEach((el, index) => {
        if (!el.swiper) {
          const settings = {
            createElements: true,
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
            navigation: true,
            pagination: false,
            slidesPerView: 2.2,
            slidesPerGroup: 1,
            spaceBetween: 0,
            breakpoints: {
              // when window width is >= 640px
              640: {
                slidesPerView: 3.2
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 5.2
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 3.5
              },
              1280: {
                slidesPerView: 4.2
              }
            }
          }

          const slider = new Swiper(el, settings)

          slider.on("sliderFirstMove", () => {
            tooltip.hide()
          })
        }
      })
    }
  }

  return {
    init: init,
  }
})()

export default checkout