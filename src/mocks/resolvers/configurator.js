export const configuratorHTML = `<div class="configurator" id="configurator">
  <input type="hidden" name="" id="cofiguratorId" value="1600065">
  <div class="popup popup--lg" id="popup-add-to-cart--configurator">
    <p class="popup-title text-center">Товары добавлен в корзину!</p>
    <div class="popup-content">
      <div class="popup-buttons d-flex justify-content-center align-items-center mb-6">
        <button class="btn btn-secondary me-3" type="button" data-fancybox-close="">Продолжить покупки</button>
        <a class="btn btn-primary" href="/cart.html">Перейти в корзину</a>
      </div>
    </div>
  </div>
  <div class="popup popup--md" id="popup-expert-request">
    <p class="popup-title">Запрос оценки эксперта</p>
    <div class="popup-content">
      <form class="form form-expert-request mb-3" id="form-expert-request" action=${process.env.CONFIGURATOR_EXPERT} data-reset="true" novalidate="">
        <p class="form-error text-danger fw-bold" style="display: none"></p>
        <div class="row g-3 g-lg-4 mb-3">
          <div class="col-12 col-md-6">
            <div class="field field--type-text">
              <label class="field__label">Имя</label>
              <div class="field__field"><input class="form-control" type="text" value="" name="email" placeholder="Ваше имя" required="required"></div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="field field--type-email">
              <label class="field__label">Электронная почта</label>
              <div class="field__field"><input class="form-control" type="email" value="" name="email" placeholder="Ваша электронная почта" required="required"></div>
            </div>
          </div>
        </div>
        <div class="field field--type-checkbox">
          <label class="field__label">
            <input type="checkbox" id="expert-request-privacy" name="privacy" checked="checked" required="required">
            <span class="field__check"></span>
            <span class="field__caption">
              С
              <a href="#">политикой обработки и защиты персональных данных</a>
              ознакомлен и согласен
            </span>
          </label>
        </div>
        <button class="btn btn-primary" type="submit">Отправить</button>
      </form>
      <p>Наш эксперт проведет оценку конфигурации и после этого свяжется с вами по указанному адресу электронной почты</p>
      <p class="mb-1"><strong>Не выбраны обязательные компоненты:</strong></p>
      <ul class="configurator-required__list">
        <li>Корпус компьютера</li>
      </ul>
    </div>
  </div>
  <div class="popup popup--md" id="popup-configuration-mail">
    <p class="popup-title">Отправка конфигурации на почту</p>
    <div class="popup-content">
      <form class="form form-configuration-mail" id="form-configuration-mail" action=${process.env.CONFIGURATOR_MAIL} data-reset="true" data-close-popup="true" novalidate="">
        <p class="form-error text-danger fw-bold" style="display: none"></p>
        <div class="row g-3 g-lg-4">
          <div class="col-12 col-md-8">
            <div class="field field--type-email">
              <label class="field__label">Ваша электронная почта</label>
              <div class="field__field"><input class="form-control" type="email" name="email" placeholder="Ваша электронная почта" required="required"></div>
            </div>
          </div>
          <div class="col-12 col-md-4"><button class="btn btn-primary mt-lg-4" type="submit">Отправить</button></div>
        </div>
      </form>
    </div>
  </div>
  <div class="configurator-header row g-3 mb-3">
    <div class="col-12 col-md-8">
      <p>
        Конфигуратор не дает 100% гарантии совместимости. Наши специалисты всегда рады помочь в подборе оптимальной конфигурации.
        <a class="js-auth-popup" href=${process.env.AUTH_URL}>Авторизуйтесь</a>
        в личном кабинете, чтобы сохранить ваши конфигурации.
      </p>
    </div>
    <div class="col-12 col-md-4 d-flex justify-content-end"><button class="btn btn-secondary js-configurator-action" type="button" data-action="newConfiguration">Новая конфигурация</button></div>

  </div>
  <div class="configurator-body row g-3">
    <div class="configurator-main col col-12 col-lg-8">
      <div class="configurator-items">
        <div class="configurator-slot" id="korpus" data-strict="true" data-mandatory="true" data-compatible="true">
          <div class="configurator-item configurator-item--full" id="configurator-item-393525">
            <div class="configurator-item__category">
              Корпус компьютера
              <svg class="svg-icon svg-icon--sm text-info"><use xlink:href="/assets/img/sprites/sprite.svg#ui--correct-sm"></use></svg>
            </div>
            <a class="btn btn-secondary btn-sm configurator-item__button" role="button" href="#">Изменить</a>
            <div class="configurator-item__product">
              <a class="configurator-item__link" href="#">
                <div class="configurator-item__image"><img src="/assets/img/content/products/393525.jpg" alt=""></div>
                <span class="configurator-item__artikul">Арт. 393525</span>
                <span class="configurator-item__title">Корпус MicroATX Minitower AeroCool CS-110-S-BK-v1 Black</span>
              </a>
              <div class="configurator-item__badges"></div>
            </div>
            <div class="configurator-item__price">
              2 420&nbsp;₽
              <div class="configurator-item__bonus">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus"></use></svg>
                12&nbsp;бонусов
              </div>
            </div>
            <div class="configurator-item__controls">
              <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="393525" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
              </button>
              <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="393525" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
              </button>
              <button class="btn btn-link btn-sm js-tooltip js-configurator-action js-configurator-action" type="button" data-tooltip-content="Удалить" data-action="remove" data-id="1600065" data-reload="Y">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--cross"></use></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="configurator-slot" id="block" data-strict="true" data-mandatory="true" data-compatible="true">
          <div class="configurator-item configurator-item--full" id="configurator-item-394969">
            <div class="configurator-item__category">
              Блок питания
              <svg class="svg-icon svg-icon--sm text-info"><use xlink:href="/assets/img/sprites/sprite.svg#ui--correct-sm"></use></svg>
            </div>
            <a class="btn btn-secondary btn-sm configurator-item__button" role="button" href="#">Изменить</a>
            <div class="configurator-item__product">
              <a class="configurator-item__link" href="#">
                <div class="configurator-item__image"><img src="/assets/img/content/products/394969.jpg" alt=""></div>
                <span class="configurator-item__artikul">Арт. 394969</span>
                <span class="configurator-item__title">Блок питания 600W ZALMAN ZM600-LX3</span>
              </a>
              <div class="configurator-item__badges"></div>
            </div>
            <div class="configurator-item__price">
              4 260&nbsp;₽
              <div class="configurator-item__bonus">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus"></use></svg>
                42&nbsp;бонуса
              </div>
            </div>
            <div class="configurator-item__controls">
              <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="394969" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
              </button>
              <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="394969" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
              </button>
              <button class="btn btn-link btn-sm js-tooltip js-configurator-action js-configurator-action" type="button" data-tooltip-content="Удалить" data-action="remove" data-id="1600065" data-reload="Y">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--cross"></use></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="configurator-slot" id="materinka" data-strict="true" data-mandatory="true" data-compatible="false">
          <div class="configurator-item configurator-item--full" id="configurator-item-232361">
            <div class="configurator-item__category">
              Материнская плата
              <svg class="svg-icon svg-icon--sm text-warning"><use xlink:href="/assets/img/sprites/sprite.svg#ui--warning-fill-sm"></use></svg>
            </div>
            <a class="btn btn-secondary btn-sm configurator-item__button" role="button" href="#">Изменить</a>
            <div class="configurator-item__product">
              <a class="configurator-item__link" href="#">
                <div class="configurator-item__image"><img src="/assets/img/content/products/232361.jpg" alt=""></div>
                <span class="configurator-item__artikul">Арт. 232361</span>
                <span class="configurator-item__title">Материнская плата ASUS Prime H310M-K R2.0 H310 Socket-1151v2 2xDDR4, 4xSATA3, 1xPCI-E16x, 2xUSB3.1, D-Sub, DVI-D, Glan, mATX</span>
              </a>
              <div class="configurator-item__badges">
                <div class="badge fs-5 p-1 text-bg-warning js-tooltip" data-tooltip-content="Не совместим с:<br/>Процессор Intel Core i5-8400, 2.8ГГц, (Turbo 4ГГц), 6-ядерный, L3 9МБ, LGA1151v2, OEM">Не совместим</div>
              </div>
            </div>
            <div class="configurator-item__price">
              6 010&nbsp;₽
              <div class="configurator-item__bonus">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus"></use></svg>
                30&nbsp;бонусов
              </div>
            </div>
            <div class="configurator-item__controls">
              <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="232361" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
              </button>
              <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="232361" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
              </button>
              <button class="btn btn-link btn-sm js-tooltip js-configurator-action js-configurator-action" type="button" data-tooltip-content="Удалить" data-action="remove" data-id="1600065" data-reload="Y">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--cross"></use></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="configurator-slot" id="processor" data-strict="true" data-mandatory="true" data-compatible="false">
          <div class="configurator-item configurator-item--full" id="configurator-item-215648">
            <div class="configurator-item__category">
              Процессор
              <svg class="svg-icon svg-icon--sm text-warning"><use xlink:href="/assets/img/sprites/sprite.svg#ui--warning-fill-sm"></use></svg>
            </div>
            <a class="btn btn-secondary btn-sm configurator-item__button" role="button" href="#">Изменить</a>
            <div class="configurator-item__product">
              <a class="configurator-item__link" href="#">
                <div class="configurator-item__image"><img src="/assets/img/content/products/215648.jpg" alt=""></div>
                <span class="configurator-item__artikul">Арт. 215648</span>
                <span class="configurator-item__title">Процессор Intel Core i5-8400, 2.8ГГц, (Turbo 4ГГц), 6-ядерный, L3 9МБ, LGA1151v2, OEM</span>
              </a>
              <div class="configurator-item__badges">
                <div class="badge fs-5 p-1 text-bg-warning js-tooltip" data-tooltip-content="Не совместим с:<br/>Материнская плата ASUS Prime H310M-K R2.0 H310 Socket-1151v2 2xDDR4, 4xSATA3, 1xPCI-E16x, 2xUSB3.1, D-Sub, DVI-D, Glan, mATX">
                  Не совместим
                </div>
              </div>
            </div>
            <div class="configurator-item__price">
              14 740&nbsp;₽
              <div class="configurator-item__bonus">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus"></use></svg>
                73&nbsp;бонуса
              </div>
            </div>
            <div class="configurator-item__controls">
              <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="215648" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
              </button>
              <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="215648" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
              </button>
              <button class="btn btn-link btn-sm js-tooltip js-configurator-action js-configurator-action" type="button" data-tooltip-content="Удалить" data-action="remove" data-id="1600065" data-reload="Y">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--cross"></use></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="configurator-slot" id="memory" data-strict="true" data-mandatory="true" data-compatible="true">
          <div class="configurator-item configurator-item--full" id="configurator-item-239240">
            <div class="configurator-item__category">
              Оперативная память
              <svg class="svg-icon svg-icon--sm text-info"><use xlink:href="/assets/img/sprites/sprite.svg#ui--correct-sm"></use></svg>
            </div>
            <a class="btn btn-secondary btn-sm configurator-item__button" role="button" href="#">Изменить</a>
            <div class="configurator-item__product">
              <a class="configurator-item__link" href="#">
                <div class="configurator-item__image"><img src="/assets/img/content/products/239240.jpg" alt=""></div>
                <span class="configurator-item__artikul">Арт. 239240</span>
                <span class="configurator-item__title">Модуль памяти DIMM 8Gb DDR4 PC21300 2666MHz PATRIOT (PSD48G266681)</span>
              </a>
              <div class="configurator-item__badges"></div>
            </div>
            <div class="configurator-item__quantity">
              <select class="js-configurator-action" id="quantity-239240" name="quantity-239240">
                <option data-id="239240" data-reload="Y" data-list="configurator" data-action="setQuantity" data-quantity="3">3</option>
                <option data-id="239240" data-reload="Y" data-list="configurator" data-action="setQuantity" data-quantity="2" selected="">2</option>
                <option data-id="239240" data-reload="Y" data-list="configurator" data-action="setQuantity" data-quantity="1">1</option>
              </select>
            </div>
            <div class="configurator-item__price">
              1 900&nbsp;₽
              <div class="configurator-item__bonus">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus"></use></svg>
                9&nbsp;бонусов
              </div>
            </div>
            <div class="configurator-item__controls">
              <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="239240" data-list="comparison" data-action="ADD_TO_COMPARE_LIST" data-tooltip-content="В сравнение">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--comparison"></use></svg>
              </button>
              <button class="btn btn-link btn-sm js-tooltip js-add-to-list" type="button" data-id="239240" data-list="favorites" data-action="add" data-tooltip-content="В избранное">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--heart"></use></svg>
              </button>
              <button class="btn btn-link btn-sm js-tooltip js-configurator-action js-configurator-action" type="button" data-tooltip-content="Удалить" data-action="remove" data-id="1600065" data-reload="Y">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--cross"></use></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="configurator-slot" id="cooler" data-strict="false" data-mandatory="true" data-compatible="true">
          <div class="configurator-item configurator-item--empty">
            <div class="configurator-item__category">Кулер для процессора</div>
            <div class="configurator-item__image">
              <svg class="svg-icon svg-icon--2xl"><use xlink:href="/assets/img/sprites/sprite.svg#configurator--kuler"></use></svg>
            </div>
            <div class="configurator-item__placeholder">
              Кулер иногда поставляется вместе с процессором, но чаще его нужно выбрать отдельно. Чем мощнее процессор, тем лучше нужно продумать систему охлаждения. Для экстремальных сборок можно использовать жидкостные кулеры. Учитывайте
              размеры корпуса при подборе.
            </div>
            <a class="btn btn-secondary btn-sm configurator-item__button" href="#" role="button">Выбрать</a>
          </div>
        </div>
        <div class="configurator-slot" id="hdd" data-strict="false" data-mandatory="true" data-compatible="true">
          <div class="configurator-item configurator-item--empty">
            <div class="configurator-item__category">Жесткий диск</div>
            <div class="configurator-item__image">
              <svg class="svg-icon svg-icon--2xl"><use xlink:href="/assets/img/sprites/sprite.svg#configurator--jesky-disk"></use></svg>
            </div>
            <div class="configurator-item__placeholder">Жесткий диск (HDD) служит для хранения ваших программ и файлов. Диски размером 3.5" могут иметь объем более 10ТБ, диски размером 2.5" используются в компактных корпусах.</div>
            <a class="btn btn-secondary btn-sm configurator-item__button" href="#" role="button">Выбрать</a>
          </div>
        </div>
        <div class="configurator-slot" id="ssd" data-strict="false" data-mandatory="true" data-compatible="true">
          <div class="configurator-item configurator-item--empty">
            <div class="configurator-item__category">SSD накопитель</div>
            <div class="configurator-item__image">
              <svg class="svg-icon svg-icon--2xl"><use xlink:href="/assets/img/sprites/sprite.svg#configurator--ssd"></use></svg>
            </div>
            <div class="configurator-item__placeholder">
              Твердотельные накопители (SSD) значительно превосходят по скорости жесткие диски, не шумят и потребляют меньше энергии. И, хотя их цена, как правило выше обычных дисков, лучше использовать именно SSD хотя бы для размещения
              операционной системы компьютера.
            </div>
            <a class="btn btn-secondary btn-sm configurator-item__button" href="#" role="button">Выбрать</a>
          </div>
        </div>
        <div class="configurator-slot" id="video" data-strict="false" data-mandatory="true" data-compatible="true">
          <div class="configurator-item configurator-item--empty">
            <div class="configurator-item__category">Видеокарта</div>
            <div class="configurator-item__image">
              <svg class="svg-icon svg-icon--2xl"><use xlink:href="/assets/img/sprites/sprite.svg#configurator--videokarta"></use></svg>
            </div>
            <div class="configurator-item__placeholder">
              Если будете играть на ПК в игры, без хорошей видеокарты не обойтись! А еще мощная видеокарта (GPU) поможет в работе с графическими приложениями или программировании систем искусственного интеллекта.
            </div>
            <a class="btn btn-secondary btn-sm configurator-item__button" href="#" role="button">Выбрать</a>
          </div>
        </div>
        <div class="configurator-slot" id="dvd" data-strict="false" data-mandatory="true" data-compatible="true">
          <div class="configurator-item configurator-item--empty">
            <div class="configurator-item__category">DVD-привод</div>
            <div class="configurator-item__image">
              <svg class="svg-icon svg-icon--2xl"><use xlink:href="/assets/img/sprites/sprite.svg#configurator--dvd"></use></svg>
            </div>
            <div class="configurator-item__placeholder">Оптический привод позволит читать CD или DVD диски (часть программ до сих пор на них поставляются). Также вы сможете записывать свои данные на диски для архива (резервной копии).</div>
            <a class="btn btn-secondary btn-sm configurator-item__button" href="#" role="button">Выбрать</a>
          </div>
        </div>
        <div class="configurator-slot configurator-slot--special bg-dark" id="assembly">
          <div class="configurator-item configurator-item--special">
            <div class="configurator-item__category">Сборка</div>
            <div class="configurator-item__custom">
              <div class="configurator-item__image">
                <svg class="svg-icon svg-icon--2xl"><use xlink:href="/assets/img/sprites/sprite.svg#ui--gear"></use></svg>
              </div>
              <div class="configurator-item__title">Сборка системного блока с водяным охлаждением</div>
            </div>
            <div class="configurator-item__price">1 990 ₽</div>
          </div>
        </div>
        <div class="configurator-slot configurator-slot--special bg-info" id="os">
          <div class="configurator-item configurator-item--special">
            <span class="configurator-item__category">Операционная система</span>
            <div class="configurator-item__custom">
              <div class="configurator-item__image">
                <svg class="svg-icon svg-icon--2xl text-white"><use xlink:href="/assets/img/sprites/sprite.svg#ui--windows"></use></svg>
              </div>
              <select class="js-configurator-action">
                <option value="0" data-action="remove" data-id="0" data-reload="Y" data-list="configurator" data-type="os">Нет</option>
                <option value="1524833" data-action="add" data-id="1524833" data-reload="Y" data-type="os" selected>Windows 10 Pro 64bit DVD OEM ENG</option>
                <option value="1305852" data-action="add" data-id="1305852" data-reload="Y" data-type="os">Windows 10 Pro 64bit DVD OEM RU FQC-08909</option>
                <option value="1619702" data-action="add" data-id="1619702" data-reload="Y" data-type="os">Windows 11 Pro 64-bit Russian 1pk DSP OEI DVD (FQC-10547)</option>
                <option value="1647708" data-action="add" data-id="1647708" data-reload="Y" data-type="os">Windows 11 Pro 64bit DVD OEM ENG</option>
              </select>
            </div>
            <div class="configurator-item__price">13 580 ₽</div>
          </div>
        </div>
      </div>
      <div class="accordion js-accordion mb-3 mb-lg-5">
        <div class="accordion-item js-accordion-item">
          <div class="accordion-header js-accordion-header"><span class="lead">Дополнительные компоненты</span></div>
          <div class="accordion-body js-accordion-body">
            <ul class="configurator-additional__list">
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Мониторы</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Колонки</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Аксессуары для корпусов</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Мыши</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Гарнитуры для ПК</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Системы охлаждения</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Коврики для мышей</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Наушники</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Карты видеозахвата и ТВ-Тюнеры</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Клавиатуры</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Микрофоны</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Звуковые карты</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Комплекты</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Веб камеры</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Маршрутизаторы (Роутеры)</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Игровые манипуляторы</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Графические планшеты</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Wi-Fi адаптеры и карты</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">МФУ</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Приводы внешние</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Принтер</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Кресла для геймеров</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Кард ридеры внешние</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Сканеры</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">USB концентраторы (HUB)</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Программы</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Кронштейны для мониторов</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Док-станции для накопителей</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Антивирусы</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Сетевые фильтры и удлинители</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Внешние жесткие диски (HDD)</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Кресла и стулья</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">ИБП</a></li>
              <li class="configurator-additional__item"><a class="configurator-additional__link btn btn-secondary btn-sm w-100" href="#">Внешние накопители (SSD)</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="configurator-plate d-none d-lg-block">
        <ul class="configurator-estimate">
          <li class="configurator-estimate__item">
            <span class="configurator-estimate__item-name">Стоимость компонентов</span>
            <span class="configurator-estimate__item-cost">9 950 ₽</span>
          </li>
          <li class="configurator-estimate__item">
            <span class="configurator-estimate__item-name">Сборка</span>
            <span class="configurator-estimate__item-cost">990 ₽</span>
          </li>
        </ul>
        <hr>
        <div class="row g-3">
          <div class="col-12 col-lg-6">
            <div class="d-flex align-items-center fs-5 mb-0">
              <svg class="svg-icon svg-icon--sm text-success"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shield-sm"></use></svg>
              &ensp;Гарантия: 2 года при заказе сборки
            </div>
          </div>
          <div class="col col-lg-6">
            <div class="configurator-total">
              <span class="configurator-total__text">Итоговая стоимость:</span>
              <span class="configurator-total__price js-configurator-total">33 130&nbsp;₽</span>
              <div class="configurator-total__bonus">
                <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus"></use></svg>
                184&nbsp;бонуса
              </div>
            </div>
            <button class="btn btn-primary w-100 js-configurator-action" type="button" data-action="addToBasket" data-id="1600065" data-reload="Y" data-type="service">Добавить в корзину</button>
          </div>
        </div>
      </div>
    </div>
    <div class="configurator-aside col col-12 col-lg-4">
      <div class="configurator-aside__inner">
        <div class="row g-3">
          <div class="col col-12">
            <div class="configurator-plate">
              <div class="row">
                <div class="col col-sm-12 col-md-6 col-lg-12">
                  <p class="fw-medium">Конфигурация</p>
                  <div class="configurator-status alert js-configurator-status"></div>
                  <progress class="configurator-progress mb-3 js-configurator-progress" min="0" max="100" value="0"></progress>
                  <a class="btn btn-secondary w-100 text-center" href="#popup-expert-request" data-fancybox="" role="button">Бесплатная оценка специалиста</a>
                </div>
                <div class="col col-sm-12 col-md-6 col-lg-12">
                  <hr class="d-none d-lg-block">
                  <ul class="configurator-estimate">
                    <li class="configurator-estimate__item">
                      <span class="configurator-estimate__item-name">Стоимость компонентов</span>
                      <span class="configurator-estimate__item-cost">9 950 ₽</span>
                    </li>
                    <li class="configurator-estimate__item">
                      <span class="configurator-estimate__item-name">Сборка</span>
                      <span class="configurator-estimate__item-cost">990 ₽</span>
                    </li>
                  </ul>
                  <div class="configurator-total">
                    <span class="configurator-total__text">Итоговая стоимость:</span>
                    <span class="configurator-total__price js-configurator-total">33 130&nbsp;₽</span>
                    <div class="configurator-total__bonus">
                      <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--bonus"></use></svg>
                      184&nbsp;бонуса
                    </div>
                  </div>
                  <button class="btn btn-primary w-100 js-configurator-action" type="button" data-action="addToBasket" data-id="1600065" data-reload="Y" data-type="service">Добавить в корзину</button>
                  <div class="d-flex align-items-center fs-5 mb-0 mt-3">
                    <svg class="svg-icon svg-icon--sm text-success"><use xlink:href="/assets/img/sprites/sprite.svg#ui--shield-sm"></use></svg>
                    &ensp;Гарантия: 2 года при заказе сборки
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col col-sm-12 col-md-6 col-lg-12">
            <div class="configurator-plate">
              <p class="fw-medium">Сохранить конфигурацию</p>
              <form class="form form-configuration-save" id="form-configuration-save" data-reset="true" novalidate="">
                <p class="form-error text-danger fw-bold" style="display: none"></p>
                <div class="field field--type-text mb-3">
                  <div class="field__field"><input class="form-control" type="text" id="cofiguratorName" value="Конфигурация #1600065" required="required"></div>
                </div>
                <button class="btn btn-success configurator-save js-configurator-action" type="button" data-action="saveConfiguration" data-id="1600065">Сохранить</button>
                <button class="btn btn-secondary js-tooltip js-copy-link" type="button" icon-size="md" data-tooltip-title="Копировать ссылку" data-copy-link-tooltip="Ссылка скопирована">
                  <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--copy-link"></use></svg>
                </button>
                <a class="btn btn-secondary js-tooltip" href="#popup-configuration-mail" icon-size="md" data-tooltip-title="Отправить на почту" data-fancybox="" role="button">
                  <svg class="svg-icon svg-icon--sm"><use xlink:href="/assets/img/sprites/sprite.svg#ui--mail"></use></svg>
                </a>
              </form>
            </div>
          </div>
          <div class="col col-sm-12 col-md-6 col-lg-12">
            <div class="configurator-plate">
              <p class="fw-medium">Мои конфигурации</p>
              <div class="list-group fs-4 mb-3">
                <a class="list-group-item list-group-item-action list-group-item-light js-configurator-action" href="#" data-action="switchConfiguration" data-id="1854327">🛠 Конфигурация #1854327</a>
                <a class="list-group-item list-group-item-action list-group-item-light js-configurator-action" href="#" data-action="switchConfiguration" data-id="3133769420">🍔 Конфигурация #3133769420</a>
                <a class="list-group-item list-group-item-action list-group-item-light js-configurator-action" href="#" data-action="switchConfiguration" data-id="4815162342">Конфигурация #4815162342</a>
              </div>
              <p class="mb-0 fs-4"><a href="/personal-configurations.html">Посмотреть все конфигурации</a></p>
            </div>
          </div>
          <div class="col col-12">
            <div class="configurator-plate">
              <p class="fw-medium">Поделиться в соц. сетях</p>
              <div class="social-buttons">
                <a class="social-button" href="#"><img class="social-button__img" src="/assets/img/icons/vk.svg" alt="vk"></a>
                <a class="social-button" href="#"><img class="social-button__img" src="/assets/img/icons/tg.svg" alt="telegram"></a>
                <a class="social-button" href="#"><img class="social-button__img" src="/assets/img/icons/google.svg" alt="google"></a>
                <a class="social-button" href="#"><img class="social-button__img" src="/assets/img/icons/tinkoffId.svg" alt="tinkoffId"></a>
                <a class="social-button" href="#"><img class="social-button__img" src="/assets/img/icons/yandex.svg" alt="yandex"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`