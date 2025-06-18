const sliderFilter = (() => {
  const ui = {
    selector: ".js-slider-filter",
    filterAttr: "data-filter",
    sliderIdAttr: "data-slider-id",
    slideSectionAttr: "data-section",
    activeClass: "is-active"
  }

  function filterSlides(swiper, filterValue) {
    swiper.slides.forEach(slide => {
      const slideSection = slide.getAttribute(ui.slideSectionAttr)
      slide.style.display = (filterValue === "all" || slideSection === filterValue) ? "" : "none"
    })

    swiper.update()
    swiper.pagination.update()
  }

  function updateActiveClass(container, activeButton) {
    container.querySelectorAll(`[${ui.filterAttr}]`).forEach(button => {
      button.classList.remove(ui.activeClass)
    })
    activeButton.classList.add(ui.activeClass)
  }

  function init() {
    document.addEventListener("click", (e) => {
      const filterButton = e.target.closest(`${ui.selector} [${ui.filterAttr}]`)
      if (!filterButton) return

      const filterContainer = filterButton.closest(ui.selector)
      if (!filterContainer) return

      if (filterButton.classList.contains(ui.activeClass)) return

      e.preventDefault()

      const sliderId = filterContainer.getAttribute(ui.sliderIdAttr)
      const slider = document.getElementById(sliderId)

      if (!slider || !slider.swiper) {
        console.warn(`Слайдер с айди "${sliderId}" не найден или на нем нет свайпера`)
        return
      }

      const swiper = slider.swiper
      const filterValue = filterButton.getAttribute(ui.filterAttr)

      filterSlides(swiper, filterValue)
      updateActiveClass(filterContainer, filterButton)
    })
  }

  return { init }
})()

export default sliderFilter