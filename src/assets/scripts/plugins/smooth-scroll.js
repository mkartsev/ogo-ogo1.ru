const smoothScroll = (() => {

  function init() {
    document.addEventListener("click", (e) => {
      let clickedEl = e.target.closest("[data-scroll-to]")

      if (clickedEl) {
        let targetId = clickedEl.getAttribute("href") || clickedEl.getAttribute("data-scroll-to")

        if (targetId) {
          const targetElement = document.querySelector(targetId)

          if (targetElement) {
            const topOffset = parseInt(clickedEl.getAttribute("data-scroll-offset"), 10) || 0
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - topOffset

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            })
          }
        }

        e.preventDefault()
      }
    })
  }

  return { init }
})()

export default smoothScroll