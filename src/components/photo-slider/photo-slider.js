import Swiper from "swiper/bundle"

const photoSlider= (() => {
  const ui = {
    sliders:    ".photo-slider",
    prevArrow:  ".photo-slider__prev",
    nextArrow:  ".photo-slider__next",
    pagination: ".photo-slider__pagination",
  }

  function init() {
    let sliders = document.querySelectorAll(ui.sliders),
      prevArrow = document.querySelectorAll(ui.prevArrow),
      nextArrow = document.querySelectorAll(ui.nextArrow),
      pagination = document.querySelectorAll(ui.pagination)

    sliders.forEach((el, index) => {
      if (!el.swiper) {
        const count = el.querySelectorAll(".swiper-slide").length
        const slidesPerView = {}

        if (count < 3) {
          slidesPerView[1024] = count
          slidesPerView[640] = count
        } else {
          slidesPerView[1024] = 3
          slidesPerView[640] = 2
        }

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
            nextEl: nextArrow[index],
            prevEl: prevArrow[index]
          },
          pagination: {
            el: pagination[index],
            type: "bullets",
            clickable: true
          },
          slidesPerView: 1,
          spaceBetween: 10,
          breakpoints: {
            // when window width is >= 640px
            640: {
              slidesPerView: slidesPerView[640],
              spaceBetween: 10
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: slidesPerView[1024],
              spaceBetween: 30
            }
          }
        })
      }
    })
  }

  return {
    init: init
  }
})()

export default photoSlider