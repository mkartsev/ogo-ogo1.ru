// import SelectPlugin from "./select.plugin.js"
import Choices from "choices.js"

const select = (() => {
  const ui = {
    selector: ".js-select"
  }

  function init() {
    const elements = document.querySelectorAll(ui.selector)

    if (elements.length > 0) {
      elements.forEach((el) => {
        const choices = new Choices(el, {
          allowHTML: true,
          loadingText: "Загрузка...",
          noResultsText: "Нет результатов",
          itemSelectText: "",
          searchEnabled: false,
          uniqueItemText: "Можно добавить только уникальные значения",
          classNames: {
            containerOuter: "select",
            containerInner: "select__inner",
            input: "select__input",
            inputCloned: "select__input--cloned",
            list: "select__list",
            listItems: "select__list--multiple",
            listSingle: "select__list--single",
            listDropdown: "select__list--dropdown",
            item: "select__item",
            itemSelectable: "select__item--selectable",
            itemDisabled: "select__item--disabled",
            itemChoice: "select__item--choice",
            placeholder: "select__placeholder",
            group: "select__group",
            groupHeading: "select__heading",
            button: "select__button",
            activeState: "is-active",
            focusState: "is-focused",
            openState: "is-open",
            disabledState: "is-disabled",
            highlightedState: "is-highlighted",
            selectedState: "is-selected",
            flippedState: "is-flipped",
            loadingState: "is-loading",
            noResults: "has-no-results",
            noChoices: "has-no-choices"
          }
        })

        choices.passedElement.element.addEventListener(
          "change",
          function (event) {
            // console.log(event.detail)
          },
          false
        )
      })
    }
  }

  return {
    init: init
  }
})()

export default select
