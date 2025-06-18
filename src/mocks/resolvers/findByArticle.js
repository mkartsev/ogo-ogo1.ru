const card = (id) => `
  <div class="product-card product-card--find-by-article product-card--new">
    <span class="product-card__artikul">Арт. 389198</span>
    <div class="product-card__controls">
      <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id=${id} data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
      </button>
      <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id=${id} data-list="favorites" data-action="add" data-tooltip-content="В избранное">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
      </button>
    </div>
    <div class="product-card__image-wrapper">
      <a class="product-card__image-link" href="/product.html">
        <img class="product-card__image" src="/assets/img/content/products/389198.jpg" alt="Ноутбук MSI Titan 18 HX A14VIG-211RU Core i9 14900HX/64Gb/3Tb SSD/NV RTX4090 16Gb/18&quot; UHD+/Win11 Black" loading="lazy">
      </a>
    </div>
    <div class="product-card__availability">
      <span class="product-card__availability-title text-success js-tooltip" data-tooltip-content="Динамо<br>Пл. Ильича">
        <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--check-sm"></use></svg>
        В наличии
      </span>
    </div>
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
    <div class="product-card__caption"><a class="product-card__title" href="/product.html" target="_blank">Ноутбук MSI Titan 18 HX A14VIG-211RU Core i9 14900HX/64Gb/3Tb SSD/NV RTX4090 16Gb/18" UHD+/Win11 Black</a></div>
    <div class="product-card__footer">
      <div class="product-card__price-wrapper">
        <div class="product-card__price"><div class="product-card__price-new">620 220 ₽</div></div>
        <div class="product-card__old"><div class="product-card__price-old">630 220 ₽</div></div>
        <div class="product-card__bonus">
          <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus-sm"></use></svg>
          1234 бонуса
        </div>
      </div>
      <a class="btn btn-primary btn-sm product-card__buy js-add-to-cart" href="#" data-id=${id} role="button"><svg class="svg-icon svg-icon--sm "><use xlink:href="/assets/img/sprites/sprite.svg#ui--shopping-cart-sm"></use></svg>Купить</a>
    </div>
  </div>`

export const findByArticle = (id) => {
  switch (id) {
    case "":
    case "undefined":
    case null:
      return "Артикул не указан"

    case "123":
      return `<p>Товар с артикулом ${id} не найден!</p>`

    case "456":
      return `<p>Товара с артикулом ${id} сейчас нет в наличии</p>`

    default:
      return card(id)
  }
}