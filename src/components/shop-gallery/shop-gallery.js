import { Fancybox } from "@fancyapps/ui"
import { ru }       from "@scripts/plugins/fancybox.ru.js"

const shopGallery = (() => {
  function init() {
    Fancybox.bind(".js-shop-gallery a", {
      groupAll: true,
      l10n: ru,
      hideScrollbar: true,
      Thumbs: {
        type: "classic",
      },
      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ["thumbs", "close"],
        },
      },
    })
  }

  return {
    init: init
  }
})()

export default shopGallery