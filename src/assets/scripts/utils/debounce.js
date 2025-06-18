export const debounce = (func, delay) => {
  let timeout
  return function (...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), delay)
  }
}

// Пример:
// debounceBtn.addEventListener('click', debounce(function() {
//   console.info('Hey! It is', new Date().toUTCString())
// }, 3000))
// или
// window.addEventListener("scroll", debounce(handleScroll, 300))
