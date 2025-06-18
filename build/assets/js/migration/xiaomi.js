document.addEventListener('DOMContentLoaded', function() {
  const xiaomiReviewSlider = () => {
    let sliders = document.querySelectorAll(".xiaomi-review-slider"),
      prevArrow = document.querySelectorAll(".xiaomi-review-slider__prev"),
      nextArrow = document.querySelectorAll(".xiaomi-review-slider__next");

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
          breakpoints: {
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 35,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 35,
            },
          },
        });
      });
    }
  };

  xiaomiReviewSlider()
});


