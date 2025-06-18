const breadcrumbs = `<nav class="breadcrumbs" id="breadcrumbs" aria-label="breadcrumb">
<ol class="breadcrumb" vocab="https://schema.org/" typeof="BreadcrumbList">
  <li class="breadcrumb-item" property="itemListElement" typeof="ListItem">
    <a href="/" property="item" typeof="WebPage"><span property="name">Главная</span></a>
    <meta property="position" content="1">
  </li>
  <li class="breadcrumb-item" property="itemListElement" typeof="ListItem">
    <a href="/listing.html" property="item" typeof="WebPage"><span property="name">Каталог</span></a>
    <meta property="position" content="2">
  </li>
  <li class="breadcrumb-item active" property="itemListElement" typeof="ListItem" aria-current="page">
    <span property="item" typeof="WebPage"><span property="name">Смартфоны</span></span>
    <meta property="position" content="3">
  </li>
</ol>
</nav>`

const controls = `<div class="listing-controls">
<nav class="listing-controls__pagination">
  <a class="listing-controls__pagination-item" href="${process.env.LISTING_URL}&PAGEN_1=2">
    <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--chevron-left-sm"></use></svg>
  </a>
  <a class="listing-controls__pagination-item" href="${process.env.LISTING_URL}&PAGEN_1=1">1</a>
  <a class="listing-controls__pagination-item" href="${process.env.LISTING_URL}&PAGEN_1=2">2</a>
  <span class="listing-controls__pagination-item is-active">3</span>
  <a class="listing-controls__pagination-item" href="${process.env.LISTING_URL}&PAGEN_1=4">4</a>
  <a class="listing-controls__pagination-item" href="${process.env.LISTING_URL}&PAGEN_1=5">5</a>
  <a class="listing-controls__pagination-item" href="${process.env.LISTING_URL}&PAGEN_1=4">
    <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--chevron-right-sm"></use></svg>
  </a>
</nav>
<div class="listing-controls__qty">
  <span class="listing-controls__qty-label">Выводить по:</span>
  <ul class="listing-controls__qty-list">
    <li class="listing-controls__qty-item"><a class="listing-controls__qty-link" href=${process.env.LISTING_URL}?PAGESIZE=45>45</a></li>
    <li class="listing-controls__qty-item"><a class="listing-controls__qty-link is-active" href=${process.env.LISTING_URL}?PAGESIZE=60>60</a></li>
  </ul>
</div>
<div class="listing-controls__sort">
  <span class="listing-controls__sort-label">Сортировать по:</span>
  <select class="listing-controls__sort-select" name="">
    <option value="${process.env.LISTING_URL}?SORT=POPULAR&ORDER=ASC">Релевантности</option>
    <option selected value="${process.env.LISTING_URL}?SORT=NEW&ORDER=DESC">Новизне</option>
    <option value="${process.env.LISTING_URL}?SORT=PRICE&ORDER=ASC">Цене (возрастание)</option>
    <option value="${process.env.LISTING_URL}?SORT=PRICE&ORDER=DESC">Цене (убывание)</option>
  </select>
</div>
<div class="listing-controls__view">
  <span class="listing-controls__view-label">Вид:</span>
  <button class="btn btn-sm listing-controls__view-button js-listing-view-control js-tooltip" type="button" data-view="list" data-tooltip-title="Список"></button>
  <button class="btn btn-sm listing-controls__view-button js-listing-view-control js-tooltip is-active" type="button" data-view="grid" data-tooltip-title="Сетка"></button>
</div>
<div class="listing-controls__filter">
  <button class="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-filters" aria-controls="offcanvas-filters">
    <svg class="svg-icon svg-icon--md"><use xlink:href="/assets/img/sprites/sprite.svg#ui--filter"></use></svg>
    <span class="d-none d-md-inline">Фильтр</span>
  </button>
</div>
</div>`

