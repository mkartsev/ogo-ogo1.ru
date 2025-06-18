import $ from "jquery"

const pickupMap = (() => {
  let $context = $(".pickup-map")
  let $map = $(".ymap")
  let isInitialized = false

  function fillMap() {
    // Обновляем контекст, тк карты изначально может не быть на странице
    $context = $(".pickup-map")
    $map = $(".ymap")

    const $points = $(".pickup-map__point", $context)
    $map.trigger("resetPlacemarks.block")

    $points.each(function () {
      const $point = $(this)
      setTimeout(function () {
        $map.trigger("setPlacemark.block", [{
          key: $point.data("coords"),
          coords: $point.data("coords").split(","),
          title: $(".ymap__balloon-title", $point).html(),
          address: $(".ymap__balloon-address", $point).html(),
          metro: $(".ymap__balloon-metro", $point).html(),
          pickup: `<b>${$(".ymap__balloon-pickup", $point).html()}</b>, ${$(".ymap__balloon-price", $point).html()}`,
          price: $(".ymap__balloon-price", $point).html(),
          hours: $(".ymap__balloon-hours", $point).html(),
          details: false,
          balloonTemplate: `
            <div class="ymap__balloon-inner">
              <div class="ymap__balloon-header">
                <div class="ymap__balloon-title">{{properties.title|raw}}</div>
                <div class="ymap__balloon-close">
                  <svg class="svg-icon"><use xlink:href="/assets/img/sprites/sprite.svg#ui--cross"></use></svg>
                </div>
              </div>
              <div class="ymap__balloon-content">
                <div class="ymap__balloon-address">{{properties.address|raw}}</div>
                {% if properties.metro !== undefined %}
                <div class="ymap__balloon-metro">{{properties.metro|raw}}</div>
                {% endif %}
                <div class="ymap__balloon-pickup">Можно забрать {{properties.pickup|raw}}</div>
                <div class="ymap__balloon-hours">{{properties.hours|raw}}</div>
              </div>
            </div>`,
        }])
      }, 300)
    })

    // Привязываем обработчик событий для новых точек
    bindHandlers()

    isInitialized = true
  }

  function showPoint(event) {
    const thisCoordsString = $(this).data("coords")
    $map.trigger("setCenter.block", [thisCoordsString.split(","), 15, thisCoordsString])
    event.preventDefault()
  }

  function updateMap() {
    // Обновляем контекст, элементов карты изначально может не быть на странице
    $context = $(".pickup-map")
    $map = $(".ymap")

    if ($context.length > 0 && $map.length > 0) {
      fillMap()
      // bindHandlers()
    }
  }


  function bindHandlers() {
    $map.on("mapReady.block", fillMap)
    $context.on("click", ".pickup-map__point", showPoint)
  }

  function bindObservers() {
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          const addedNodes = Array.from(mutation.addedNodes)
          const ymapFound = addedNodes.some((node) =>
            node.nodeType === 1 && (node.classList.contains("pickup-map") || node.querySelector(".pickup-map"))
          )

          if (ymapFound && !isInitialized) {
            updateMap()
            bindHandlers()
            isInitialized = true
            break
          }
        }
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })
  }

  function init() {
    bindObservers()
    // bindHandlers()
  }

  return {
    init: init,
  }
})()

export default pickupMap
