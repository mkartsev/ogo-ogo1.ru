import AirDatepicker  from "air-datepicker"
import localeRu       from "air-datepicker/locale/ru.js"
import {createPopper} from "@popperjs/core"

const datepicker = (() => {
  const ui = {
    selector: ".js-datepicker"
  }

  function StrDateToISO(strDate) {
    let year, month, day
    [day, month, year]  = strDate.split(".")
    return year + "-"+ month + "-" + day
  }

  const initDatepicker = (el) => {
    let startDate = el.value ? StrDateToISO(el.value) : new Date()
    let isMobile = window.matchMedia("(pointer:coarse)").matches

    const datepicker = new AirDatepicker(el, {
      locale: localeRu,
      autoClose: true,
      isMobile, //true
      startDate,
      selectedDates: el.value ? [startDate] : [],
      position({$datepicker, $target, $pointer, done}) {
        let popper = createPopper($target, $datepicker, {
          placement: "bottom",
          modifiers: [
            {
              name: "flip",
              options: {
                padding: {
                  top: 64
                }
              }
            },
            {
              name: "offset",
              options: {
                offset: [0, 20]
              }
            },
            {
              name: "arrow",
              options: {
                element: $pointer
              }
            }
          ]
        })
        /*
        Возвращаем функцию, которая вызывается при срабатывании `hide()`,
        она обязательно должна вызвать функцию `done()`
          для завершения процесса скрытия календаря
        */
        return function completeHide() {
          popper.destroy()
          done()
        }
      },
      onSelect(){ //({date, formattedDate, datepicker})
        // console.log(date, formattedDate, datepicker)
        el.dispatchEvent(new Event("change", {bubbles: true}))
        el.dispatchEvent(new Event("input", {bubbles: true}))
      }
    })

    el.datepicker

    return datepicker
  }

  function init() {
    document.querySelectorAll(ui.selector).forEach(el => {
      if (el.datepicker === undefined) {
        initDatepicker(el)
      }
    })
  }

  return {
    init: init
  }
})()

export default datepicker