const filters = `<form class="form form-filters w-100 js-filters" id="form-filters" action="" method="GET" data-validate="false" data-ajax-submit="false" novalidate="">
<input type="hidden" name="q" value="Lorem ipsum - результаты поиска в онлайн-гипермаркете ОГО!">
<input type="hidden" name="SECTION_CODE" value="">
<input type="hidden" name="PAGESIZE" value="45">
<input type="hidden" name="SORT" value="ID">
<input type="hidden" name="ORDER" value="DESC">
<input type="hidden" name="ONLY_AVAILABLE" value="">
<input type="hidden" name="EXACT_SEARCH" value="">
<input type="hidden" name="set_filter" value="Y">
<div class="p-3">
  <button class="btn btn btn-primary w-100 mb-2" type="submit">Показать результат<span class="js-count-btn">99</span></button>
  <a href="/market/test" class="btn btn btn-secondary w-100 js-clear-filter">Очистить фильтр</a>
</div>
<div class="filters js-accordion">
  <fieldset class="filters-group js-accordion-item is-active">
    <div class="filters-group__header js-accordion-header"><span class="filters-group__title">Цена</span></div>
    <div class="filters-group__body js-accordion-body">
      <div class="d-flex justify-content-between align-items-center">
        <div class="position-relative flex-fill">
          <input class="form-control text-end pe-5 js-input-numbers js-min" type="number" inputmode="numeric" name="arrFilter[PRICE][LEFT]" id="filters-price-min" value="2000" min="100" max="100000" pattern="[\\d.,]+" data-name="arrFilter[PRICE][LEFT]">
          <span class="position-absolute top-50 end-0 translate-middle-y input-group-text p-2 text-dark bg-transparent border-0">₽</span>
        </div>
        <span class="input-group-text px-1 text-dark bg-white border-0">—</span>
        <div class="position-relative flex-fill">
          <input class="form-control text-end pe-5 js-input-numbers js-max" type="number" inputmode="numeric" name="arrFilter[PRICE][RIGHT]" id="filters-price-max" value="50000" min="100" max="100000" pattern="[\\d.,]+" data-name="arrFilter[PRICE][RIGHT]">
          <span class="position-absolute top-50 end-0 translate-middle-y input-group-text p-2 text-dark bg-transparent border-0">₽</span>
        </div>
      </div>
      <div class="js-range-slider mt-4 mb-3 js-range-slider" data-range-min="filters-price-min" data-range-max="filters-price-max"></div>
    </div>
  </fieldset>
  <fieldset class="filters-group js-accordion-item is-active">
    <div class="filters-group__header js-accordion-header"><span class="filters-group__title">Диагональ</span></div>
    <div class="filters-group__body js-accordion-body">
      <div class="d-flex justify-content-between align-items-center">
        <div class="position-relative flex-fill">
          <input class="form-control text-end pe-5 js-input-numbers js-min" type="number" inputmode="numeric" name="arrFilter[DIAG][LEFT]" id="filters-diag-min" value="10.5" min="2" max="100" pattern="[\\d.,]+" data-name="arrFilter[DIAG][LEFT]">
          <span class="position-absolute top-50 end-0 translate-middle-y input-group-text p-2 text-dark bg-transparent border-0">″</span>
        </div>
        <span class="input-group-text px-1 text-dark bg-white border-0">—</span>
        <div class="position-relative flex-fill">
          <input class="form-control text-end pe-5 js-input-numbers js-max" type="number" inputmode="numeric" name="arrFilter[DIAG][RIGHT]" id="filters-diag-max" value="30.9" min="2" max="100" pattern="[\\d.,]+" data-name="arrFilter[DIAG][RIGHT]">
          <span class="position-absolute top-50 end-0 translate-middle-y input-group-text p-2 text-dark bg-transparent border-0">″</span>
        </div>
      </div>
      <div class="js-range-slider mt-4 mb-3 js-range-slider" data-range-min="filters-diag-min" data-range-max="filters-diag-max"></div>
    </div>
  </fieldset>
  <fieldset class="filters-group js-accordion-item is-active">
    <div class="filters-group__header js-accordion-header"><span class="filters-group__title">Диагональ</span></div>
    <div class="filters-group__body js-accordion-body">
      <div class="d-flex justify-content-between align-items-center">
        <div class="position-relative flex-fill">
          <input class="form-control text-end pe-5 js-input-numbers js-min" type="number" inputmode="numeric" name="arrFilter[WEIGHT][LEFT]" id="filters-weight-min" value="3.33" min="1" max="10" pattern="[\\d.,]+" data-name="arrFilter[WEIGHT][LEFT]">
          <span class="position-absolute top-50 end-0 translate-middle-y input-group-text p-2 text-dark bg-transparent border-0">кг.</span>
        </div>
        <span class="input-group-text px-1 text-dark bg-white border-0">—</span>
        <div class="position-relative flex-fill">
          <input class="form-control text-end pe-5 js-input-numbers js-max" type="number" inputmode="numeric" name="arrFilter[WEIGHT][RIGHT]" id="filters-weight-max" value="7.77" min="1" max="10" pattern="[\\d.,]+" data-name="arrFilter[WEIGHT][RIGHT]">
          <span class="position-absolute top-50 end-0 translate-middle-y input-group-text p-2 text-dark bg-transparent border-0">кг.</span>
        </div>
      </div>
      <div class="js-range-slider mt-4 mb-3 js-range-slider" data-range-min="filters-weight-min" data-range-max="filters-weight-max" data-step="0.01"></div>
    </div>
  </fieldset>
  <fieldset class="filters-group js-accordion-item is-active">
    <div class="filters-group__header js-accordion-header"><span class="filters-group__title">Показывать товары</span></div>
    <div class="filters-group__body js-accordion-body">
      <div class="field field--type-radio">
        <label class="field__label">
          <input type="radio" name="arrFilter[compatible][]" id="filters-input-1" value="true" checked="checked">
          <span class="field__check"></span>
          <span class="field__caption">Совместимые</span>
        </label>
      </div>
      <div class="field field--type-radio">
        <label class="field__label">
          <input type="radio" name="arrFilter[compatible][]" id="filters-input-2" value="false">
          <span class="field__check"></span>
          <span class="field__caption">Все</span>
        </label>
      </div>
    </div>
  </fieldset>
  <fieldset class="filters-group js-accordion-item">
    <div class="filters-group__header js-accordion-header"><span class="filters-group__title">Комплектующие для ПК</span></div>
    <div class="filters-group__body js-accordion-body">
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-3" value="">
          <span class="field__check"></span>
          <span class="field__caption">Блоки питания</span>
        </label>
      </div>
      <div class="field field--type-checkbox field--disabled">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-4" value="" disabled="disabled">
          <span class="field__check"></span>
          <span class="field__caption">Видеокарты</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-5" value="">
          <span class="field__check"></span>
          <span class="field__caption">Процессоры</span>
        </label>
      </div>
      <div class="field field--type-checkbox field--disabled">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-6" value="" disabled="disabled">
          <span class="field__check"></span>
          <span class="field__caption">Оперативная память</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-7" value="">
          <span class="field__check"></span>
          <span class="field__caption">Материнские платы</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-8" value="">
          <span class="field__check"></span>
          <span class="field__caption">Корпуса для компьютеров</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-9" value="">
          <span class="field__check"></span>
          <span class="field__caption">Аксессуары для корпусов</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-10" value="">
          <span class="field__check"></span>
          <span class="field__caption">Кулеры для процессоров</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-11" value="">
          <span class="field__check"></span>
          <span class="field__caption">Системы охлаждения компьютера</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-12" value="">
          <span class="field__check"></span>
          <span class="field__caption">Аксессуары для охлаждения ПК</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-13" value="">
          <span class="field__check"></span>
          <span class="field__caption">Жесткие диски</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-14" value="">
          <span class="field__check"></span>
          <span class="field__caption">SSD</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-15" value="">
          <span class="field__check"></span>
          <span class="field__caption">Звуковые карты</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-16" value="">
          <span class="field__check"></span>
          <span class="field__caption">Карты видеозахвата</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-17" value="">
          <span class="field__check"></span>
          <span class="field__caption">Wi-Fi адаптеры и карты</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-18" value="">
          <span class="field__check"></span>
          <span class="field__caption">Контроллеры</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-19" value="">
          <span class="field__check"></span>
          <span class="field__caption">Оптические приводы</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-20" value="">
          <span class="field__check"></span>
          <span class="field__caption">Кард-ридеры</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-21" value="">
          <span class="field__check"></span>
          <span class="field__caption">Салазки для HDD/SSD</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-22" value="">
          <span class="field__check"></span>
          <span class="field__caption">Салазки (Optibay)</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-23" value="">
          <span class="field__check"></span>
          <span class="field__caption">Термопаста</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-24" value="">
          <span class="field__check"></span>
          <span class="field__caption">Внутренние кабели для ПК</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-25" value="">
          <span class="field__check"></span>
          <span class="field__caption">Флоппи дисководы</span>
        </label>
      </div>
    </div>
  </fieldset>
  <fieldset class="filters-group js-accordion-item">
    <div class="filters-group__header js-accordion-header"><span class="filters-group__title">Настольные компьютеры</span></div>
    <div class="filters-group__body js-accordion-body">
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-26" value="">
          <span class="field__check"></span>
          <span class="field__caption">Настольные ПК</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-27" value="">
          <span class="field__check"></span>
          <span class="field__caption">Моноблоки</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-28" value="">
          <span class="field__check"></span>
          <span class="field__caption">Сборные платформы</span>
        </label>
      </div>
    </div>
  </fieldset>
  <fieldset class="filters-group js-accordion-item">
    <div class="filters-group__header js-accordion-header"><span class="filters-group__title">Ноутбуки</span></div>
    <div class="filters-group__body js-accordion-body">
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-29" value="">
          <span class="field__check"></span>
          <span class="field__caption">Ноутбуки</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-30" value="">
          <span class="field__check"></span>
          <span class="field__caption">Сумки для ноутбуков</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-31" value="">
          <span class="field__check"></span>
          <span class="field__caption">Охлаждающие подставки</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-32" value="">
          <span class="field__check"></span>
          <span class="field__caption">Столы для ноутбуков</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-33" value="">
          <span class="field__check"></span>
          <span class="field__caption">Оперативная память SO-DIMM</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-34" value="">
          <span class="field__check"></span>
          <span class="field__caption">SSD для ноутбуков</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-35" value="">
          <span class="field__check"></span>
          <span class="field__caption">Жесткие диски для ноутбуков</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-36" value="">
          <span class="field__check"></span>
          <span class="field__caption">Салазки (Optibay)</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-37" value="">
          <span class="field__check"></span>
          <span class="field__caption">Адаптеры питания</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-38" value="">
          <span class="field__check"></span>
          <span class="field__caption">Чистящие средства</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-39" value="">
          <span class="field__check"></span>
          <span class="field__caption">Другое</span>
        </label>
      </div>
    </div>
  </fieldset>
  <fieldset class="filters-group js-accordion-item">
    <div class="filters-group__header js-accordion-header"><span class="filters-group__title">Сетевое оборудование</span></div>
    <div class="filters-group__body js-accordion-body">
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-40" value="">
          <span class="field__check"></span>
          <span class="field__caption">Wi-Fi роутеры</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-41" value="">
          <span class="field__check"></span>
          <span class="field__caption">Точки доступа</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-42" value="">
          <span class="field__check"></span>
          <span class="field__caption">Powerline адаптеры</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-43" value="">
          <span class="field__check"></span>
          <span class="field__caption">Wi-Fi повторители</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-44" value="">
          <span class="field__check"></span>
          <span class="field__caption">Wi-Fi адаптеры</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-45" value="">
          <span class="field__check"></span>
          <span class="field__caption">Wi-Fi антенны</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-46" value="">
          <span class="field__check"></span>
          <span class="field__caption">Wi-Fi карты</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-47" value="">
          <span class="field__check"></span>
          <span class="field__caption">Сетевые карты</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-48" value="">
          <span class="field__check"></span>
          <span class="field__caption">Сетевые хранилища (NAS)</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-49" value="">
          <span class="field__check"></span>
          <span class="field__caption">3G/4G модемы и роутеры</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-50" value="">
          <span class="field__check"></span>
          <span class="field__caption">Коммутаторы (Свитчи)</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-51" value="">
          <span class="field__check"></span>
          <span class="field__caption">Проводные маршрутизаторы</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-52" value="">
          <span class="field__check"></span>
          <span class="field__caption">Патч-корды</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-53" value="">
          <span class="field__check"></span>
          <span class="field__caption">Сетевые кабели в бухтах</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-54" value="">
          <span class="field__check"></span>
          <span class="field__caption">Коннекторы</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-55" value="">
          <span class="field__check"></span>
          <span class="field__caption">Патч-панели и стойки</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-56" value="">
          <span class="field__check"></span>
          <span class="field__caption">Сетевые розетки</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-57" value="">
          <span class="field__check"></span>
          <span class="field__caption">Материалы для монтажа</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-58" value="">
          <span class="field__check"></span>
          <span class="field__caption">Инструменты для монтажа</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-59" value="">
          <span class="field__check"></span>
          <span class="field__caption">Трансиверы</span>
        </label>
      </div>
    </div>
  </fieldset>
  <fieldset class="filters-group js-accordion-item">
    <div class="filters-group__header js-accordion-header"><span class="filters-group__title">Программное обеспечение</span></div>
    <div class="filters-group__body js-accordion-body">
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-60" value="">
          <span class="field__check"></span>
          <span class="field__caption">Антивирусы</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-61" value="">
          <span class="field__check"></span>
          <span class="field__caption">Операционные системы</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-62" value="">
          <span class="field__check"></span>
          <span class="field__caption">Офисные пакеты</span>
        </label>
      </div>
    </div>
  </fieldset>
  <fieldset class="filters-group js-accordion-item">
    <div class="filters-group__header js-accordion-header"><span class="filters-group__title">Майнинг</span></div>
    <div class="filters-group__body js-accordion-body">
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-63" value="">
          <span class="field__check"></span>
          <span class="field__caption">Оборудование для майнинга</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-64" value="">
          <span class="field__check"></span>
          <span class="field__caption">Видеокарты для майнинга</span>
        </label>
      </div>
    </div>
  </fieldset>
  <fieldset class="filters-group js-accordion-item">
    <div class="filters-group__header js-accordion-header"><span class="filters-group__title">Серверное оборудование</span></div>
    <div class="filters-group__body js-accordion-body">
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-65" value="">
          <span class="field__check"></span>
          <span class="field__caption">Процессоры для серверов</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-66" value="">
          <span class="field__check"></span>
          <span class="field__caption">Серверные жесткие диски</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-67" value="">
          <span class="field__check"></span>
          <span class="field__caption">Корпуса</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-68" value="">
          <span class="field__check"></span>
          <span class="field__caption">Оперативная память для серверов</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-69" value="">
          <span class="field__check"></span>
          <span class="field__caption">Серверные платформы</span>
        </label>
      </div>
      <div class="field field--type-checkbox">
        <label class="field__label">
          <input type="checkbox" name="arrFilter[][]" id="filters-input-70" value="">
          <span class="field__check"></span>
          <span class="field__caption">Аксессуары серверов</span>
        </label>
      </div>
    </div>
  </fieldset>
</div>
<div class="p-3">
  <button class="btn btn btn-primary w-100 mb-2" type="submit">Показать результат<span class="js-count-btn'>99</span></button>
  <a href="/market/test" class="btn btn btn-secondary w-100 mb-2 js-clear-filter">Очистить фильтр</a>
  <a class="btn btn-outline-info w-100 fs-4 js-user-wish-popup" href="/ajax/new/productRequest.php">Здесь нет того, что мне нужно</a>
</div>
</form>`

