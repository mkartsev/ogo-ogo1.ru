import Swiper from "swiper/bundle"

const shopThumbs = (() => {
  const ui = {
    sliders:   ".shop-thumbs",
    prevArrow: ".shop-thumbs__prev",
    nextArrow: ".shop-thumbs__next"
  }

  function init() {
    let sliders = document.querySelectorAll(ui.sliders),
      prevArrow = document.querySelectorAll(ui.prevArrow),
      nextArrow = document.querySelectorAll(ui.nextArrow)

    if (sliders.length > 0) {
      sliders.forEach((el, index) => {
        new Swiper(el, {
          loop: false,
          navigation: {
            enabled: false
          },
          slidesPerView: 2.5,
          spaceBetween: 16,
          breakpoints: {
            // when window width is >= 640px
            640: {
              slidesPerView: 4,
              spaceBetween: 16,
              navigation: {
                enabled: false
              },
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 5,
              spaceBetween: 24,
              navigation: {
                enabled: true,
                nextEl: nextArrow[index],
                prevEl: prevArrow[index]
              },
            }
          }
        })
      })
    }
  }

  return {
    init: init
  }
})()

export default shopThumbs