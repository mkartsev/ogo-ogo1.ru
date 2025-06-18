import $ from "jquery"

const maps = (() => {
  let $context   = $(".ymap")
  let $mapHolder = $(".ymap__map", $context)
  let $marks     = $(".ymap__point", $context)
  let map
  let placemarks = new Set()

  // Шаблонизация https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Template-docpage
  const defaultBalloonTemplate = `
    <div class="ymap__balloon-inner">
      <div class="ymap__balloon-header">
        <div class="ymap__balloon-title">{{properties.title|raw}}</div>
        <div class="ymap__balloon-close"><svg class="svg-icon"><use xlink:href="/assets/img/sprites/sprite.svg#ui--cross"></use></svg></div>
      </div>
      <div class="ymap__balloon-content">
        <div class="ymap__balloon-address">{{properties.address|raw}}</div>
        <div class="ymap__balloon-description">{{properties.description|raw}}</div>
        <div class="ymap__balloon-pickup">{{properties.pickup|raw}}</div>
        <div class="ymap__balloon-phone"><a href="tel:{{properties.phone|raw}}" class="text-decoration-underline">{{properties.phone|raw}}</a></div>
        <div class="ymap__balloon-hours">{{properties.hours|raw}}</div>
        {% if !properties.details %}
          <a href="{{properties.link|raw}}" class="ymap__balloon-details btn btn-primary">Подробнее</a>
        {% endif %}
      </div>
    </div>`

  const defaultLayoutTemplate = `
    <div class="ymap__balloon-outer">
      <div class="ymap__balloon-outer-holder">$[[options.contentLayout]]</div>
    </div>`

  const defaultMarkTemplate = `
    <div class="ymap__placemark">
      <div class="ymap__placemark-round"></div>
      <div class="ymap__placemark-text">{{ properties.iconContent }}</div>
    </div>`

  function createMap() {
    map = new ymaps.Map($mapHolder.get(0), {
      center: $mapHolder.data("center").split(","),
      zoom: 15,
      controls: ["default"],
    })

    let eventManager = new ymaps.event.Manager()

    eventManager.add("click", (event) => {
      console.log(event)
    }, map.container)
  }

  function setPlacemark(mark) {
    let icon = "/assets/img/map_shop_label.png"
    let hint = "Гипермаркет ОГО!"
    let icon_size = [81, 53]

    // Создаем новый плейсмарк
    let placemark = new ymaps.Placemark(
      [parseFloat(mark.coords[0]), parseFloat(mark.coords[1])],
      $.extend(
        {
          hintContent: hint,
          title: mark.title,
          address: mark.address,
          description: mark.description,
          phone: mark.phone,
          hours: mark.hours,
          link: mark.link,
          iconContent: mark.type,
          details: mark.details,
          type: mark.type,
          metro: mark.metro,
          pickup: mark.pickup,
        },
        mark.data
      ),
      {
        iconLayout: "default#image",
        iconImageHref: icon,
        iconImageSize: icon_size,
        iconShape: {
          type: "Rectangle",
          coordinates: [
            [0, -46],
            [178, 0],
          ],
        },
        hideIconOnBalloonOpen: true,
        balloonShadow: false,
        balloonContentLayout: balloonInnerTemplating(mark.balloonTemplate),
        balloonLayout: balloonLayoutTemplating(mark.balloonLayout, mark.buildCallback),
        balloonPanelMaxMapArea: 0,
      }
    )

    placemark.key = mark.key

    // Проверяем, есть ли уже плейсмарк с таким ключом
    for (let existingPlacemark of placemarks) {
      if (existingPlacemark.key === mark.key) {
        // Если есть, удаляем старый плейсмарк
        placemarks.delete(existingPlacemark)
        map.geoObjects.remove(existingPlacemark)
        break
      }
    }

    // Добавляем новый плейсмарк
    placemarks.add(placemark)
    map.geoObjects.add(placemark)

    // Сразу показываем первый баллун
    if (placemarks.size <= 1) {
      placemark.balloon.open()
    }
  }

  function resetPlacemarks() {
    for (let placemark of placemarks) {
      map.geoObjects.remove(placemark)
    }
    placemarks.clear()
  }

  function showFirstPlacemark() {
    console.log("show first")

    // console.log(map.container.getSize())

    // map.container.addEventListener("sizechange", () => {
    //   console.log("test")
    // })

    // map.container._isNullSize
  }

  function defaultPlacemarking($marks) {
    $marks.each(function () {
      let $this = $(this)

      setPlacemark({
        title: $(".ymap__point-title", $this).html(),
        address: $(".ymap__point-address", $this).html(),
        description: $(".ymap__point-description", $this).html(),
        phone: $(".ymap__point-phone", $this).html(),
        hours: $(".ymap__point-hours", $this).html(),
        type: $(".ymap__point-type", $this).html(),
        coords: $this.data("coords").split(","),
        details: $this.data("no-detail") !== undefined,
        link: $this.data("link") || "/",
        key: $this.data("coords"),
      })
    })
  }

  function mappingInit() {
    if (map) {
      return // Если карта уже инициализирована, выходим из функции
    }

    // Обновляем $context перед инициализацией
    $context   = $(".ymap")
    $mapHolder = $(".ymap__map", $context)
    $marks     = $(".ymap__point", $context)

    if ($context.length > 0) {
      createMap()
      if ($marks.length > 0) defaultPlacemarking($marks)
      bindHandlers()
      $context.triggerHandler("mapReady.block")
    }
  }

  // Шаблонизаторы
  function balloonInnerTemplating(balloonTemplate) {
    let _balloonTemplate = balloonTemplate || defaultBalloonTemplate
    return ymaps.templateLayoutFactory.createClass(_balloonTemplate)
  }

  function markTemplateing(markTemplate) {
    let _markTemplate = markTemplate || defaultMarkTemplate
    return ymaps.templateLayoutFactory.createClass(_markTemplate)
  }

  function balloonLayoutTemplating(layoutTemplate, buildCallback) {
    let _layoutTemplate = layoutTemplate || defaultLayoutTemplate

    let balloonHolder = ymaps.templateLayoutFactory.createClass(_layoutTemplate, {
      build: function () {
        this.constructor.superclass.build.call(this)

        this._$element = $(".ymap__balloon-outer", this.getParentElement())

        if (buildCallback !== undefined) buildCallback.apply(this)

        this.applyElementOffset()

        this._$element.find(".ymap__balloon-close").on("click", $.proxy(this.onCloseClick, this))
      },

      clear: function () {
        $("body").off("click", this.closeOnBlur)
        this.constructor.superclass.clear.call(this)
      },

      onSublayoutSizeChange: function () {
        MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments)

        if (!this._isElement(this._$element)) {
          return
        }

        this.applyElementOffset()
        this.events.fire("shapechange")
      },

      applyElementOffset: function () {
        this._$element.css({
          left: -(this._$element[0].offsetWidth / 2),
          top: -this._$element[0].offsetHeight,
        })
      },

      getShape: function () {
        if (!this._isElement(this._$element)) {
          return MyBalloonLayout.superclass.getShape.call(this)
        }

        let position = this._$element.position()

        return new ymaps.shape.Rectangle(
          new ymaps.geometry.pixel.Rectangle([
            [position.left, position.top],
            [position.left + this._$element[0].offsetWidth, position.top + this._$element[0].offsetHeight],
          ])
        )
      },

      onCloseClick: function (e) {
        e.preventDefault()
        this.events.fire("userclose")
      },

      _isElement: function (element) {
        return element && element[0]
      },
    })

    return balloonHolder
  }

  function bindObservers() {
    const DOMobserver = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          const addedNodes = Array.from(mutation.addedNodes)
          const ymapFound = addedNodes.some((node) =>
            node.nodeType === 1 && (node.classList.contains("ymap") || node.querySelector(".ymap"))
          )

          // Если блок карты найден инициализируем карту
          if (ymapFound) {
            mappingInit()
            break
          }
        }
      }
    })

    DOMobserver.observe(document.body, { childList: true, subtree: true })
  }

  function bindHandlers() {
    $context.on("resize.block", function (event) {
      setTimeout(function () {
        if (map != undefined) map.container.fitToViewport(true)
      }, 200)
      event.stopPropagation()
    })

    $context.on("setPlacemark.block", function (event, mark) {
      setPlacemark(mark)
      event.stopPropagation()
    })

    $context.on("resetPlacemarks.block", function (event, mark) {
      resetPlacemarks()
      event.stopPropagation()
    })

    $context.on("setCenter.block", function (event, center, zoom, coordsKey) {
      map
        .setCenter(center, zoom, {
          duration: 500,
        })
        .then(
          () => {
            let placemark = null
            for (let mark of placemarks) {
              if (mark.key === coordsKey) {
                placemark = mark
                break
              }
            }
            if (placemark) {
              placemark.balloon.open()
            }
          },
          (error) => {
            console.log(error)
          }
        )
      event.stopPropagation()
    })

    $context.on("destroy.block", function (event) {
      if (map !== undefined) map.destroy()
      event.stopPropagation()
    })
  }

  function init() {
    bindObservers()

    if (window.ymapAPIready) {
      mappingInit()
    } else {
      $(document).on("ymapAPIready", mappingInit)
    }
  }

  return {
    init: init
  }
})()

export default maps