const items = `
<div class="listing-grid listing-grid--view-grid" style="--columns: 3" id="listing-grid">
  <div class="product-card product-card--new">
    <div class="product-card__body">
      <div class="product-card__label product-card__label--new">Новинка</div>
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item is-active">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item is-active">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item is-active">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item is-active">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item is-active">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 389198</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/389198.jpg" alt="Ноутбук MSI Titan 18 HX A14VIG-211RU Core i9 14900HX/64Gb/3Tb SSD/NV RTX4090 16Gb/18&quot; UHD+/Win11 Black" loading="lazy">
        </a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="389198">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
        <div class="product-card__icons">
          <span class="product-card__icon product-card__icon--digital js-tooltip" data-tooltip-content="Товар можно оплатить картой прямо на сайте"></span>
          <span class="product-card__icon product-card__icon--discount">-1%</span>
          <span class="product-card__icon product-card__icon--gaming"></span>
          <span class="product-card__icon product-card__icon--express js-tooltip" data-tooltip-content="Доствка сегодня за 2 часа"></span>
          <span class="product-card__icon product-card__icon--delivery"></span>
          <span class="product-card__icon product-card__icon--gift"></span>
        </div>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success js-tooltip" data-tooltip-content="Динамо<br>Пл. Ильича">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          В наличии
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Titan 18 HX A14VIG-211RU Core i9 14900HX/64Gb/3Tb SSD/NV RTX4090 16Gb/18" UHD+/Win11 Black</a></div>
      <div class="product-card__badges">
        <span class="product-card__badge badge text-bg-primary js-tooltip" data-tooltip-title="Акция 3 по цене 2" data-tooltip-content="<a href='/news.html'>Подробный текст</a> про акцию!" data-tippy-interactive="true">
          <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--info-fill-sm"></use></svg>
          Ваш подарок
        </span>
        <span class="product-card__badge badge text-bg-primary js-tooltip" data-tooltip-content="Новый. Комплектация полная. Упаковка оригинальная. Повреждена упаковка">Красный</span>
        <span class="product-card__badge badge text-bg-success js-tooltip" data-tooltip-content="Был в использовании. Из ремонта (Замена компонентов). Комплектация полная. Упаковка отсутствует. Внешние повреждения: Царапина на корпусе. Не повреждена упаковка.">
          Зеленый
        </span>
        <span class="product-card__badge badge text-bg-warning js-tooltip" data-tooltip-content="Новый. Комплектация полная. Упаковка оригинальная. Не повреждена упаковка. Вскрыта упаковка в использовании не был.">Желтый</span>
        <span class="product-card__badge badge text-bg-info js-tooltip" data-tooltip-content="Новый. Комплектация полная. Упаковка оригинальная. Повреждена упаковка">Синий</span>
        <span class="product-card__badge badge text-bg-danger js-tooltip" data-tooltip-content="Был в использовании. Из ремонта (Замена компонентов). Комплектация полная. Упаковка отсутствует. Внешние повреждения: Царапина на корпусе. Не повреждена упаковка.">
          Красный
        </span>
        <span class="product-card__badge badge text-bg-purple js-tooltip" data-tooltip-content="Новый. Комплектация полная. Упаковка оригинальная. Не повреждена упаковка. Вскрыта упаковка в использовании не был.">Фиолетовый</span>
      </div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-new">620 220 ₽</div></div>
        <div class="product-card__old">
          <div class="product-card__price-old">630 220 ₽</div>
          <div class="product-card__price-note">Выгода 10 000₽</div>
        </div>
        <div class="product-card__bonus">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus-sm"></use></svg>
          1234 бонуса
        </div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="389198" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="389198" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="389198" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card product-card--hit">
    <div class="product-card__body">
      <div class="product-card__label product-card__label--hit">Хит продаж</div>
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item is-active">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item is-active">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item is-active">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item is-active">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item is-active">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 391062</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/391062.jpg" alt="Ноутбук MSI Creator 16 AI Studio A1VIG-060RU Core i9 185H/64Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; UHD+/Win11Pro Grey" loading="lazy">
        </a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="391062">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
        <div class="product-card__icons">
          <span class="product-card__icon product-card__icon--discount">-1%</span>
          <span class="product-card__icon product-card__icon--digital js-tooltip" data-tooltip-content="Товар можно оплатить картой прямо на сайте"></span>
          <span class="product-card__icon product-card__icon--gaming"></span>
        </div>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          Доступен
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Creator 16 AI Studio A1VIG-060RU Core i9 185H/64Gb/2Tb SSD/NV RTX4090 16Gb/16" UHD+/Win11Pro Grey</a></div>
      <div class="product-card__badges">
        <span class="product-card__badge badge text-bg-primary">Красный</span>
        <span class="product-card__badge badge text-bg-success">Зеленый</span>
        <span class="product-card__badge badge text-bg-warning">Желтый</span>
        <span class="product-card__badge badge text-bg-info">Синий</span>
        <span class="product-card__badge badge text-bg-danger">Красный</span>
        <span class="product-card__badge badge text-bg-purple">Фиолетовый</span>
      </div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-current">534 000 ₽</div></div>
        <div class="product-card__bonus">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus-sm"></use></svg>
          1234 бонуса
        </div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="391062" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="391062" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="391062" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card product-card--super">
    <div class="product-card__body">
      <div class="product-card__label product-card__label--super">Супер цена</div>
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 391065</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/391065.jpg" alt="Ноутбук MSI Stealth 16 AI Studio A1VIG-062RU Core i9 185H/32Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; UHD+/Win11 Dark Blue" loading="lazy">
        </a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="391065">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
        <div class="product-card__icons"><span class="product-card__icon product-card__icon--gaming"></span></div>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-dark">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--wrong-sm"></use></svg>
          Нет в наличии
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Stealth 16 AI Studio A1VIG-062RU Core i9 185H/32Gb/2Tb SSD/NV RTX4090 16Gb/16" UHD+/Win11 Dark Blue</a></div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="391065" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="391065" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 390124</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/390124.jpg" alt="Ноутбук MSI Raider GE68 HX 14VIG-473RU Core i9 14900HX/32Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; UHD/Win11 Black" loading="lazy">
        </a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="390124">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success js-tooltip" data-tooltip-content="Динамо<br>Пл. Ильича">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          В наличии
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Raider GE68 HX 14VIG-473RU Core i9 14900HX/32Gb/2Tb SSD/NV RTX4090 16Gb/16" UHD/Win11 Black</a></div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-current">429 460 ₽</div></div>
        <div class="product-card__bonus">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus-sm"></use></svg>
          1634 бонуса
        </div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="390124" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="390124" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="390124" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 387892</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/387892.jpg" alt="Ноутбук ASUS ROG Zephyrus Duo 16 GX650PY-NM085W AMD Ryzen 9 7945HX/32Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; WQXGA/Win11 Black" loading="lazy">
        </a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="387892">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success js-tooltip" data-tooltip-content="Динамо<br>Пл. Ильича">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          В наличии
        </span>
      </div>
      <div class="product-card__caption">
        <a class="product-card__title" href="/product.html" target="_blank">Ноутбук ASUS ROG Zephyrus Duo 16 GX650PY-NM085W AMD Ryzen 9 7945HX/32Gb/2Tb SSD/NV RTX4090 16Gb/16" WQXGA/Win11 Black</a>
      </div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-current">419 550 ₽</div></div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="387892" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="387892" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="387892" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 391065</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/391065.jpg" alt="Ноутбук MSI Stealth 16 AI Studio A1VIG-062RU Core i9 185H/32Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; UHD+/Win11 Dark Blue" loading="lazy">
        </a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="391065">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success js-tooltip" data-tooltip-content="Динамо<br>Пл. Ильича">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          В наличии
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Stealth 16 AI Studio A1VIG-062RU Core i9 185H/32Gb/2Tb SSD/NV RTX4090 16Gb/16" UHD+/Win11 Dark Blue</a></div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-current">457 700 ₽</div></div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="391065" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="391065" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="391065" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 390124</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/390124.jpg" alt="Ноутбук MSI Raider GE68 HX 14VIG-473RU Core i9 14900HX/32Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; UHD/Win11 Black" loading="lazy">
        </a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="390124">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success js-tooltip" data-tooltip-content="Динамо<br>Пл. Ильича">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          В наличии
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Raider GE68 HX 14VIG-473RU Core i9 14900HX/32Gb/2Tb SSD/NV RTX4090 16Gb/16" UHD/Win11 Black</a></div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-current">429 460 ₽</div></div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="390124" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="390124" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="390124" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 387892</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/387892.jpg" alt="Ноутбук ASUS ROG Zephyrus Duo 16 GX650PY-NM085W AMD Ryzen 9 7945HX/32Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; WQXGA/Win11 Black" loading="lazy">
        </a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="387892">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success js-tooltip" data-tooltip-content="Динамо<br>Пл. Ильича">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          В наличии
        </span>
      </div>
      <div class="product-card__caption">
        <a class="product-card__title" href="/product.html" target="_blank">Ноутбук ASUS ROG Zephyrus Duo 16 GX650PY-NM085W AMD Ryzen 9 7945HX/32Gb/2Tb SSD/NV RTX4090 16Gb/16" WQXGA/Win11 Black</a>
      </div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-current">419 550 ₽</div></div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="387892" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="387892" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="387892" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 388628</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/388628.jpg" alt="Смартфон Samsung Galaxy S24 Ultra SM-S928B 12/1Tb Titanium Yellow (EAC)" loading="lazy">
        </a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="388628">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success js-tooltip" data-tooltip-content="Динамо<br>Пл. Ильича">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          В наличии
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Смартфон Samsung Galaxy S24 Ultra SM-S928B 12/1Tb Titanium Yellow (EAC)</a></div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-new">167 990 ₽</div></div>
        <div class="product-card__old"><div class="product-card__price-old">177 990 ₽</div></div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="388628" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388628" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388628" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 388629</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/388629.jpg" alt="Смартфон Samsung Galaxy S24 Ultra SM-S928B 12/1Tb Titanium Violet (EAC)" loading="lazy">
        </a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="388629">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          Доступен
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Смартфон Samsung Galaxy S24 Ultra SM-S928B 12/1Tb Titanium Violet (EAC)</a></div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-current">167 990 ₽</div></div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="388629" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388629" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388629" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 388630</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/388630.jpg" alt="Смартфон Samsung Galaxy S24 Ultra SM-S928B 12/1Tb Titanium Gray (EAC)" loading="lazy">
        </a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="388630">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-dark">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--wrong-sm"></use></svg>
          Нет в наличии
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Смартфон Samsung Galaxy S24 Ultra SM-S928B 12/1Tb Titanium Gray (EAC)</a></div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388630" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388630" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 388631</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/388631.jpg" alt="Смартфон Samsung Galaxy S24 Ultra SM-S928B 12/1Tb Titanium Black (EAC)" loading="lazy">
        </a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="388631">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          Доступен
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Смартфон Samsung Galaxy S24 Ultra SM-S928B 12/1Tb Titanium Black (EAC)</a></div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-current">167 990 ₽</div></div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="388631" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388631" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388631" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 388620</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/388620.jpg" alt="Смартфон Samsung Galaxy S24 Ultra SM-S928B 12/256Gb Titanium Yellow (EAC)" loading="lazy">
        </a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="388620">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          Доступен
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Смартфон Samsung Galaxy S24 Ultra SM-S928B 12/256Gb Titanium Yellow (EAC)</a></div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-current">133 990 ₽</div></div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="388620" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388620" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388620" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 388622</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/388622.jpg" alt="Смартфон Samsung Galaxy S24 Ultra SM-S928B 12/256Gb Titanium Gray (EAC)" loading="lazy">
        </a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="388622">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          Доступен
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Смартфон Samsung Galaxy S24 Ultra SM-S928B 12/256Gb Titanium Gray (EAC)</a></div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-current">133 990 ₽</div></div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="388622" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388622" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388622" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 388621</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/388621.jpg" alt="Смартфон Samsung Galaxy S24 Ultra SM-S928B 12/256Gb Titanium Violet (EAC)" loading="lazy">
        </a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="388621">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          Доступен
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Смартфон Samsung Galaxy S24 Ultra SM-S928B 12/256Gb Titanium Violet (EAC)</a></div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-current">133 990 ₽</div></div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="388621" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388621" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388621" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 380273</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html"><img class="product-card__image" src="/assets/img/content/products/380273.jpg" alt="Смартфон Samsung Galaxy Z Flip 5 SM-F731B 8/512Gb Lavender (EAC)" loading="lazy"></a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="380273">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          Доступен
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Смартфон Samsung Galaxy Z Flip 5 SM-F731B 8/512Gb Lavender (EAC)</a></div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-current">98 990 ₽</div></div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="380273" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="380273" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="380273" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 380275</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html"><img class="product-card__image" src="/assets/img/content/products/380275.jpg" alt="Смартфон Samsung Galaxy Z Flip 5 SM-F731B 8/512Gb Beige (EAC)" loading="lazy"></a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="380275">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          Доступен
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Смартфон Samsung Galaxy Z Flip 5 SM-F731B 8/512Gb Beige (EAC)</a></div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-current">98 990 ₽</div></div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="380275" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="380275" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="380275" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 388614</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html"><img class="product-card__image" src="/assets/img/content/products/388614.jpg" alt="Смартфон Samsung Galaxy S24+ SM-S926B 12/256Gb Marble Gray (EAC)" loading="lazy"></a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="388614">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          Доступен
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Смартфон Samsung Galaxy S24+ SM-S926B 12/256Gb Marble Gray (EAC)</a></div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-current">95 990 ₽</div></div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="388614" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388614" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388614" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 388458</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html"><img class="product-card__image" src="/assets/img/content/products/388458.jpg" alt="Монитор 24&quot; Xiaomi Mi Monitor A24i IPS 1920x1080 6ms HDMI, VGA" loading="lazy"></a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="388458">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success js-tooltip" data-tooltip-content="Динамо<br>Пл. Ильича">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          В наличии
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Монитор 24" Xiaomi Mi Monitor A24i IPS 1920x1080 6ms HDMI, VGA</a></div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-new">10 790 ₽</div></div>
        <div class="product-card__old"><div class="product-card__price-old">11 790 ₽</div></div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="388458" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388458" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="388458" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 390528</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/390528.jpg" alt="Монитор 55&quot; Samsung Odyssey Ark S55CG97WNI Curved VA 3840x2160 1ms HDMI, DisplayPort" loading="lazy">
        </a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="390528">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-success">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
          Доступен
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Монитор 55" Samsung Odyssey Ark S55CG97WNI Curved VA 3840x2160 1ms HDMI, DisplayPort</a></div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-current">251 650 ₽</div></div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="390528" role="button">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="390528" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="390528" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="product-card">
    <div class="product-card__body">
      <div class="product-card__header">
        <div class="product-card__rating">
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
          <span class="product-card__rating__item">
            <svg class="svg-icon svg-icon--xs"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use></svg>
          </span>
        </div>
        <span class="product-card__artikul">Арт. 390530</span>
      </div>
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/390530.jpg" alt="Монитор 57&quot; Samsung Odyssey Neo G9 S57CG952NI VA 7680x2160 1ms HDMI, DisplayPort" loading="lazy">
        </a>
        <a class="product-card__preview js-product-preview" href="/ajax/new/catalog_card.php" data-id="390530">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--search-sm"></use></svg>
        </a>
      </div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-dark">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--wrong-sm"></use></svg>
          Нет в наличии
        </span>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Монитор 57" Samsung Odyssey Neo G9 S57CG952NI VA 7680x2160 1ms HDMI, DisplayPort</a></div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="390530" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="390530" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
        </button>
      </div>
    </div>
  </div>
</div>`

