export const addToCartSuccess = (id) => {
  let product

  switch (id) {
    case "1661698":
      product = {
        "NAME": "Ноутбук MSI Stealth 16 AI Studio A1VIG-062RU Core i9 185H/32Gb/2Tb SSD/NV RTX4090 16Gb/16\\\" UHD+/Win11 Dark Blue",
        "PRICE": 396760,
        "PREVIEW_PICTURE": "/assets/img/content/products/product-card-1.jpg",
        "DETAIL_PAGE_URL": "/product-page.html"
      }
      break

    case "389708":
      product = {
        "NAME": "Смартфон Xiaomi Redmi Note 13 Pro+ 12/512GB RU Midnight Black",
        "PRICE": 56980,
        "PREVIEW_PICTURE": "/assets/img/content/products/product-card-2.jpg",
        "DETAIL_PAGE_URL": "/product-page.html"
      }
      break

    case "382239":
      product = {
        "NAME": "Ноутбук HP ZBook Fury G8 Xeon W-11955M/64Gb/2Tb+512Gb SSD/NV RTX A5000 16Gb/17.3\\\" 4K/Win10Pro Gray",
        "PRICE": 917700,
        "PREVIEW_PICTURE": "/assets/img/content/products/product-card-3.jpg",
        "DETAIL_PAGE_URL": "/product-page.html"
      }
      break

    case "389198":
      product = {
        "NAME": "Ноутбук MSI Titan 18 HX A14VIG-211RU Core i9 14900HX/64Gb/3Tb SSD/NV RTX4090 16Gb/18\\\" UHD+/Win11 Black",
        "PRICE": 653900,
        "PREVIEW_PICTURE": "/assets/img/content/products/product-card-4.jpg",
        "DETAIL_PAGE_URL": "/product-page.html"
      }
      break

    case "344921":
      product = {
        "NAME": "Смартфон Apple iPhone 13 Pro Max 1TB Silver MLN73RU/A",
        "PRICE": null,
        "PREVIEW_PICTURE": "/assets/img/content/products/product-card-5.jpg",
        "DETAIL_PAGE_URL": "/product-page.html"
      }
      break
  }

  return {
    "result": "ok",
    "message": "Товар добавлен в корзину!",
    "product": [
      product
    ]
  }
}

export const addToCartFail = {
  "result": "error",
  "error": "Не удалось добавить товар! Попробуйте обновить страницу",
  "message": "",
  "product": [{}]
}

