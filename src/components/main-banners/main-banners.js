import Swiper from "swiper/bundle"

// Слайдер минибаннеров
const mainBanners = (() => {
  let sliders = document.querySelectorAll(".main-banners-slider"),
    pagination = document.querySelectorAll(".main-banners-slider__pagination")

  function init() {
    if (sliders.length > 0) {
      sliders.forEach((el, index) => {
        if (!el.swiper) {
          new Swiper(el, {
            lazy: {
              loadPrevNext: true,
            },
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
            pagination: {
              el: pagination[index],
              type: "bullets",
              clickable: true
            },
            grid: {
              fill: "row",
              rows: 1,
            },
            slidesPerView: 1,
            // slidesPerGroup: 1,
            spaceBetween: 10,
            breakpoints: {
              // when window width is >= 480px
              480: {
                grid: {
                  fill: "row",
                  rows: 1,
                },
                loop: true,
                slidesPerView: 1,
                spaceBetween: 16,
              },
              // when window width is >= 640px
              640: {
                grid: {
                  fill: "row",
                  rows: 1,
                },
                loop: true,
                slidesPerView: 2,
                spaceBetween: 16,
              },
              // when window width is >= 1024px
              1024: {
                grid: {
                  fill: "row",
                  rows: 2,
                },
                loop: false,
                slidesPerView: 3,
                spaceBetween: 24,
                freeMode: {
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

export default mainBanners