const showMore = "<a href=\"#\" class=\"btn btn-secondary w-100 mb-3 js-show-more\" data-append=\"true\" data-url=\"2\">Показать еще</a>"

const pagination = `<ul class="pagination justify-content-center">
<li class="page-item disabled">
  <a class="page-link" href="${process.env.LISTING_URL}?PAGEN_1=2">
    <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--chevron-left"></use></svg>
  </a>
</li>
<li class="page-item"><a class="page-link" href="${process.env.LISTING_URL}?PAGEN_1=1">1</a></li>
<li class="page-item"><a class="page-link" href="${process.env.LISTING_URL}?PAGEN_1=2">2</a></li>
<li class="page-item active"><span class="page-link">3</span></li>
<li class="page-item"><a class="page-link" href="${process.env.LISTING_URL}?PAGEN_1=4">4</a></li>
<li class="page-item"><a class="page-link" href="${process.env.LISTING_URL}?PAGEN_1=5">5</a></li>
<li class="page-item"><a class="page-link" href="${process.env.LISTING_URL}?PAGEN_1=6">…</a></li>
<li class="page-item"><a class="page-link" href="${process.env.LISTING_URL}?PAGEN_1=25">25</a></li>
<li class="page-item">
  <a class="page-link" href="${process.env.LISTING_URL}?PAGEN_1=4">
    <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--chevron-right"></use></svg>
  </a>
</li>
</ul>`

