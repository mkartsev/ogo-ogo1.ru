// Слайдер обзоров
const xiaomiReviewSlider = () => {
  let sliders = document.querySelectorAll(".xiaomi-review-slider"),
    prevArrow = document.querySelectorAll(".xiaomi-review-slider__prev"),
    nextArrow = document.querySelectorAll(".xiaomi-review-slider__next")

  if (sliders.length > 0) {
    sliders.forEach((el, index) => {
      const swiper = new Swiper(el, {
        loop: true,
        freeMode: {
          enabled: true,
          sticky: true,
          momentumBounceRatio: 0.05,
          momentumRatio: 0.05,
          momentumVelocityRatio: 3
        },
        mousewheel: {
          forceToAxis: true
        },
        watchSlidesProgress: true,
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: nextArrow[index],
          prevEl: prevArrow[index]
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 24
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 35
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 35
          }
        }
      })
    })
  }
}

// Слайдер видео
const xiaomiVideoSlider = () => {
  let sliders = document.querySelectorAll(".xiaomi-video-slider"),
    prevArrow = document.querySelectorAll(".xiaomi-video-slider__prev"),
    nextArrow = document.querySelectorAll(".xiaomi-video-slider__next")

  if (sliders.length > 0) {
    sliders.forEach((el, index) => {
      const swiper = new Swiper(el, {
        loop: true,
        freeMode: {
          enabled: true,
          sticky: true,
          momentumBounceRatio: 0.05,
          momentumRatio: 0.05,
          momentumVelocityRatio: 3
        },
        mousewheel: {
          forceToAxis: true
        },
        watchSlidesProgress: true,
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: nextArrow[index],
          prevEl: prevArrow[index]
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 35
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 35
          },
        },
      })
    })
  }
}

// Галерея видео
const xiaomiGallery = () => {
  Fancybox.bind(".xiaomi-gallery-item", {
    groupAll: true
  })
}

document.addEventListener("DOMContentLoaded", function () {
  $(".tabs-nav li:first-child").addClass("active")
  $(".tab-content").hide()
  $(".tab-content:first").show()
  $(".tabs-nav li").on("click", function () {
    $(".tabs-nav li").removeClass("active")
    $(this).addClass("active")
    $(".tab-content").hide()
    var activeTab = $(this).find("a").attr("href")
    $(activeTab).fadeIn()
    return false
  })

  xiaomiReviewSlider()
  xiaomiVideoSlider()
  xiaomiGallery()
})
