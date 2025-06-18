import autoComplete from "@tarekraafat/autocomplete.js"
import changeCity from "@components/change-city/change-city.js"

const selectCity = (() => {

  function init() {
    const elements = document.querySelectorAll(".js-select-city")

    if (elements.length > 0) {
      elements.forEach((el) => {
        if (el.classList.contains("is-initialized")) return

        let config = {
          selector: () => el,
          debounce: 250,
          data: {
            src: async (query) => {
              try {
                let url = el.getAttribute("data-src")
                const source = await fetch(url + "?query[term]=" + query, {
                  headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/json"
                  }
                })
                const data = await source.json()
                return data.results
              } catch (error) {
                return error
              }
            },
            keys: ["city"]
          },
          cache: false,
          filter: (list) => {
            const filteredResults = Array.from(
              new Set(list.map((value) => value.match))
            ).map((city) => {
              return list.find((value) => value.match === city)
            })
            return filteredResults
          },
          resultsList: {
            // tag: "ul",
            class: "dropdown-menu show w-100 m-0",
            element: (list, data) => {
              const info = document.createElement("p");
              info.classList.add("m-0", "p-2", "fs-4")
              if (data.results.length === 0) {
                info.innerHTML = `Город <strong>"${data.query}"</strong> не найден`;
                list.prepend(info);
              }
            },
            noResults: true,
          },
          resultItem: {
            // tag: "li",
            element: (item, data) => {
              item.innerHTML = `
                <a class="dropdown-item fs-4 js-change-city" data-id="${data.value.id}">${data.match} <span class="fs-6 text-body-tertiary">(${data.value.parent || ""})</span></a>
              `
            },
            highlight: false,
          },
          // resultItem: {
          //   element: (item, data) => {
          //     item.innerText = ""
          //     let link = document.createElement("a")
          //     link.href = "#"
          //     link.classList.add("js-change-city")
          //     link.setAttribute("data-id", data.value.id)
          //     link.innerHTML = `
          //       <span class="text-body">${data.match}</span>
          //       <br>
          //       <span class="fs-6 text-body-tertiary">${data.value.parent}</span>
          //     `
          //     item.prepend(link)
          //   },
          //   highlight: false
          // },
          submit: false,
          events: {
            input: {
              focus: () => {
                if (autoCompleteJS.input.value.length) autoCompleteJS.start()
              }
            }
          }
        }

        const autoCompleteJS = new autoComplete(config)

        autoCompleteJS.input.addEventListener("selection", function (event) {
          const feedback = event.detail
          const selection = feedback.selection.value[feedback.selection.key]

          // Подставляем выбранное значение в инпут
          autoCompleteJS.input.value = selection

          // Запускаем изменение города
          changeCity.change(feedback.selection.value.id)
        })

        el.classList.add("is-initialized")
      })
    }

  }

  return {
    init: init
  }
})()

export default selectCity