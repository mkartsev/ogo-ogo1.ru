document.addEventListener("DOMContentLoaded", function () {
  /** Каррируем любую функцию */
  function curry(func) {
    return function curried(...args) {
      if (args.length >= func.length) {
        return func.apply(this, args)
      }

      return function continueCurrying(...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }

  /** Промис для получения данных. Приправим его, чтобы использовать получение данных без обязательных аргументов
   * @param {String} method Метод отправки
   * @param {String} url Куда отправляем запрос
   * @param {Object} data Посылаем данные
   * @returns {Function} Промис возвращает resolve и reject
   */
  let getData = curry( (method, url, data) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      let contentType = data instanceof FormData ? "multipart/form-data" : "application/x-www-form-urlencoded"

      function readystatechange(event) {
        if (event.target.DONE !== event.target.readyState) {
          return
        }

        xhr.removeEventListener(event.type, readystatechange)

        if (event.target.status === 200) {
          let response, ctype = event.target.getResponseHeader("Content-Type")
          switch (ctype) {
            case "application/json":
            case "text/json":
              response = JSON.parse(event.target.responseText)
              break
              //case 'text/html':
              //  response = event.target.responseText
              //  break
            default:
              response = event.target.responseText
          }
          //resolve({ 'response': response }) // Можно и объект создать
          resolve(response)
        } else {
          reject(new Error(`${event.target.status} ${event.target.responseText}`))
        }
      }

      xhr.addEventListener("readystatechange", readystatechange, false)

      switch (method) {
        case "get":
        case "GET":
          xhr.open(method, data ? `${url}?${data}` : `${url}`, true)
          xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")

          // xhr.setRequestHeader("Access-Control-Allow-Credentials", "EXPOSE")
          // xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
          // xhr.setRequestHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT")
          // xhr.setRequestHeader("Access-Control-Max-Age", "1000")
          // xhr.setRequestHeader("Access-Control-Allow-Headers", "*")
          xhr.send()
          break

        case "post":
        case "POST":
          xhr.open(method, url, true)
          xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
          if (contentType !== "multipart/form-data") {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
          }
          xhr.send(data)
          break
      }
    })
  })

  /** Функция для проверки границ элемента за вьюпортом */
  const isOutOfViewport = function(elem) {
    let bounding = elem.getBoundingClientRect();
    let out = {};
    out.top = bounding.top < 0;
    out.left = bounding.left < 0;
    out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
    out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
    out.any = out.top || out.left || out.bottom || out.right;
    out.all = out.top && out.left && out.bottom && out.right;
    return out;
  };

  /** Проверяем пустой ли объект */
  const isObjectEmpty = (objectName) => {
    return (
        objectName &&
        Object.keys(objectName).length === 0 &&
        objectName.constructor === Object
    );
  };

  /** Получаем всех родителей у элемента */
  function getParents(el, parentSelector) {
    if (parentSelector === undefined) {
      parentSelector = document;
    }
    var parents = [];
    var p = el.parentNode;
    while (p !== parentSelector) {
      var o = p;
      parents.push(o);
      p = o.parentNode;
    }
    parents.push(parentSelector);
    return parents;
  }

  /** Делаем меню  */
  const menu = (function() {
    const ui = {
      header: '.header',
      catalog: '.catalog',
      sidebar: '.sidebar',
      toolbar: '.footer-toolbar',
      buttonCatalog: '.js-button-catalog',
      buttonSidebar: '.js-button-sidebar',
      categories: '.catalog-categories',
      subcategories: '.catalog-subcategories',
      compareCounter: '.js-compare-counter',
      favoriteCounter: '.js-favorite-counter',
    }

    const $header = document.querySelector(ui.header)
    const $catalog = document.querySelector(ui.catalog)
    const $sidebar = document.querySelector(ui.sidebar)
    const $toolbar = document.querySelector(ui.toolbar)
    const $buttonsCatalog = document.querySelectorAll(ui.buttonCatalog)
    const $buttonsSidebar = document.querySelectorAll(ui.buttonSidebar)
    const $compareCounters = document.querySelectorAll(ui.compareCounter)
    const $favoriteCounters = document.querySelectorAll(ui.favoriteCounter)

    const settings = {
      timeout: 900000, // [миллисекунды] - таймаут 15 минут для запросов каталога
      breakpoint: window.matchMedia('(max-width: 640px)'),
      url: $catalog.dataset.url
    }

    let state = {
      catalog: {},
      catalogTime: Number(localStorage.getItem('catalogTime')),
      catalogVisible: false,
      sidebarVisible: false,
      toolbarActive: document.querySelectorAll('.footer-toolbar__item.is-active'),
      isMobile: null
    }

    function checkBreakpoint(e) {
      state.isMobile = e.matches
    }

    const setMenuHeight = () => {
      const doc = document.documentElement
      let headerHeight = $header.offsetHeight
      let toolbarHeight = $toolbar.offsetHeight

      doc.style.setProperty('--catalog-height', `${window.innerHeight - headerHeight - toolbarHeight}px`)
      doc.style.setProperty('--catalog-top-offset', `${headerHeight}px`)
    }

    let catalogExpire = () => {
      return (state.catalogTime + settings.timeout) < Date.now()
    }

    let catalogInViewPort = () => {
      return isOutOfViewport($catalog).top
    }

    function renderList(data, item) {
      let list = document.createElement('ul')

      if (item) {
        list.setAttribute('data-name', item)
        list.dataset.name = item
      }

      data.forEach(el => {
        let item = document.createElement('li')
        let link = document.createElement('a')

        link.href = el.url
        link.innerHTML = el.item

        item.append(link)
        list.append(item)

        if (el.icon) {
          let icon = document.createElement('span')
          icon.classList.add('catalog-link__icon')
          icon.innerHTML = `<svg viewbox="0 0 24 24" focusable="false"><use xlink:href="#${el.icon}"></use></svg>`
          link.prepend(icon)
          link.classList.add('has-icon')
        }

        if (el.img) {
          let img = document.createElement('img')
          img.src = el.img
          img.classList.add('catalog-link__img')
          link.prepend(img)
          link.classList.add('has-img')
        }

        if (el.img_s) {
          let img = document.createElement('img')
          img.src = el.img_s
          img.classList.add('catalog-link__img-s')
          link.append(img)
          link.classList.add('has-img-s')
        }

        if (el.sub) {
          item.classList.add('has-child')
          item.append(renderList(el.sub, el.item))
        }
      })

      return list
    }

    function renderCategories(data) {
      const categories = document.createElement('div')
      const categoriesList = document.createElement('ul')

      categories.classList.add('catalog-categories')
      categoriesList.classList.add('catalog-categories__list')

      categories.append(categoriesList)

      data.forEach(el => {
        const item = document.createElement('li')
        const link = document.createElement('a')

        item.classList.add('catalog-categories__item')
        item.append(link)

        link.href = '#' + el.id
        link.textContent = el.item
        link.classList.add('catalog-categories__link')

        if (el.icon) {
          let icon = document.createElement('span')
          icon.classList.add('catalog-link__icon')
          icon.innerHTML = `<svg viewbox="0 0 24 24" focusable="false"><use xlink:href="#${el.icon}"></use></svg>`
          link.prepend(icon)
        }
        categoriesList.append(item)
      })

      return categories
    }

    function renderSubCategories(data) {
      const subCategories = document.createElement('div')
      subCategories.classList.add('catalog-subcategories')

      data.forEach(el => {
        const subCategory = document.createElement('div')
        subCategory.classList.add('catalog-subcategory')
        if (el.id) {
          subCategory.setAttribute('id', el.id)
        }
        subCategories.append(subCategory)
        if (el.sub) {
          subCategory.append(renderList(el.sub))
        }
      })

      return subCategories
    }

    function renderMenu(data) {
      if (state.isMobile === true) {
        let nav = document.createElement('nav')
        nav.classList.add('slide-menu')
        nav.id = 'slide-menu'
        $catalog.append(nav)
        nav.append(renderList(data))

        initSlideMenu()

        let rootCatalogList = document.querySelector('.slide-menu__slider > ul')
        rootCatalogList.setAttribute('data-name', 'Каталог')
        rootCatalogList.dataset.name = 'Каталог'

        let backLinks = document.querySelectorAll('.slide-menu__slider .slide-menu__backlink')
        backLinks.forEach(el => {
          let realParent = getParents(el)[3];
          el.innerHTML = realParent.dataset.name
        })
      } else {
        $catalog.append(renderCategories(data))
        $catalog.append(renderSubCategories(data))
        initMenuAim()
      }
    }

    function hideCatalogActive() {
      $catalog.querySelectorAll('.is-active').forEach(el => el.classList.remove('is-active'))
    }

    function showFirstItem() {
      const firstCategory = document.querySelector('.catalog ul li')
      const firstSubCategory = document.querySelector('.catalog-subcategories .catalog-subcategory')

      firstCategory.querySelector('a').classList.add('is-active')
      firstSubCategory.classList.add('is-active')
    }

    const openCatalog = () => {
      if ( isObjectEmpty(state.catalog) || catalogExpire()) {
        $buttonsCatalog.forEach(el => el.classList.toggle('is-loading', !state.catalogVisible))
        getData('GET', settings.url, null)
            .then(
                response => {
                  $catalog.textContent = ''
                  const result = JSON.parse(response)
                  renderMenu(result.catalog)

                  state.catalog = result.catalog
                  state.catalogTime = Date.now()

                  localStorage.setItem('catalog', response);
                  localStorage.setItem('catalogTime', Date.now());

                  openCatalog()
                },
                error => {
                  console.log("Данные каталога не получены: " + error)
                }
            )
            .catch(
                error => {
                  console.log(error)
                }
            )
            .finally(
                () => {
                  $buttonsCatalog.forEach(el => el.classList.remove('is-loading'))
                }
            )
      } else {
        state.catalogVisible = true
        $catalog.classList.add('is-active')
        $buttonsCatalog.forEach(el => {
          el.classList.add('is-active')
          removeToolbarActive(el)
        })
        if (state.isMobile) {
          $header.classList.add('is-sticky')
          addBodyOverflow()
        } else {
          showFirstItem()
        }
      }
    }

    const closeCatalog = () => {
      state.catalogVisible = false
      $catalog.classList.remove('is-active')
      $buttonsCatalog.forEach(el => {
        el.classList.remove('is-active')
        restoreToolbarActive(el)
      })
      if (state.isMobile) {
        $header.classList.remove('is-sticky')
        removeBodyOverflow()
      } else {
        hideCatalogActive()
      }
    }

    const openSidebar = () => {
      window.sidebar.open()
      $header.classList.add('is-sticky')
      $sidebar.classList.add('is-active')
      $buttonsSidebar.forEach(el => {
        el.classList.add('is-active')
        removeToolbarActive(el)
      })
      addBodyOverflow()
      state.sidebarVisible = true
    }

    const closeSidebar = () => {
      window.sidebar.close()
      $header.classList.remove('is-sticky')
      $sidebar.classList.remove('is-active')
      $buttonsSidebar.forEach(el => {
        el.classList.remove('is-active')
        restoreToolbarActive(el)
      })
      removeBodyOverflow()
      state.sidebarVisible = false
    }

    function removeToolbarActive(el) {
      const toolbarItems = document.querySelectorAll('.footer-toolbar__item')
      toolbarItems.forEach(item => {
        if (item !== el) {
          item.classList.remove('is-active');
        }
      });
    }

    function restoreToolbarActive() {
      state.toolbarActive.forEach(item => {
        item.classList.add('is-active');
      })
    }

    function addBodyOverflow() {
      document.querySelector('body').style.overflow = 'hidden'
    }

    function removeBodyOverflow() {
      document.querySelector('body').style.removeProperty('overflow')
    }

    function initSlideMenu() {
      const menuElement = document.getElementById('slide-menu');
      const menu = new SlideMenu(menuElement);

      function setSlideMenuHeight() {
        let activeElements = menuElement.getElementsByClassName('slide-menu__submenu--active')
        let currentElement = activeElements[activeElements.length - 1]

        if (currentElement instanceof HTMLElement ) {
          let currentHeight = Math.round(currentElement.getBoundingClientRect().height);
          menuElement.style.height = currentHeight + 'px'
          menuElement.style.overflow = 'hidden'
        } else {
          menuElement.removeAttribute('style')
        }
      }

      menuElement.addEventListener('sm.forward', () => {
        menuElement.scrollTop = 0
      });
      menuElement.addEventListener('sm.forward-after', () => {
        setTimeout(function() {
          setSlideMenuHeight()
        }, 150)
      });
      menuElement.addEventListener('sm.back', () => {
        menuElement.scrollTop = 0
      });
      menuElement.addEventListener('sm.back-after', () => {
        setTimeout(function() {
          setSlideMenuHeight()
        }, 150)
      });
    }

    function initSidebarMenu() {
      const sidebarElement = $sidebar;
      const sidebar = new SlideMenu(sidebarElement, {
        position: 'left',
        showBackLink: false
      });
      window.sidebar = sidebar
    }

    function initMenuAim() {
      $('.catalog-categories__list').menuAim({
        submenuDirection: "right",
        activate: function(row) {
          let target = $(row).children().attr('href')

          $('.catalog-categories__list .is-active').removeClass('is-active')
          $('.catalog-subcategories .is-active').removeClass('is-active')

          $(row).children().on('click', function(e) {
            e.preventDefault()
          })
          $(target).addClass('is-active')
          $(row).children().addClass('is-active')

          $(target).scrollTop = 0
        },
        deactivate: function(row) {
          let target = $(row).children().attr('href')
          $(target).removeClass('is-active')
          $(row).children().removeClass('is-active')
        },
        // exitMenu: function() {
        //   $('.catalog').find('.is-active').removeClass('is-active')
        //   return true
        // }
      })
    }

    function updateCounters() {
      $compareCounters.forEach(el => {
        el.classList.toggle('hidden', window.CompareIDList.length === 0)
        el.textContent = window.CompareIDList.length
      })
      $favoriteCounters.forEach(el => {
        el.classList.toggle('hidden', window.FavoriteIDList.length === 0)
        el.textContent = window.FavoriteIDList.length
      })
    }

    function loadSave() {
      let save = localStorage.getItem('catalog')
      if (save && !catalogExpire()) {
        state.catalog = JSON.parse(save).catalog
        renderMenu(state.catalog)
      }
    }

    function bindHandlers() {
      settings.breakpoint.onchange = (e) => {
        checkBreakpoint(e)
        if (state.isMobile && state.catalogVisible) {
          addBodyOverflow()
        }
        if (!state.isMobile) {
          $header.classList.remove('is-sticky')
          closeSidebar()
          removeBodyOverflow()
        }
        // Когда-нибудь придет время для replaceChildren()
        if (!isObjectEmpty(state.catalog)) {
          $catalog.textContent = ''
          renderMenu(state.catalog)
          if (!state.isMobile) {
            showFirstItem()
          }
        }
      }

      window.addEventListener('click', (e) => {
        const target = e.target

        if (!target.closest(ui.catalog) && !target.closest(ui.buttonCatalog) && !target.closest('.form-searchbox') && !target.closest('.header-logo') && !target.closest('.header-toolbar__item') && state.catalogVisible == true) {
          closeCatalog()
        }

        if (!target.closest(ui.sidebar) && !target.closest(ui.buttonSidebar) && !target.closest('.form-searchbox') && !target.closest('.header-logo') && !target.closest('.header-toolbar__item') && state.sidebarVisible == true) {
          closeSidebar()
        }

        if (target.classList.contains('js-add-product_to-list') ) {
          updateCounters()
        }

        if (target.closest(ui.buttonCatalog)) {
          state.catalogVisible ? closeCatalog() : openCatalog()
        }

        if (target.closest(ui.buttonSidebar)) {
          state.sidebarVisible ? closeSidebar() : openSidebar()
        }

        if (target.closest('.sidebar-menu__close')) {
          closeSidebar()
        }
      })

      window.addEventListener('resize', setMenuHeight)
    }

    function init() {
      checkBreakpoint(settings.breakpoint)
      setMenuHeight()
      loadSave()
      updateCounters()
      initSidebarMenu()
      bindHandlers()
    }

    return {
      openCatalog: openCatalog,
      openSidebar: openSidebar,
      closeCatalog: closeCatalog,
      closeSidebar: closeSidebar,
      init: init
    }
  })()

  menu.init()

  window.menu = menu
})
