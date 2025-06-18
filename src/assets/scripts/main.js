import autoComplete from "@tarekraafat/autocomplete.js"
import { Fancybox } from "@fancyapps/ui"
import Swiper from "swiper/bundle"
import tippy from "tippy.js"

import smoothScroll from "@scripts/plugins/smooth-scroll.js"

// import preloader from "@components/preloader/preloader.js"
import accordion from "@components/accordion/accordion.js"
import adult from "@components/adult/adult.js"
import brandsSlider from "@components/brands-slider/brands-slider.js"
import cart from "@components/cart/cart.js"
import catalog, { catalogAccordion } from "@components/catalog/catalog.js"
import changeCity from "@components/change-city/change-city.js"
import checkout from "@components/checkout/checkout.js"
import compare from "@components/compare/compare.js"
import configurator from "@components/configurator/configurator.js"
import counters from "@components/counters/counters.js"
import events from "@components/events/events.js"
import fields from "@components/fields/fields.js"
import filters from "@components/filters/filters.js"
import footer from "@components/footer/footer.js"
import forms from "@components/forms/forms.js"
import header from "@components/header/header.js"
import heroSlider from "@components/hero-slider/hero-slider.js"
import inputMask from "@components/input-mask/input-mask.js"
import listing from "@components/listing/listing.js"
import mainBanners from "@components/main-banners/main-banners.js"
import maps from "@components/maps/maps.js"
import newsSlider from "@components/news-slider/news-slider.js"
import photoSlider from "@components/photo-slider/photo-slider.js"
import pickupMap from "@components/pickup-map/pickup-map.js"
import popup from "@components/popup/popup.js"
import product from "@components/product/product.js"
import productsSlider from "@components/products-slider/products-slider.js"
import selectCity from "@components/select-city/select-city.js"
import shopGallery from "@components/shop-gallery/shop-gallery.js"
import shopSlider from "@components/shop-slider/shop-slider.js"
import shopsMap from "@components/shops-map/shops-map.js"
import shopsSlider from "@components/shops-slider/shops-slider.js"
import shopThumbs from "@components/shop-thumbs/shop-thumbs.js"
import sidebar from "@components/sidebar/sidebar.js"
import sliderFilter from "@components/slider-filter/slider-filter.js"
import tooltip from "@components/tooltip/tooltip.js"
import userList from "@components/user-list/user-list.js"

const main = (() => {
  function onDOMContentLoaded() {
    // preloader // Инстанс прелоадера создается в компоненте и импортируется в нужные модули, его не нужно запускать
    accordion.init({ speed: 250, single: false })
    adult.init()
    brandsSlider.init()
    cart.init()
    catalog.init()
    catalogAccordion.init()
    changeCity.init()
    checkout.init()
    compare.init()
    configurator.init()
    counters()
    events.init()
    fields.init()
    filters.init()
    footer.init()
    forms.init()
    header.init()
    heroSlider.init()
    inputMask.init()
    listing.init()
    mainBanners.init()
    maps.init()
    newsSlider.init()
    photoSlider.init()
    pickupMap.init()
    popup.init()
    product.init()
    productsSlider.init() // Слайдер карточек
    selectCity.init()
    shopGallery.init()
    shopSlider.init()
    shopsMap.init()
    shopsSlider.init()
    shopThumbs.init()
    sidebar.init()
    sliderFilter.init()
    smoothScroll.init()
    tooltip.init()
    userList.init() // <- тут еще текст в тултипы устанавливается, так что надо после тултипов запускать
  }

  function init() {
    // Устанавливаем глобальные
    window.accordion = accordion
    window.autoComplete = autoComplete // используется в аппе чекаута
    window.cart = cart
    window.Fancybox = Fancybox
    window.popup = popup
    window.Swiper = Swiper
    window.tippy = tippy
    window.tooltip = tooltip
    window.userList = userList

    if (document.readyState === "loading") {
      // Если DOM ещё не загружен, добавляем слушатель события
      document.addEventListener("DOMContentLoaded", onDOMContentLoaded)
    } else {
      // Если DOM уже загружен, выполняем код немедленно
      onDOMContentLoaded()
    }
  }

  return {
    init: init
  }
})()

export default main
