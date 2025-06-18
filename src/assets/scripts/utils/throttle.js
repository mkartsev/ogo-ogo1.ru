export const throttle = (func, delay) => {
  let timeout
  return function (...args) {
    const context = this
    if (!timeout) {
      func.apply(context, args)
      timeout = true
      setTimeout(() => (timeout = false), delay)
    }
  }
}

// Пример:
// throttleBtn.addEventListener('click', throttle(function() {
//   return console.log('Hey! It is', new Date().toUTCString())
// }, 1000))
// или
// window.addEventListener("scroll", throttle(handleScrollPage, 100))

// Вариант throttle, который не упускает последнее срабатывание события
export const throttleComplete = (func, delay) => {
  let lastFunc
  let lastRan
  return function (...args) {
    const context = this
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= delay) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, delay - (Date.now() - lastRan))
    }
  }
}
