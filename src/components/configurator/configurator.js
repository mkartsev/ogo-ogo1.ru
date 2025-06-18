import Toastify from "toastify-js"
import { removeClassesByPrefix } from "@scripts/utils/class.js"
import { fetchData } from "@scripts/utils/fetch.js"
import { stringToHTML } from "@scripts/utils/string-to-html.js"
import cart from "@components/cart/cart.js"
import popup from "@components/popup/popup.js"
import preloader from "@components/preloader/preloader.js"
import userList from "@components/user-list/user-list.js"

class Configurator {
  constructor() {
    this.configurator = document.querySelector("#configurator")
    this.isConfiguratorPage = !!this.configurator

    this.ui = {
      progress: ".js-configurator-progress",
      status: ".js-configurator-status",
      action: ".js-configurator-action",
      total: ".js-configurator-total",
    }

    // Сохраняем ссылки на обработчики событий
    this.clickHandler = this.#clickHandler.bind(this)
    this.changeHandler = this.#changeHandler.bind(this)

    this.#bindHandlers()
  }

  #getItems() {
    return [...document.querySelectorAll(".configurator-slot:not(.configurator-slot--special)")]
  }

  #checkItems(callback) {
    if (!this.isConfiguratorPage) return false
    return callback.call(this)
  }

  /**
   * Проверяет заполнены ли все обязательные элементы в конфигураторе.
   * @returns {boolean} Возвращает false, если все обязательные элементы заполнены, иначе true.
   */
  #isStrict() {
    // Если на каком-то слоте есть data-strict="true" и НЕТ заполненного элемента возвращаем true
    return this.#checkItems(() => {
      return this.#getItems().some(el => el.dataset.strict === "true" && !el.querySelector(".configurator-item--full"))
    })
  }

  /**
   * Проверяет совместимы ли элементы в конфигураторе.
   * @returns {boolean} Возвращает true, если все элементы совместимы, иначе false.
   */
  #isCompatible() {
    // Если нет слотов, у которых есть data-compatible="false" и ЕСТЬ заполненный элемент возвращаем true
    return this.#checkItems(() => {
      return !this.#getItems().some(el =>
        el.dataset.compatible === "false" && el.querySelector(".configurator-item--full")
      )
    })
  }

  /**
   * Проверяет заполнены ли все обязательные элементы и нет ли несовместимых.
   * strict() нам нужен false потому, что это значит что заполнены все обязательные элементы
   * @returns {boolean} Возвращает true, если все обязательные элементы заполнены и нет несовместимых.
   */
  #isComplete() {
    return this.#checkItems(() => {
      return !this.#isStrict() && this.#isCompatible()
    })
  }

  /**
   * Обновляет значение и класс прогресс-бара в зависимости от заполненности элементов.
   */
  #setProgress() {
    if (!this.isConfiguratorPage) return

    const progressBar = document.querySelector(this.ui.progress)
    if (!progressBar) return

    const items = this.#getItems()
    // Считаем только элементы с атрибутом data-mandatory=true
    // мониторы, наушники и т.д. сюда не должны попадать, слоты с ними должны иметь data-mandatory=false
    const itemsSelected = items.filter(item =>
      item.dataset.mandatory === "true" && item.querySelector(".configurator-item--full")
    ).length

    progressBar.value = Math.round((itemsSelected * 100) / items.length)

    progressBar.classList.toggle("is-strict", this.#isStrict())
    progressBar.classList.toggle("is-incompatible", !this.#isCompatible())
  }

  /**
   * Обновляет статус около прогресс-бара в зависимости от заполненности элементов.
   */
  #setStatus() {
    if (!this.isConfiguratorPage) return

    const status = document.querySelector(this.ui.status)
    if (!status) return

    status.classList.add("d-block")

    removeClassesByPrefix(status, "alert-")
    if (this.#isStrict()) {
      status.classList.add("alert-danger")
      status.textContent = "Выбраны не все обязательные компоненты"
    } else if (!this.#isCompatible()) {
      status.classList.add("alert-warning")
      status.textContent = "Есть несовместимые компоненты"
    } else if (this.#isComplete()) {
      status.classList.add("alert-info")
      status.textContent = "Хороший выбор!"
    }
  }

  /**
   * По клику выполняем экшн, передаем ему кликнутый элемент
   */
  #clickHandler = async (e) => {
    const actionEl = e.target.closest(this.ui.action)

    if (e.target.tagName === "SELECT") return

    if (actionEl) {
      e.preventDefault()
      await this.#actionHandler(actionEl)
    }

    if (this.isConfiguratorPage) {
      const strictButton = e.target.closest(".js-check-strict")
      const compatibleButton = e.target.closest(".js-check-compatible")

      if (strictButton) {
        e.preventDefault()
        console.log("Обязательные заполнены: " + !this.#isStrict())
      }

      if (compatibleButton) {
        e.preventDefault()
        console.log("Все совместимы: " + this.#isCompatible())
      }
    }
  }

  /**
   * По изменению селекта выполняем экшн, передаем ему выбранную опцию
   * На ней ожидаем атрибуты data-action="setQuantity" data-reload="Y" data-list="configurator" data-quantity="123""
   */
  #changeHandler = async (e) => {
    const actionEl = e.target.closest(this.ui.action)
    if (actionEl) {
      e.preventDefault()
      let selected = actionEl.options[actionEl.selectedIndex]
      return await this.#actionHandler(selected)
    }
  }

  /**
   * Отправляет экшн из data- атрибутов на элементе и в ответ получает ссылку, из которой забирает html блок конфигуратора
   * или ссылку на которую будет переход
   * @param {*} element Ссылка, кнопка или селект с действием конфигуратора ("add", "remove", "setQuantity", "addToBasket", "saveConfiguration", "newConfiguration", "switchConfiguration")
   * @returns
   */
  #actionHandler = async (element) => {
    let id, action, reload, rowType, quantity, nameHolder, name, configuratorId

    id = element.dataset.id
    action = element.dataset.action
    reload = element.dataset.reload
    rowType = element.dataset.type
    quantity = element.dataset.quantity

    nameHolder = document.getElementById("cofiguratorName")
    configuratorId = document.getElementById("cofiguratorId")?.value
    name = nameHolder ? nameHolder.value : ""

    if (action === "switchConfiguration" && !configuratorId && id) {
      configuratorId = id
    }

    if (element.classList.contains("disabled") || element.disabled) {
      return
    }

    // if (action == "addToBasket" && !mandatory()) {
    //   return;
    // }

    let data = {}

    // Добавляем ключи в объект только если значения не пустые
    if (id) data.id = id
    if (action) data.action = action
    if (rowType) data.row_type = rowType
    if (quantity) data.quantity = quantity
    if (name) data.name = name
    if (reload) data.reload = reload
    if (configuratorId) data.configurator = configuratorId

    preloader.show()

    await fetchData(process.env.CONFIGURATOR_ACTIONS, "POST", data)
      .then((response) => {
        // Если data-action="addToBasket"
        // Тут попап добавления в корзину без товаров внутри
        if (action == "addToBasket") {
          popup.show("popup-add-to-cart--configurator")
          cart.refreshDropdown()
        }

        // Если data-reload="Y" и приходит непустой url
        if (reload == "Y" && response.url && response.url.length > 0) {
          // если пришло mustRedirect=true, то переходим по url
          // иначе получаем блок конфигуратора аяксом
          if (response.mustRedirect) {
            window.location.href = response.url
          } else {
            this.#ajaxConfigurator(response.url)
          }
        } else {
          if (response.result == "ok") {
            if (response.url)
              window.location.href = response.url
          } else if (response.result == "error" && action == "saveConfiguration") {
            // Раньше был целый попап с ошибкой, теперь покажем тост
            Toastify({
              text: response.error,
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
              className: "fs-4 bg-danger bg-gradient",
            }).showToast()
          }
        }
      })
      .catch((error) => {
        // сетевые ошибки
        Toastify({
          text: error.message,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          className: "fs-4 bg-danger bg-gradient",
        }).showToast()
      })
      .finally(() => {
        preloader.hide()
      })
  }

  /**
   * Получает аяксом всю страницу конфигуратора, т.к. url приходит от actionHandler() в виде /configurator/edit/123456, а там вся страница
   * @param {string} url адрес для запроса конфигуратора
   */
  #ajaxConfigurator = async (url) => {
    if (url && url.length > 0) {
      await fetchData(url, "GET")
        .then((response) => {
          this.#updateConfiguratorHTML(response)
        })
        .then(() => {
          this.#setProgress()
          this.#setStatus()
          userList.setButtons()
        })
        .catch((error) => {
          // сетевые ошибки
          Toastify({
            text: error.message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            className: "fs-4 bg-danger bg-gradient",
          }).showToast()
        })
        .finally(() => {
          preloader.hide()
        })
    }
  }

  /**
   * Берет html и по частям обновляет блоки конфигуратоа
   * @param {string} строка с нужными блоками конфигуратора
   */
  #updateConfiguratorHTML(string) {
    // Парсим строку и делаем html
    const ajaxResult = stringToHTML(string)

    // Обновляем конфигуратор по селекторам.
    // Но почему? Потому что таков путь
    const selectors = [
      ".configurator-items",            // Товары со сборкой и ОС
      ".configurator-additional__list", // Доп компоненты
      ".configurator-total__price",     // Сумма итого
      ".configurator-total__bonus",     // Сумма бонусов
      ".configurator-estimate",         // Предварительная цена
      ".configurator-save",             // Кнопка сохранить, после запуска новой кинфигурации, айди на кнопке должен быть новый
      "#popup-expert-request",          // попап запроса эксперта
    ]

    selectors.forEach(selector => {
      const currentElement = document.querySelectorAll(selector)
      const newContent = ajaxResult.querySelector(selector)
      if (currentElement && newContent) {
        currentElement.forEach(el => el.innerHTML = newContent.innerHTML)
      }
    })

    // Такое было подключено раньше, там обновление интерфейса
    // bitrix/components/ogo/configurator.items/templates/configurator_items/script.js
    // configurator()
  }

  #bindHandlers() {
    document.addEventListener("click", this.clickHandler)
    document.addEventListener("change", this.changeHandler)
  }

  init() {
    if (this.isConfiguratorPage) {
      this.#setProgress()
      this.#setStatus()
    }
  }

  destroy() {
    // Удаляем обработчики событий
    document.removeEventListener("click", this.clickHandler)
    document.removeEventListener("change", this.changeHandler)

    // Очищаем ссылки на DOM-элементы
    this.configurator = null
    this.items = null

    // Очищаем другие свойства
    this.ui = null
    this.isConfiguratorPage = null
  }
}

const configurator = new Configurator()
export default configurator