export const accessoriesSuccess = `
<p class="h3 mb-4 text-center">Добавить аксессуары</p>
  <div class="listing-grid mb-3" style="--columns: 3">
    <div class="product-card product-card--accessory product-card--new">
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
      <div class="product-card__body">
        <div class="product-card__image-wrapper">
          <a class="product-card__image-link" href="/product.html">
            <img class="product-card__image" src="/assets/img/content/products/389198.jpg" alt="Ноутбук MSI Titan 18 HX A14VIG-211RU Core i9 14900HX/64Gb/3Tb SSD/NV RTX4090 16Gb/18&quot; UHD+/Win11 Black" loading="lazy">
          </a>
        </div>
        <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Titan 18 HX A14VIG-211RU Core i9 14900HX/64Gb/3Tb SSD/NV RTX4090 16Gb/18" UHD+/Win11 Black</a></div>
        <div class="product-card__price-wrapper">
          <div class="product-card__price"><div class="product-card__price-current">620 220 ₽</div></div>
        </div>
        <div class="product-card__bonus">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus-sm"></use></svg>
          1234 бонуса
        </div>
      </div>
      <div class="product-card__footer">
        <div class="product-card__price-wrapper">
          <div class="product-card__price"><div class="product-card__price-current">620 220 ₽</div></div>
        </div>
        <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="389198" data-accessories="false" role="button">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--plus-sm"></use></svg>
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
        <div class="product-card__total">
          Итого с этим товаром:
          <br>
          <span class="text-body">620 220 ₽</span>
        </div>
      </div>
    </div>
    <div class="product-card product-card--accessory product-card--hit">
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
      <div class="product-card__body">
        <div class="product-card__image-wrapper">
          <a class="product-card__image-link" href="/product.html">
            <img class="product-card__image" src="/assets/img/content/products/391062.jpg" alt="Ноутбук MSI Creator 16 AI Studio A1VIG-060RU Core i9 185H/64Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; UHD+/Win11Pro Grey" loading="lazy">
          </a>
        </div>
        <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Creator 16 AI Studio A1VIG-060RU Core i9 185H/64Gb/2Tb SSD/NV RTX4090 16Gb/16" UHD+/Win11Pro Grey</a></div>
        <div class="product-card__price-wrapper">
          <div class="product-card__price"><div class="product-card__price-current">534 000 ₽</div></div>
        </div>
        <div class="product-card__bonus">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus-sm"></use></svg>
          200 бонусов
        </div>
      </div>
      <div class="product-card__footer">
        <div class="product-card__price-wrapper">
          <div class="product-card__price"><div class="product-card__price-current">534 000 ₽</div></div>
        </div>
        <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="391062" data-accessories="false" role="button">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--plus-sm"></use></svg>
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
        <div class="product-card__total">
          Итого с этим товаром:
          <br>
          <span class="text-body">534 000 ₽</span>
        </div>
      </div>
    </div>
    <div class="product-card product-card--accessory product-card--super">
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
      <div class="product-card__body">
        <div class="product-card__image-wrapper">
          <a class="product-card__image-link" href="/product.html">
            <img class="product-card__image" src="/assets/img/content/products/391065.jpg" alt="Ноутбук MSI Stealth 16 AI Studio A1VIG-062RU Core i9 185H/32Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; UHD+/Win11 Dark Blue" loading="lazy">
          </a>
        </div>
        <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Stealth 16 AI Studio A1VIG-062RU Core i9 185H/32Gb/2Tb SSD/NV RTX4090 16Gb/16" UHD+/Win11 Dark Blue</a></div>
        <div class="product-card__availability">
          <span class="product-card__availability-title text-dark">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--wrong-sm"></use></svg>
            Нет в наличии
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
<a href="#" class="btn btn-secondary w-100 text-dark js-more-accessories" data-id="382239" data-page="3">
  Показать еще 3
  <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--chevron-down-sm"></use></svg>
</a>`

