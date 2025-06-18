const shopsMap = (() => {
  function init() {
    var $map     = $(".ymap")
    var $context = $(".shops-map")
    var $shops   = $(".shops-map__item", $context)
    var $cities  = $(".shops-map__city", $context)

    function fillMap() {
      $map.trigger("resetPlacemarks.block")
      $shops.each(function () {
        var $shop = $(this)
        setTimeout(function () {
          $map.trigger("setPlacemark.block", [
            {
              key: $shop.data("coords"),
              coords: $shop.data("coords").split(","),
              title: $(".ymap__balloon-title", $shop).html(),
              address: $(".ymap__balloon-address", $shop).html(),
              description: $(".ymap__balloon-description", $shop).html(),
              pickup: $(".ymap__balloon-pickup", $shop).html(),
              phone: $(".ymap__balloon-phone", $shop).html(),
              hours: $(".ymap__balloon-hours", $shop).html(),
              link: $shop.data("link"),
              type: $shop.closest(".b-shops-list__group").find(".b-shops-list__group-name").data("map-title"),
            },
          ])
        }, 300)
      })
    }

    function showShop() {
      var thisCoordsString = $(this).data("coords")
      $map.trigger("setCenter.block", [thisCoordsString.split(","), 14, thisCoordsString])
      return false
    }

    function showCity() {
      var thisCoordsString = $(this).data("coords")
      $map.trigger("setCenter.block", [thisCoordsString.split(","), 12, thisCoordsString])
      return false
    }

    $shops.on("click", showShop)
    $cities.on("click", showCity)

    $map.on("mapReady.block", fillMap)
  }

  return {
    init: init,
  }
})()

export default shopsMap
