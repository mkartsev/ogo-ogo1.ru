
import delivery  from "./delivery/delivery.js"
import preview   from "./preview/preview.js"
import questions from "./questions/questions.js"
import review    from "./reviews/reviews.js"
import slider    from "./slider/slider.js"

const product = (() => {
  function init() {
    delivery.init()
    preview.init()
    questions.init()
    review.init()
    slider.init()
  }

  return {
    init: init
  }
})()

export default product