export const accessoriesMore = `
<p class="h3 mb-4 text-center">Добавить аксессуары</p>
<div class="listing-grid mb-3" style="--columns: 3">
  <div class="product-card product-card--accessory product-card--new">
    <div class="product-card__label product-card__label--new">Новинка</div>
    <div class="product-card__header">
      <div class="product-card__rating">
        <span class="product-card__rating__item is-active">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item is-active">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item is-active">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item is-active">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item is-active">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
      </div>
      <span class="product-card__artikul">Арт. 389198</span>
    </div>
    <div class="product-card__body">
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/389198.jpg" alt="Ноутбук MSI Titan 18 HX A14VIG-211RU Core i9 14900HX/64Gb/3Tb SSD/NV RTX4090 16Gb/18&quot; UHD+/Win11 Black" loading="lazy">
        </a>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Titan 18 HX A14VIG-211RU Core i9 14900HX/64Gb/3Tb SSD/NV RTX4090 16Gb/18" UHD+/Win11 Black</a></div>
      <div class="product-card__price-wrapper">
        <div class="product-card__price">
          <div class="product-card__price-current">620 220 ₽</div>
        </div>
      </div>
      <div class="product-card__bonus">
        <svg class="svg-icon svg-icon--sm">
          <use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus-sm"></use>
        </svg>
        1234 бонуса
      </div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price">
          <div class="product-card__price-current">620 220 ₽</div>
        </div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="389198" data-accessories="false" role="button">
        <svg class="svg-icon svg-icon--sm">
          <use xlink:href="/assets/img/sprites/sprite.svg#ui--plus-sm"></use>
        </svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="389198" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use>
          </svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="389198" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use>
          </svg>
        </button>
      </div>
      <div class="product-card__total">
        Итого с этим товаром:
        <br>
        <span class="text-body">620 220 ₽</span>
      </div>
    </div>
  </div>
  <div class="product-card product-card--accessory product-card--hit">
    <div class="product-card__label product-card__label--hit">Хит продаж</div>
    <div class="product-card__header">
      <div class="product-card__rating">
        <span class="product-card__rating__item is-active">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item is-active">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item is-active">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item is-active">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item is-active">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
      </div>
      <span class="product-card__artikul">Арт. 391062</span>
    </div>
    <div class="product-card__body">
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/391062.jpg" alt="Ноутбук MSI Creator 16 AI Studio A1VIG-060RU Core i9 185H/64Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; UHD+/Win11Pro Grey" loading="lazy">
        </a>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Creator 16 AI Studio A1VIG-060RU Core i9 185H/64Gb/2Tb SSD/NV RTX4090 16Gb/16" UHD+/Win11Pro Grey</a></div>
      <div class="product-card__price-wrapper">
        <div class="product-card__price">
          <div class="product-card__price-current">534 000 ₽</div>
        </div>
      </div>
      <div class="product-card__bonus">
        <svg class="svg-icon svg-icon--sm">
          <use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus-sm"></use>
        </svg>
        200 бонусов
      </div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price">
          <div class="product-card__price-current">534 000 ₽</div>
        </div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="391062" data-accessories="false" role="button">
        <svg class="svg-icon svg-icon--sm">
          <use xlink:href="/assets/img/sprites/sprite.svg#ui--plus-sm"></use>
        </svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="391062" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use>
          </svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="391062" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use>
          </svg>
        </button>
      </div>
      <div class="product-card__total">
        Итого с этим товаром:
        <br>
        <span class="text-body">534 000 ₽</span>
      </div>
    </div>
  </div>
  <div class="product-card product-card--accessory product-card--super">
    <div class="product-card__label product-card__label--super">Супер цена</div>
    <div class="product-card__header">
      <div class="product-card__rating">
        <span class="product-card__rating__item">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
      </div>
      <span class="product-card__artikul">Арт. 391065</span>
    </div>
    <div class="product-card__body">
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/391065.jpg" alt="Ноутбук MSI Stealth 16 AI Studio A1VIG-062RU Core i9 185H/32Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; UHD+/Win11 Dark Blue" loading="lazy">
        </a>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Stealth 16 AI Studio A1VIG-062RU Core i9 185H/32Gb/2Tb SSD/NV RTX4090 16Gb/16" UHD+/Win11 Dark Blue</a></div>
      <div class="product-card__availability">
        <span class="product-card__availability-title text-dark">
          <svg class="svg-icon svg-icon--sm">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--wrong-sm"></use>
          </svg>
          Нет в наличии
        </span>
      </div>
    </div>
  </div>
  <div class="product-card product-card--accessory">
    <div class="product-card__header">
      <div class="product-card__rating">
        <span class="product-card__rating__item">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
      </div>
      <span class="product-card__artikul">Арт. 390124</span>
    </div>
    <div class="product-card__body">
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/390124.jpg" alt="Ноутбук MSI Raider GE68 HX 14VIG-473RU Core i9 14900HX/32Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; UHD/Win11 Black" loading="lazy">
        </a>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Raider GE68 HX 14VIG-473RU Core i9 14900HX/32Gb/2Tb SSD/NV RTX4090 16Gb/16" UHD/Win11 Black</a></div>
      <div class="product-card__price-wrapper">
        <div class="product-card__price">
          <div class="product-card__price-current">429 460 ₽</div>
        </div>
      </div>
      <div class="product-card__bonus">
        <svg class="svg-icon svg-icon--sm">
          <use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus-sm"></use>
        </svg>
        1634 бонуса
      </div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price">
          <div class="product-card__price-current">429 460 ₽</div>
        </div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="390124" data-accessories="false" role="button">
        <svg class="svg-icon svg-icon--sm">
          <use xlink:href="/assets/img/sprites/sprite.svg#ui--plus-sm"></use>
        </svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="390124" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use>
          </svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="390124" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use>
          </svg>
        </button>
      </div>
      <div class="product-card__total">
        Итого с этим товаром:
        <br>
        <span class="text-body">429 460 ₽</span>
      </div>
    </div>
  </div>
  <div class="product-card product-card--accessory">
    <div class="product-card__header">
      <div class="product-card__rating">
        <span class="product-card__rating__item is-active">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item is-active">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item is-active">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item is-active">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
      </div>
      <span class="product-card__artikul">Арт. 387892</span>
    </div>
    <div class="product-card__body">
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/387892.jpg" alt="Ноутбук ASUS ROG Zephyrus Duo 16 GX650PY-NM085W AMD Ryzen 9 7945HX/32Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; WQXGA/Win11 Black" loading="lazy">
        </a>
      </div>
      <div class="product-card__caption">
        <a class="product-card__title" href="/product.html" target="_blank">Ноутбук ASUS ROG Zephyrus Duo 16 GX650PY-NM085W AMD Ryzen 9 7945HX/32Gb/2Tb SSD/NV RTX4090 16Gb/16" WQXGA/Win11 Black</a>
      </div>
      <div class="product-card__price-wrapper">
        <div class="product-card__price">
          <div class="product-card__price-current">419 550 ₽</div>
        </div>
      </div>
      <div class="product-card__bonus">
        <svg class="svg-icon svg-icon--sm">
          <use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus-sm"></use>
        </svg>
        1635 бонусов
      </div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price">
          <div class="product-card__price-current">419 550 ₽</div>
        </div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="387892" data-accessories="false" role="button">
        <svg class="svg-icon svg-icon--sm">
          <use xlink:href="/assets/img/sprites/sprite.svg#ui--plus-sm"></use>
        </svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="387892" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use>
          </svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="387892" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use>
          </svg>
        </button>
      </div>
      <div class="product-card__total">
        Итого с этим товаром:
        <br>
        <span class="text-body">419 550 ₽</span>
      </div>
    </div>
  </div>
  <div class="product-card product-card--accessory">
    <div class="product-card__header">
      <div class="product-card__rating">
        <span class="product-card__rating__item">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
        <span class="product-card__rating__item">
          <svg class="svg-icon svg-icon--xs">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill-sm"></use>
          </svg>
        </span>
      </div>
      <span class="product-card__artikul">Арт. 391065</span>
    </div>
    <div class="product-card__body">
      <div class="product-card__image-wrapper">
        <a class="product-card__image-link" href="/product.html">
          <img class="product-card__image" src="/assets/img/content/products/391065.jpg" alt="Ноутбук MSI Stealth 16 AI Studio A1VIG-062RU Core i9 185H/32Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; UHD+/Win11 Dark Blue" loading="lazy">
        </a>
      </div>
      <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Stealth 16 AI Studio A1VIG-062RU Core i9 185H/32Gb/2Tb SSD/NV RTX4090 16Gb/16" UHD+/Win11 Dark Blue</a></div>
      <div class="product-card__price-wrapper">
        <div class="product-card__price">
          <div class="product-card__price-current">457 700 ₽</div>
        </div>
      </div>
      <div class="product-card__bonus">
        <svg class="svg-icon svg-icon--sm">
          <use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus-sm"></use>
        </svg>
        1636 бонусов
      </div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price">
          <div class="product-card__price-current">457 700 ₽</div>
        </div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id="391065" data-accessories="false" role="button">
        <svg class="svg-icon svg-icon--sm">
          <use xlink:href="/assets/img/sprites/sprite.svg#ui--plus-sm"></use>
        </svg>
        Купить
      </a>
      <div class="product-card__controls">
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="391065" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
          <svg class="svg-icon svg-icon--sm">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use>
          </svg>
        </button>
        <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="391065" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
          <svg class="svg-icon svg-icon--sm">
            <use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use>
          </svg>
        </button>
      </div>
      <div class="product-card__total">
        Итого с этим товаром:
        <br>
        <span class="text-body">457 700 ₽</span>
      </div>
    </div>
  </div>
</div>`

