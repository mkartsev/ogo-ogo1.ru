import $ from "jquery"
import "jquery-validation"
import Toastify from "toastify-js"
import noUiSlider from "nouislider"
import wNumb from "wnumb"
import { Fancybox } from "@fancyapps/ui"
import { ru } from "@scripts/plugins/fancybox.ru.js"
import { setIcon } from "@scripts/shared/set-icon.js"
import { resetIcon } from "@scripts/shared/reset-icon.js"
import { fetchData } from "@scripts/utils/fetch.js"
import cart from "@components/cart/cart.js"
import popup from "@components/popup/popup.js"
import userList from "@components/user-list/user-list.js"

const forms = (() => {
  const ui = {
    selector: "form",
    populate: ".js-populate-form",
    rangeSlider: ".js-range-slider"
  }

  let state = {
    initialized: false,
  }

  function setDefaults() {
    if (!state.initialized) {
      $.validator.setDefaults({
        errorPlacement: function (error, element) {
          if (element.closest(".field").length) {
            element.closest(".field").append(error)
          } else {
            element.parent().append(error)
          }
        },
      })
      $.validator.addMethod("phone", function (value, element) {
        // var phone = value.replace(/\D/g, "")
        return this.optional(element) || /^(\+7[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/.test(value)
      })
      $.validator.addMethod("phoneint", function (value, element) {
        var phone = value.replace(/\D/g, "")
        return this.optional(element) || phone.length >= 11
      })
      $.validator.addMethod("email", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      })
      $.validator.addMethod("inn", function (value, element) {
        return this.optional(element) || /^\d{10,12}$/.test(value)
      })
      $.validator.addMethod("kpp", function (value, element) {
        return this.optional(element) || /^\d{9}$/.test(value)
      })
      $.validator.addMethod("rs", function (value, element) {
        return this.optional(element) || /^\d{20}$/.test(value)
      })
      $.validator.addMethod("bic", function (value, element) {
        return this.optional(element) || /^\d{9}$/.test(value)
      })
      $.validator.addMethod("coupon", function (value, element) {
        return this.optional(element) || /^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
      })

      $.extend($.validator.messages, {
        //remote: "Сообщение для валидации на сервере, правило нигде не используется",
        required: "Заполните поле",
        email: "Введите корректный email",
        phone: "Введите корректный номер телефона",
        phoneint: "Введите корректный номер телефона",
        inn: "ИНН состоит из 10 или 12 цифр",
        kpp: "КПП состоит из 9 цифр",
        rs: "Номер счета состоит из 20 цифр",
        bic: "БИК состоит из 9 цифр",
        coupon: "Ошибка! Купон не найден или истек его срок использования",
        url: "Введите верный url",
        date: "Введите верную дату",
        number: "Введите число",
        digits: "Только цифры",
        equalTo: "Поля не совпадают",
        accept: "Значение не подходит", // Для регулярок
        maxlength: $.validator.format("Введите не более {0} символов"),
        minlength: $.validator.format("Введите не менее {0} символов"),
        rangelength: $.validator.format("Введите от {0} до {1} символов"),
        range: $.validator.format("Введите значение от {0} до {1}"),
        max: $.validator.format("Введите значение не больше {0}"),
        min: $.validator.format("Введите значение не меньше {0}"),
      })
    }
  }

  function initValidator() {
    const forms = document.querySelectorAll(ui.selector)

    if (forms.length > 0) {
      forms.forEach((el) => {
        let validate = el.getAttribute("data-validate"),
          ajaxSubmit = el.getAttribute("data-ajax-submit")

        let isInitialized = el.getAttribute("data-initialized") === "true"

        if (!isInitialized) {
          if (validate === "false" && ajaxSubmit === "false") {
            // Оба атрибута явно установлены в false
            // Никаких действий не требуется
          } else if (validate === "false" && ajaxSubmit !== "false") {
            // validate явно установлен в false, ajaxSubmit - любое truthy значение
            el.addEventListener("submit", (e) => {
              e.preventDefault()
              handleFormSubmit(el)
            })
          } else if (validate !== "false" && ajaxSubmit === "false") {
            // validate - любое значение, кроме false, ajaxSubmit явно установлен в false
            $(el).validate({
              ignore: "hidden",
              submitHandler: function (form) {
                form.submit()
              }
            })
          } else {
            // validate и ajaxSubmit - любые значения, кроме false
            $(el).validate({
              submitHandler: function (form) {
                handleFormSubmit(form)
                return false
              }
            })
          }

          el.setAttribute("data-initialized", "true")

          // Добавим событие "change" для всех инптуов в форме при ресете
          el.addEventListener("reset", (e) => {
            Array.from(e.target.elements).forEach((input) => {
              input.dispatchEvent(new Event("change", { bubbles: true }))
            })
          })
        }
      })
    }
  }

  // TODO: Перенести функционал rangeslider в отдельный компонент, куда-нибудь в fields?
  const rangeSliderObservers = new WeakMap()

  function initRangeSlider() {
    const rangeSliders = document.querySelectorAll(ui.rangeSlider)

    if (rangeSliders.length > 0) {
      rangeSliders.forEach((slider) => {
        setupRangeSlider(slider)
      })
    }
  }

  function setupRangeSlider(slider) {
    const rangeMinInput = document.getElementById(slider.dataset.rangeMin)
    const rangeMaxInput = document.getElementById(slider.dataset.rangeMax)
    const inputs = [rangeMinInput, rangeMaxInput]

    function updateSliderOptions() {
      let start = rangeMinInput ? rangeMinInput.value : (slider.getAttribute("data-start") || 1)
      let end = rangeMaxInput ? rangeMaxInput.value : (slider.getAttribute("data-end") || 100)
      let min = rangeMinInput ? rangeMinInput.getAttribute("min") : (slider.getAttribute("data-min") || 1)
      let max = rangeMaxInput ? rangeMaxInput.getAttribute("max") : (slider.getAttribute("data-max") || 100)
      let step = slider.getAttribute("data-step") || 1

      let options = {
        animate: true,
        behaviour: "tap-snap",
        connect: true,
        format: wNumb({
          mark: ".",
        }),
        snap: false,
        range: {
          "min": Number(min),
          "max": Number(max)
        },
        step: Number(step),
        start: [Number(start), Number(end)],
      }

      if (slider.noUiSlider) {
        slider.noUiSlider.updateOptions(options, true)
      } else {
        noUiSlider.create(slider, options)

        /**
         * События запускаются в таком порядке:
         * 'start' > 'slide' > 'drag' > 'update' > 'change' > 'set' > 'end'
         *
         * Аргументы для событий такие:
         * function doSomething(values, handle, unencoded, tap, positions, noUiSlider) {
         *   values: Current slider values (array);
         *   handle: Handle that caused the event (number);
         *   unencoded: Slider values without formatting (array);
         *   tap: Event was caused by the user tapping the slider (boolean);
         *   positions: Left offset of the handles (array);
         *   noUiSlider: slider public Api (noUiSlider);
         * }
         */
        slider.noUiSlider.on("slide", function (values, handle, unencoded) {
          inputs[handle].value = Math.round((Number(unencoded[handle]) + Number.EPSILON).toFixed(2) * 100) / 100
        })

        slider.noUiSlider.on("end", function (values, handle) {
          inputs[handle].dispatchEvent(new Event("change", { cancelable: true, bubbles: false }))
        })
      }
    }

    updateSliderOptions()

    // Создаем MutationObserver только если он еще не существует для этого слайдера
    // При изменении атрибутов min, max будут обновлены настройки слайдера
    if (!rangeSliderObservers.has(slider)) {
      const observerConfig = { attributes: true, attributeFilter: ["min", "max"] }
      const observer = new MutationObserver(() => updateSliderOptions())

      rangeSliderObservers.set(slider, observer)

      if (rangeMinInput) {
        observer.observe(rangeMinInput, observerConfig)
        rangeMinInput.addEventListener("change", function () {
          if (slider.noUiSlider) {
            slider.noUiSlider.set([this.value, null], true, true)
          }
        })
      }

      if (rangeMaxInput) {
        observer.observe(rangeMaxInput, observerConfig)
        rangeMaxInput.addEventListener("change", function () {
          if (slider.noUiSlider) {
            slider.noUiSlider.set([null, this.value], true, true)
          }
        })
      }
    }
  }

  /**
  * Заполняем поля формы данными из атрибута data-values элемента-триггера.
  * data-values должен быть валидным JSON, например data-values='{"name": "value"}'
  * multiselect, файлы и чекбоксы пока не учитываются
  */
  function populateForm(el) {
    // Получаем форму по ее айди из атрибута data-form элемента-триггера
    const form = document.getElementById(el.getAttribute("data-form"))

    // Получаем данные для заполнения из атрибута data-values элемента-триггера
    const formData = JSON.parse(el.getAttribute("data-values"))

    if (!form || !formData) return

    const formFields = form.querySelectorAll("input, textarea, select")

    formFields.forEach(field => {
      // Получаем имя поля
      const fieldName = field.name

      // Если в данных для заполнения есть значение для этого поля
      if (fieldName in formData) {
        // Заполняем поле значением из данных
        field.value = formData[fieldName]
      }
    })
  }

  async function handleFormSubmit(form) {
    let method = form.getAttribute("method") || "GET"
    let url = form.getAttribute("action")
    let reset = form.getAttribute("data-reset")
    let errorEl = form.querySelector(".form-error")
    let submitEl = form.querySelector("[type='submit']")
    let resultWrapper = form.querySelector(".form-request-result")
    let closePopup = form.getAttribute("data-close-popup")

    let formData = () => {
      const formElements = form.elements
      let hasFiles = Array.from(formElements).some(field => field.type === "file" && field.files.length > 0)

      if (hasFiles) {
        // Если в форме есть файлы, используем FormData
        let formData = new FormData()

        for (let field of formElements) {
          if (field.name) {
            if (field.type === "file") {
              if (field.files.length > 0) {
                formData.append(field.name, field.files[0])
              }
            } else if (field.type === "checkbox") {
              formData.append(field.name, field.checked ? "1" : "0")
            } else if (field.type === "radio") {
              if (field.checked) {
                formData.append(field.name, field.value)
              }
            } else {
              formData.append(field.name, field.value)
            }
          }
        }
        return formData
      } else {
        // Если в форме нет файлов, используем URLSearchParams
        let searchParams = new URLSearchParams()
        for (let field of formElements) {
          if (field.name) {
            if (field.type === "checkbox") {
              searchParams.append(field.name, field.checked ? "1" : "0")
            } else if (field.type === "radio") {
              if (field.checked) {
                searchParams.append(field.name, field.value)
              }
            } else {
              searchParams.append(field.name, field.value)
            }
          }
        }
        return searchParams
      }
    }

    let fancybox = Fancybox.getInstance()
    let fancyboxOptions = {
      l10n: ru,
      hideScrollbar: true,
    }

    // Сначала очистим ошибки
    clearErrors(form)

    setIcon(submitEl, "ui--spinner", "spin")
    submitEl.disabled = true

    switch (true) {
      case form.classList.contains("form-auth"):
        // Логика для формы аутентификации
        await fetchData(url, method, formData())
          .then((data) => {
            if (data.result == "ok") {
              if (data.redirect) {
                window.location.href = data.redirect
              } else {
                window.location.reload()
              }
              if (reset == "true") {
                form.reset()
                errorEl.innerText = ""
                errorEl.style.display = "none"
              }
            } else if (data.result == "error") {
              if (errorEl) {
                errorEl.innerText = data.error
                errorEl.style.display = "block"
              }
            }
          })
          .catch((error) => {
            Toastify({
              text: error.message,
              duration: 5000,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
              className: "fs-4 bg-danger bg-gradient",
            }).showToast()
          })
          .finally(() => {
            if (closePopup) {
              popup.close()
            }
            resetIcon(submitEl)
            submitEl.disabled = false
          })
        break

      case form.classList.contains("form-city"):
        // Логика для формы выбора города
        await fetchData(url, method, formData())
          .then((data) => {
            if (data.result == "ok") {
              // console.log(data)
            } else if (data.result == "error") {
              // console.log(data)
            }
          })
          .catch((error) => {
            Toastify({
              text: error.message, // для сетевых ошибок текст будет в поле message
              duration: 5000,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
              className: "fs-4 bg-danger bg-gradient",
            }).showToast()
          })
          .finally(() => {
            if (closePopup) {
              popup.close()
            }
            resetIcon(submitEl)
            submitEl.disabled = false
          })
        break

      case form.classList.contains("form-recovery"):
        // Логика для формы восстановления
        await fetchData(url, method, formData())
          .then((data) => {
            if (data.result == "ok") {
              if (fancybox) Fancybox.close()
              Fancybox.show(
                [
                  {
                    src: `<div class="popup popup--md" style="display: block"><p class="popup-title">Спасибо!</p><div class="popup-content">${data.message}</div></div>`,
                    type: "html",
                  },
                ],
                fancyboxOptions
              )
              if (reset == "true") {
                form.reset()
                errorEl.innerText = ""
                errorEl.style.display = "none"
              }
            } else if (data.result == "error") {
              errorEl.innerText = data.error
              errorEl.style.display = "block"
            }
          })
          .catch((error) => {
            Toastify({
              text: error.message,
              duration: 5000,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
              className: "fs-4 bg-danger bg-gradient",
            }).showToast()
          })
          .finally(() => {
            if (closePopup) {
              popup.close()
            }
            resetIcon(submitEl)
            submitEl.disabled = false
          })
        break

      case form.classList.contains("form-service-check"):
        await fetchData(url, method, formData())
          .then((data) => {
            if (data.result) {
              if (fancybox) Fancybox.close()

              let serviceMessage = data.result == "ok" ? data.message : data.error

              Fancybox.show(
                [
                  {
                    src: `<div class="popup popup--md" style="display: block">
                            <p class="popup-title">Проверка статуса ремонта</p>
                            <div class="popup-content">
                              <div class="fs-3">${data.date !== null ? `<b>${data.date}</b>: ` : ""}${serviceMessage}</div>
                            </div>
                          </div>`,
                    type: "html",
                  },
                ],
                fancyboxOptions
              )

              if (reset == "true") {
                form.reset()
                clearErrors(form)
              }
            }
          })
          .catch((error) => {
            Toastify({
              text: error.message,  // для сетевых ошибок текст будет в поле message
              duration: 5000,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
              className: "fs-4 bg-danger bg-gradient",
            }).showToast()
          })
          .finally(() => {
            if (closePopup) {
              popup.close()
            }
            resetIcon(submitEl)
            submitEl.disabled = false
          })
        break

      case form.classList.contains("form-find-by-article"):
        if (resultWrapper) {
          resultWrapper.innerHTML = ""
        }
        await fetchData(url, method, formData())
          .then((html) => {
            // Ожидаем ответ как html строку
            if (resultWrapper) {
              resultWrapper.innerHTML = html
            }
            cart.setButtons()
            userList.setButtons()
          })
          .catch((error) => {
            Toastify({
              text: error.message,  // для сетевых ошибок текст будет в поле message
              duration: 5000,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
              className: "fs-4 bg-danger bg-gradient",
            }).showToast()
          })
          .finally(() => {
            resetIcon(submitEl)
            submitEl.disabled = false
          })
        break

      default:
        // Логика для других случаев
        await fetchData(url, method, formData(form))
          .then((data) => {
            if (data.result == "ok") {
              if (fancybox) Fancybox.close()
              let result = data.result && data.result == "ok" ? "Спасибо!" : "Ошибка"
              Fancybox.show(
                [
                  {
                    src: `<div class="popup popup--md" style="display: block"><p class="popup-title">${result}</p><div class="popup-content">${data.message}</div></div>`,
                    type: "html",
                  },
                ],
                fancyboxOptions
              )
              if (reset == "true") {
                form.reset()
                errorEl.innerText = ""
                errorEl.style.display = "none"
              }
            } else if (data.result == "error") {
              if (errorEl) {
                errorEl.innerText = data.error // Текст ошибки будет в поле error, а не в message
                errorEl.style.display = "block"
              } else {
                Toastify({
                  text: data.error, // Текст ошибки будет в поле error, а не в message
                  duration: 5000,
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
            Toastify({
              text: error.message, // для сетевых ошибок текст будет в поле message
              duration: 5000,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
              className: "fs-4 bg-danger bg-gradient",
            }).showToast()
          })
          .finally(() => {
            if (closePopup) {
              popup.close()
            }
            resetIcon(submitEl)
            submitEl.disabled = false
          })
        break
    }
  }

  function clearErrors(form) {
    if (form) {
      let errorEl = form.querySelector(".form-error")
      errorEl.innerText = ""
      errorEl.style.display = "none"
    }
  }

  function bindHandlers() {
    document.addEventListener("click", (e) => {
      const populateButton = e.target.closest(ui.populate)

      if (populateButton) populateForm(populateButton)
    })
  }

  function init() {
    setDefaults()
    initValidator()
    initRangeSlider()
    bindHandlers()
    state.initialized = true
  }

  return {
    init, initValidator, initRangeSlider, populateForm, clearErrors
  }
})()

export default forms