const brands = `<nav class="tags p-3 bg-white js-brands-block">
<ul class="tags-list">
  <li class="tags-item"><a href="#" class="tags-link">Honor</a></li>
  <li class="tags-item"><a href="#" class="tags-link">Infinix</a></li>
  <li class="tags-item"><a href="#" class="tags-link">Inoi</a></li>
  <li class="tags-item"><a href="#" class="tags-link">Nokia</a></li>
  <li class="tags-item"><a href="#" class="tags-link">Philips</a></li>
  <li class="tags-item"><a href="#" class="tags-link">Poco</a></li>
  <li class="tags-item"><a href="#" class="tags-link">Realme</a></li>
  <li class="tags-item"><a href="#" class="tags-link is-active">Samsung</a></li>
  <li class="tags-item"><a href="#" class="tags-link">Sony</a></li>
  <li class="tags-item"><a href="#" class="tags-link">Tecno</a></li>
  <li class="tags-item"><a href="#" class="tags-link">Xiaomi</a></li>
</ul>
</nav>`

const title = "<h1 class=\"page-title\">Смартфоны</h1>"

const countItems = "<div style=\"display: none\" class=\"js-count-items\">(246 товаров)</div>"

const gtmData = "<div id='gtm_data' data-gtm='{\"event\":\"eec.impressionView\",\"event-category\":\"ecommerce\",\"event-action\":\"Каталог товаров\",\"event-label\":\"Смартфоны\",\"event-non-interaction\":\"False\",\"ecommerce\":{\"impressions\":[{\"name\":\"Смартфон Sony D6603 Xperia Z3 Black УЦЕНКА\",\"id\":\"203485\",\"price\":\"9119\",\"brand\":\"Sony\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":1,\"list\":\"Каталог списком\"},{\"name\":\"Мобильный телефон Philips Xenium E207 Black\",\"id\":\"326541\",\"price\":\"3080\",\"brand\":\"Philips\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":2,\"list\":\"Каталог списком\"},{\"name\":\"Мобильный телефон Philips Xenium E207 Blue\",\"id\":\"326542\",\"price\":\"3080\",\"brand\":\"Philips\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":3,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Tecno Camon 30 8\/256GB RU Uyuni Salt White\",\"id\":\"392555\",\"price\":\"23990\",\"brand\":\"Tecno\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":4,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Tecno Camon 30 8\/256GB RU Sand Brown\",\"id\":\"392554\",\"price\":\"23990\",\"brand\":\"Tecno\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":5,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Realme 12+ 8\/256GB RU Beige\",\"id\":\"392543\",\"price\":\"32900\",\"brand\":\"Realme\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":6,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Tecno Spark 20 Pro+ 8\/256GB RU Radial Starstream\",\"id\":\"392535\",\"price\":\"20900\",\"brand\":\"Tecno\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":7,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Tecno Pova 6 8\/256GB Meteorite Grey\",\"id\":\"392310\",\"price\":\"24900\",\"brand\":\"Tecno\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":8,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Tecno Pova 6 8\/256GB Comet Green\",\"id\":\"392313\",\"price\":\"24900\",\"brand\":\"Tecno\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":9,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Tecno Pova 6 12\/256GB Meteorite Grey\",\"id\":\"392305\",\"price\":\"26900\",\"brand\":\"Tecno\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":10,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Xiaomi Redmi 13C 4\/128GB RU Midnight Black УЦЕНКА\",\"id\":\"391943\",\"price\":\"9206\",\"brand\":\"Xiaomi\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":11,\"list\":\"Каталог списком\"},{\"name\":\"Мобильный телефон Nokia 150 Dual Sim (TA-1582) Black УЦЕНКА\",\"id\":\"392036\",\"price\":\"3192\",\"brand\":\"Nokia\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":12,\"list\":\"Каталог списком\"},{\"name\":\"Мобильный телефон Nokia 130 Dual Sim (TA-1576) Light Gold УЦЕНКА\",\"id\":\"391863\",\"price\":\"2513\",\"brand\":\"Nokia\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":13,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Tecno Spark 20c 4\/128GB RU Magic Skin Green\",\"id\":\"392182\",\"price\":\"9980\",\"brand\":\"Tecno\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":14,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Realme 12 Pro 8\/256GB RU Beige\",\"id\":\"391997\",\"price\":\"36900\",\"brand\":\"Realme\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":15,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Realme 12 Pro+ 8\/256GB RU Blue\",\"id\":\"391993\",\"price\":\"43900\",\"brand\":\"Realme\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":16,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Realme 12 Pro+ 8\/256GB RU Beige\",\"id\":\"391994\",\"price\":\"43900\",\"brand\":\"Realme\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":17,\"list\":\"Каталог списком\"},{\"name\":\"Мобильный телефон Nokia 2660 Dual Sim (TA-1469) Black УЦЕНКА\",\"id\":\"391715\",\"price\":\"5167\",\"brand\":\"Nokia\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":18,\"list\":\"Каталог списком\"},{\"name\":\"Мобильный телефон Philips Xenium E2602 Blue УЦЕНКА\",\"id\":\"391363\",\"price\":\"2626\",\"brand\":\"Philips\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":19,\"list\":\"Каталог списком\"},{\"name\":\"Мобильный телефон Philips Xenium E2317 Yellow\/Black УЦЕНКА\",\"id\":\"391376\",\"price\":\"2814\",\"brand\":\"Philips\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":20,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Xiaomi Redmi Note 13 6\/128GB RU Mint Green\",\"id\":\"391786\",\"price\":\"22990\",\"brand\":\"Xiaomi\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":21,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Infinix Hot 40i 8\/256Gb Green\",\"id\":\"391736\",\"price\":\"15990\",\"brand\":\"Infinix\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":22,\"list\":\"Каталог списком\"},{\"name\":\"Мобильный телефон Philips Xenium E172 Black УЦЕНКА\",\"id\":\"390571\",\"price\":\"1764\",\"brand\":\"Philips\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":23,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A15 SM-A155 6\/128GB Dark Blue\",\"id\":\"391174\",\"price\":\"16190\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":24,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A15 SM-A155 6\/128GB Blue\",\"id\":\"391173\",\"price\":\"16190\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":25,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A35 SM-A356 8\/256GB Yellow\",\"id\":\"391112\",\"price\":\"40490\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":26,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A35 SM-A356 8\/256GB Lavender\",\"id\":\"391111\",\"price\":\"40490\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":27,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A35 SM-A356 8\/256GB Yellow (EAC)\",\"id\":\"391105\",\"price\":\"40990\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":28,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A35 SM-A356 8\/256GB White-Blue (EAC)\",\"id\":\"391106\",\"price\":\"40990\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":29,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A35 SM-A356 8\/256GB Lavender (EAC)\",\"id\":\"391104\",\"price\":\"40990\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":30,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A35 SM-A356 8\/128GB Yellow (EAC)\",\"id\":\"391109\",\"price\":\"34990\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":31,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A35 SM-A356 8\/128GB White-Blue (EAC)\",\"id\":\"391110\",\"price\":\"34990\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":32,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A35 SM-A356 8\/128GB Lavender (EAC)\",\"id\":\"391108\",\"price\":\"34990\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":33,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A35 SM-A356 8\/128GB Dark Blue (EAC)\",\"id\":\"391107\",\"price\":\"34990\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":34,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A55 SM-A556 8\/256GB Yellow (EAC)\",\"id\":\"391097\",\"price\":\"46990\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":35,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A55 SM-A556 8\/128GB Yellow (EAC)\",\"id\":\"391101\",\"price\":\"42990\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":36,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A55 SM-A556 8\/128GB Lavender (EAC)\",\"id\":\"391100\",\"price\":\"42990\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":37,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A55 SM-A556 8\/128GB Dark Blue (EAC)\",\"id\":\"391099\",\"price\":\"42990\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":38,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A35 SM-A356 8\/256GB Dark Blue (EAC)\",\"id\":\"391103\",\"price\":\"40990\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":39,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A35 SM-A356 8\/256GB White-Blue\",\"id\":\"391083\",\"price\":\"40490\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":40,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A35 SM-A356 8\/128GB Dark Blue\",\"id\":\"391082\",\"price\":\"33990\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":41,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A35 SM-A356 8\/128GB Yellow\",\"id\":\"391081\",\"price\":\"33990\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":42,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A35 SM-A356 8\/256GB Dark Blue\",\"id\":\"391084\",\"price\":\"40490\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":43,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Tecno Spark 20c 8\/128GB RU Alpenglow Gold\",\"id\":\"391043\",\"price\":\"10900\",\"brand\":\"Tecno\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":44,\"list\":\"Каталог списком\"},{\"name\":\"Смартфон Samsung Galaxy A05s SM-A057 4\/128GB Silver\",\"id\":\"390761\",\"price\":\"13590\",\"brand\":\"Samsung\",\"category\":\"portable_tehnika_i_foto\/mobilnie_telefonu\/smartfony\",\"position\":45,\"list\":\"Каталог списком\"}]}}' class=\"hidden\"></div>"
const tmrData = "<div id='tmr_data' data-tmr='{\"type\":\"itemView\",\"productid\":[\"203485\",\"326541\",\"326542\",\"392555\",\"392554\",\"392543\",\"392535\",\"392310\",\"392313\",\"392305\",\"391943\",\"392036\",\"391863\",\"392182\",\"391997\",\"391993\",\"391994\",\"391715\",\"391363\",\"391376\",\"391786\",\"391736\",\"390571\",\"391174\",\"391173\",\"391112\",\"391111\",\"391105\",\"391106\",\"391104\",\"391109\",\"391110\",\"391108\",\"391107\",\"391097\",\"391101\",\"391100\",\"391099\",\"391103\",\"391083\",\"391082\",\"391081\",\"391084\",\"391043\",\"390761\"],\"pagetype\":\"product\",\"list\":\"2\"}' class=\"hidden\"></div>"

export const listing = `
${title}
${breadcrumbs}
${controls}
<div class="row g-0">
  <div class="col-12 col-lg-9 p-3 align-self-start">
    ${items}
    ${gtmData}
    ${tmrData}
    <nav class="mt-3 py-6 bg-white">
      ${showMore}
      ${pagination}
    </nav>
  </div>
  <div class="col-lg-3 bg-white align-self-start">
    <div class="offcanvas-lg offcanvas-end" id="offcanvas-filters" tabindex="-1">
      <div class="offcanvas-header">
        <p class="h3 mb-0">Фильтр</p>
        <button class="btn-close" type="button" data-bs-dismiss="offcanvas" data-bs-target="#offcanvas-filters" aria-label="Закрыть"></button>
      </div>
      <div class="offcanvas-body">
        ${filters}
      </div>
    </div>
  </div>
</div>
${brands}
${countItems}`