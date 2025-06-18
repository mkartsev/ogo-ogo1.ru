// Слайдер видео
const samsungVideoSlider = () => {
  let sliders = document.querySelectorAll(".samsung-video-slider"),
    prevArrow = document.querySelectorAll(".samsung-video-slider__prev"),
    nextArrow = document.querySelectorAll(".samsung-video-slider__next"),
    pagination = document.querySelectorAll(".samsung-video-slider__pagination")

  if (sliders.length > 0) {
    sliders.forEach((el, index) => {
      const swiper = new Swiper(el, {
        loop: true,
        freeMode: {
          enabled: true,
          sticky: true,
          momentumBounceRatio: 0.05,
          momentumRatio: 0.05,
          momentumVelocityRatio: 3,
        },
        mousewheel: {
          forceToAxis: true,
        },
        watchSlidesProgress: true,
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: nextArrow[index],
          prevEl: prevArrow[index],
        },
        pagination: {
          el: pagination[index],
          type: "bullets",
          clickable: true,
        },
        breakpoints: {
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 3,
            spaceBetween: 54,
          },
          // when window width is >= 1280px
          1280: {
            slidesPerView: 3,
            spaceBetween: 54,
          },
        },
      })
    })
  }
}

const samsungGallery = () => {
  Fancybox.bind(".samsung-gallery-item", {
    groupAll: true,
  })
}

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('.samsung-nav .samsung-nav__link')

  if (links.length > 0) {
    links.forEach(link => link.addEventListener("click", clickHandler))
  }

  function clickHandler(e) {
    let target = document.querySelector(this.getAttribute("href"))
    if (!target) return
    e.preventDefault()
    target.scrollIntoView({ behavior: 'smooth' })
  }

  samsungVideoSlider()
  samsungGallery()
})
