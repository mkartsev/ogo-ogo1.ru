import Swiper  from "swiper/bundle"
import tooltip from "@components/tooltip/tooltip.js"

const slider = (() => {
  const ui = {
    images:     ".product-slider__images",
    pagination: ".product-slider__images-pagination",
    thumbs:     ".product-slider__thumbs",
    thumbsPrev: ".product-slider__thumbs-prev",
    thumbsNext: ".product-slider__thumbs-next",
  }

  const imagesElement = document.querySelector(ui.images)
  const imagesPagination = document.querySelector(ui.pagination)
  const thumbsElement = document.querySelector(ui.thumbs)
  const thumbsPrev = document.querySelector(ui.thumbsPrev)
  const thumbsNext = document.querySelector(ui.thumbsNext)

  let thumbsSlider = null
  let imagesSlider = null

  function setupThumbsSlider() {
    const options = {
      loop: false,
      direction: "vertical",
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
      pagination: false,
      slidesPerView: 5,
      spaceBetween: 10,
      navigation: {
        enabled: true,
        nextEl: thumbsPrev,
        prevEl: thumbsNext
      }
    }

    thumbsSlider = new Swiper(thumbsElement, options)

    thumbsSlider.on("sliderFirstMove", () => {
      tooltip.hide()
    })

    thumbsPrev.addEventListener("click", () => imagesSlider.slidePrev())
    thumbsNext.addEventListener("click", () => imagesSlider.slideNext())
  }

  function setupImagesSlider() {
    const options = {
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
      pagination: {
        enabled: true,
        el: imagesPagination,
        type: "bullets",
        clickable: true
      },
      slidesPerView: 1,
      spaceBetween: 16,
      thumbs: {
        swiper: thumbsSlider,
        multipleActiveThumbs: false
      },
      breakpoints: {
        // when window width is >= 1024px
        1024: {
          pagination: {
            enabled: false
          }
        }
      }
    }

    imagesSlider = new Swiper(imagesElement, options)

    imagesSlider.on("sliderFirstMove", () => {
      tooltip.hide()
    })
  }

  function init() {
    if (thumbsElement && imagesElement) {
      setupThumbsSlider()
      setupImagesSlider()
    }
  }

  return {
    init: init
  }
})()


export default slider