export const accessoriesFail = {
  "result": "error",
  "error": "Товар не найден!",
  "message": ""
}

export const dropdown = `
<div class="header-toolbar__item d-none d-md-inline-flex js-cart-dropdown b-cart-link" data-products="1661698" data-basketitems='[{"id":"391064","productID":1661698,"basketID":"4663282","name":"Ноутбук MSI Stealth 16 AI Studio A1VHG-061RU Core i9 185H\/32Gb\/2Tb SSD\/NV RTX4080 12Gb\/16\" UHD+\/Win11 Dark Blue","cat_id":"85840","cat_name":"Ноутбуки","quantity":1,"price":"396&nbsp;760","old_price":null,"discount_percent":null,"picture":"\/upload\/resize_cache\/iblock\/005\/160_160_1\/65n6lh9imu6rbrx37w6w56y3do3cubbs.jpeg","url":"\/market\/noutbuki\/391064\/","adult_content":false}]''>
  <a class="header-toolbar__link" href="/cart/">
    <div class="header-toolbar__link-icon">
      <svg class="svg-icon">
        <use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-bag"></use>
      </svg>
      <span class="badge rounded-pill position-absolute top-0 start-100 translate-middle bg-danger js-cart-counter">1</span>
    </div>
    <span class="header-toolbar__link-text">Корзина</span>
  </a>
  <div class="cart-dropdown">
    <div class="cart-dropdown__content">
      <div class="product-card product-card--cart-dropdown">
        <div class="product-card__image-wrapper">
          <a class="product-card__image-link" href="/product.html">
            <img class="product-card__image" src="/assets/img/content/products/389198.jpg" alt="Ноутбук MSI Titan 18 HX A14VIG-211RU Core i9 14900HX/64Gb/3Tb SSD/NV RTX4090 16Gb/18&quot; UHD+/Win11 Black" loading="lazy">
          </a>
        </div>
        <div class="product-card__discount product-card__badge badge text-bg-warning">-10%</div>
        <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Titan 18 HX A14VIG-211RU Core i9 14900HX/64Gb/3Tb SSD/NV RTX4090 16Gb/18" UHD+/Win11 Black</a></div>
        <div class="product-card__quantity input-group input-group-xs">
          <button class="btn btn-secondary" type="button">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--minus-sm"></use></svg>
          </button>
          <input class="form-control text-center text-truncate" type="number" value="1">
          <button class="btn btn-secondary" type="button">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--plus-sm"></use></svg>
          </button>
        </div>
        <div class="product-card__price-wrapper">
          <div class="product-card__price"><div class="product-card__price-new">620 220 ₽</div></div>
          <div class="product-card__old"><div class="product-card__price-old">630 220 ₽</div></div>
        </div>
        <div class="product-card__controls">
          <button class="btn btn-link btn-sm js-tooltip js-remove-from-cart" type="button" data-id="389198" data-tooltip-content="Удалить">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--cross"></use></svg>
          </button>
        </div>
      </div>
      <div class="product-card product-card--cart-dropdown">
        <div class="product-card__image-wrapper">
          <a class="product-card__image-link" href="/product.html">
            <img class="product-card__image" src="/assets/img/content/products/391062.jpg" alt="Ноутбук MSI Creator 16 AI Studio A1VIG-060RU Core i9 185H/64Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; UHD+/Win11Pro Grey" loading="lazy">
          </a>
        </div>
        <div class="product-card__discount product-card__badge badge text-bg-warning">-10%</div>
        <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Creator 16 AI Studio A1VIG-060RU Core i9 185H/64Gb/2Tb SSD/NV RTX4090 16Gb/16" UHD+/Win11Pro Grey</a></div>
        <div class="product-card__quantity input-group input-group-xs">
          <button class="btn btn-secondary" type="button">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--minus-sm"></use></svg>
          </button>
          <input class="form-control text-center text-truncate" type="number" value="2">
          <button class="btn btn-secondary" type="button">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--plus-sm"></use></svg>
          </button>
        </div>
        <div class="product-card__price-wrapper">
          <div class="product-card__price"><div class="product-card__price-current">534 000 ₽</div></div>
        </div>
        <div class="product-card__controls">
          <button class="btn btn-link btn-sm js-tooltip js-remove-from-cart" type="button" data-id="391062" data-tooltip-content="Удалить">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--cross"></use></svg>
          </button>
        </div>
      </div>
      <div class="product-card product-card--cart-dropdown">
        <div class="product-card__image-wrapper">
          <a class="product-card__image-link" href="/product.html">
            <img class="product-card__image" src="/assets/img/content/products/391065.jpg" alt="Ноутбук MSI Stealth 16 AI Studio A1VIG-062RU Core i9 185H/32Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; UHD+/Win11 Dark Blue" loading="lazy">
          </a>
        </div>
        <div class="product-card__discount product-card__badge badge text-bg-warning">-10%</div>
        <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Stealth 16 AI Studio A1VIG-062RU Core i9 185H/32Gb/2Tb SSD/NV RTX4090 16Gb/16" UHD+/Win11 Dark Blue</a></div>
        <div class="product-card__availability">
          <span class="product-card__availability-title text-dark">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--wrong-sm"></use></svg>
            Нет в наличии
          </span>
        </div>
        <div class="product-card__controls">
          <button class="btn btn-link btn-sm js-tooltip js-remove-from-cart" type="button" data-id="391065" data-tooltip-content="Удалить">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--cross"></use></svg>
          </button>
        </div>
      </div>
      <div class="product-card product-card--cart-dropdown">
        <div class="product-card__image-wrapper">
          <a class="product-card__image-link" href="/product.html">
            <img class="product-card__image" src="/assets/img/content/products/390124.jpg" alt="Ноутбук MSI Raider GE68 HX 14VIG-473RU Core i9 14900HX/32Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; UHD/Win11 Black" loading="lazy">
          </a>
        </div>
        <div class="product-card__discount product-card__badge badge text-bg-warning">-10%</div>
        <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Raider GE68 HX 14VIG-473RU Core i9 14900HX/32Gb/2Tb SSD/NV RTX4090 16Gb/16" UHD/Win11 Black</a></div>
        <div class="product-card__quantity input-group input-group-xs">
          <button class="btn btn-secondary" type="button">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--minus-sm"></use></svg>
          </button>
          <input class="form-control text-center text-truncate" type="number" value="4">
          <button class="btn btn-secondary" type="button">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--plus-sm"></use></svg>
          </button>
        </div>
        <div class="product-card__price-wrapper">
          <div class="product-card__price"><div class="product-card__price-current">429 460 ₽</div></div>
        </div>
        <div class="product-card__controls">
          <button class="btn btn-link btn-sm js-tooltip js-remove-from-cart" type="button" data-id="390124" data-tooltip-content="Удалить">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--cross"></use></svg>
          </button>
        </div>
      </div>
      <div class="product-card product-card--cart-dropdown">
        <div class="product-card__image-wrapper">
          <a class="product-card__image-link" href="/product.html">
            <img class="product-card__image" src="/assets/img/content/products/387892.jpg" alt="Ноутбук ASUS ROG Zephyrus Duo 16 GX650PY-NM085W AMD Ryzen 9 7945HX/32Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; WQXGA/Win11 Black" loading="lazy">
          </a>
        </div>
        <div class="product-card__discount product-card__badge badge text-bg-warning">-10%</div>
        <div class="product-card__caption">
          <a class="product-card__title" href="/product.html" target="_blank">Ноутбук ASUS ROG Zephyrus Duo 16 GX650PY-NM085W AMD Ryzen 9 7945HX/32Gb/2Tb SSD/NV RTX4090 16Gb/16" WQXGA/Win11 Black</a>
        </div>
        <div class="product-card__quantity input-group input-group-xs">
          <button class="btn btn-secondary" type="button">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--minus-sm"></use></svg>
          </button>
          <input class="form-control text-center text-truncate" type="number" value="5">
          <button class="btn btn-secondary" type="button">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--plus-sm"></use></svg>
          </button>
        </div>
        <div class="product-card__price-wrapper">
          <div class="product-card__price"><div class="product-card__price-current">419 550 ₽</div></div>
        </div>
        <div class="product-card__controls">
          <button class="btn btn-link btn-sm js-tooltip js-remove-from-cart" type="button" data-id="387892" data-tooltip-content="Удалить">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--cross"></use></svg>
          </button>
        </div>
      </div>
      <div class="product-card product-card--cart-dropdown">
        <div class="product-card__image-wrapper">
          <a class="product-card__image-link" href="/product.html">
            <img class="product-card__image" src="/assets/img/content/products/391065.jpg" alt="Ноутбук MSI Stealth 16 AI Studio A1VIG-062RU Core i9 185H/32Gb/2Tb SSD/NV RTX4090 16Gb/16&quot; UHD+/Win11 Dark Blue" loading="lazy">
          </a>
        </div>
        <div class="product-card__discount product-card__badge badge text-bg-warning">-10%</div>
        <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Stealth 16 AI Studio A1VIG-062RU Core i9 185H/32Gb/2Tb SSD/NV RTX4090 16Gb/16" UHD+/Win11 Dark Blue</a></div>
        <div class="product-card__quantity input-group input-group-xs">
          <button class="btn btn-secondary" type="button">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--minus-sm"></use></svg>
          </button>
          <input class="form-control text-center text-truncate" type="number" value="6">
          <button class="btn btn-secondary" type="button">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--plus-sm"></use></svg>
          </button>
        </div>
        <div class="product-card__price-wrapper">
          <div class="product-card__price"><div class="product-card__price-current">457 700 ₽</div></div>
        </div>
        <div class="product-card__controls">
          <button class="btn btn-link btn-sm js-tooltip js-remove-from-cart" type="button" data-id="391065" data-tooltip-content="Удалить">
            <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--cross"></use></svg>
          </button>
        </div>
      </div>
    </div>
    <div class="cart-dropdown__footer p-3">
      <div class="row g-3">
        <div class="col">Итоговая сумма:</div>
        <div class="col text-end">396&nbsp;760&nbsp;₽</div>
        <div class="col-sm-12"><a class="btn btn-primary w-100" href="/order/">Перейти к оформлению</a></div>
      </div>
    </div>
  </div>
</div>`

export const emptyDropdown = `
<div class="header-toolbar__item d-none d-md-inline-flex js-cart-dropdown b-cart-link" data-products="" data-basketitems="[]">
  <a class="header-toolbar__link" href="/cart/">
    <div class="header-toolbar__link-icon">
      <svg class="svg-icon">
        <use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-bag"></use>
      </svg>
    </div>
    <span class="header-toolbar__link-text">Корзина</span>
  </a>
</div>`