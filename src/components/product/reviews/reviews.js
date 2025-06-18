import dayjs         from "dayjs"
import Toastify      from "toastify-js"
import { setIcon }   from "@scripts/shared/set-icon.js"
import { resetIcon } from "@scripts/shared/reset-icon.js"
import { fetchData } from "@scripts/utils/fetch.js"
import { pluralize } from "@scripts/utils/pluralize.js"
import { stars }     from "@components/stars/stars.js"

const reviews = (() => {
  const ui = {
    reviews: {
      block:    ".product-reviews",
      controls: ".product-reviews__controls",
      sort:     ".product-reviews__sort",
      filter:   ".product-reviews__filter",
      status:   ".product-reviews__status",
      slot:     ".product-reviews__slot",
      more:     ".product-reviews__more",
    },
    rating: {
      slot: ".product-rating__slot"
    }
  }

  const reviewsBlock = document.querySelector(ui.reviews.block)
  let controlsBlock  = reviewsBlock?.querySelector(ui.reviews.controls)
  let statusElement  = reviewsBlock?.querySelector(ui.reviews.status)
  let moreButton     = reviewsBlock?.querySelector(ui.reviews.more)

  let id     = reviewsBlock?.dataset.id
  let page   = 1
  let source = "all"
  let order  = "date"
  let dir    = "desc"

  let query = {
    id: id,
    source: source,
    order: order,
    dir: dir,
    page: page
  }

  const reviewsData = async (query) => {
    return await fetchData(process.env.PRODUCT_REVIEWS_URL, "GET", query)
  }

  async function renderReviews(query) {
    try {
      const data = await reviewsData(query)

      // Если массив с отзывами пустой
      if (data.reviews.length === 0) {
        statusElement.textContent = "Пока отзывов на этот товар нет"
      } else {
        controlsBlock.classList.remove("hidden")
        statusElement.classList.add("hidden")

        populateReviews(data.reviews)
        populateRating(data.stat)
      }

      updateMoreButton(data)

    } catch(error) {
      console.log(error)
    }
  }

  function createReview(review) {
    const { source, author, photo, date, rate, pros, cons, text } = review

    const authorPlaceholder = author ? `<span class="product-review__author-placeholder">${author.charAt(0)}</span>` : ""
    const authorImage = photo ? `<img class="product-review__author-image" src="${photo}" alt="${author}">` : ""
    const authorName = author ? `<span class="product-review__author-name">${author}</span>` : ""
    const reviewDate = date ? `<time class="product-review__pubdate" time="${date}" pubdate="">${dayjs(date).format("DD.MM.YYYY")}</time>` : ""
    const reviewExternal = (source === "yandex") ? "<div class=\"product-review__external\"><img src=\"/assets/img/icons/yamarket.svg\" alt=\"Отзыв на яндекс маркете\" title=\"Отзыв на яндекс маркете\"></div>" : ""
    const reviewStars = (rate !== undefined && rate !== null) ? stars(rate) : ""
    const reviewPros = pros ? `<div class="product-review__pros"><b>Достоинства: </b>${pros}</div>` : ""
    const reviewCons = cons ? `<div class="product-review__cons"><b>Недостатки: </b>${cons}</div>` : ""
    const reviewText = text ? `<div class="product-review__text"><b>Отзыв: </b>${text}</div>` : ""

    return `
      <article class="product-review">
        <header class="product-review__author">
          ${photo ? authorImage : authorPlaceholder}
          ${authorName}
          ${reviewDate}
        </header>
        <section class="product-review__rating">
          ${reviewExternal}
          ${reviewStars}
        </section>
        <section class="product-review__body">
          ${reviewPros}
          ${reviewCons}
          ${reviewText}
        </section>
      </article>
    `
  }

  function populateReviews(reviews, append) {
    const slot = document.querySelector(ui.reviews.slot)

    if (slot) {
      // Создаем строку с новым контентом из отзывов
      const newContent = reviews.map(review => createReview(review)).join("")

      if (append) {
        // Если append == true, добавляем новый контент в конец блока
        slot.insertAdjacentHTML("beforeend", newContent)
      } else {
        // Если append == false, заменяем содержимое блока новым контентом
        slot.innerHTML = newContent
      }
    }
  }

  function populateRating(rating) {
    const slot =  document.querySelector(ui.rating.slot)

    const template = `<div class="product-rating">
        <div class="row g-3 g-lg-4">
          <div class="col-12 col-md-6 col-lg-12">
            <div class="product-rating__score">${rating.avg}</div>
            <div class="my-3">
              ${ stars(rating.avg) }
            </div>
            <p class="m-0 fs-5 text-dark text-center">Cредняя оценка на основании ${rating.total} ${pluralize(rating.total, ["отзыва", "отзывов", "отзывов"])} покупателей</p>
          </div>
          <div class="col-12 col-md-6 col-lg-12">
            ${ populateStat(rating.rates) }
          </div>
        </div>
      </div>`

    if (slot) {
      slot.insertAdjacentHTML("afterbegin", template)
    }
  }

  function populateStat(rates) {
    const totalRates = Object.values(rates).reduce((sum, count) => sum + count, 0)

    let listItems = ""

    for (let i = 5; i >= 1; i--) {
      const count = rates[i] || 0
      const percentage = totalRates > 0 ? Math.round((count / totalRates) * 100) : 0

      listItems += `
        <li class="product-rating__stats-row">
          <span class="product-rating__stats-key">${i}</span>
          <progress class="product-rating__stats-progress" value="${percentage}" max="100"></progress>
          <span class="product-rating__stats-value">${percentage}%</span>
        </li>`
    }

    return `<ul class="product-rating__stats">${listItems}</ul>`
  }

  function updateMoreButton(data) {
    moreButton.setAttribute("data-page", data.page)
    moreButton.setAttribute("data-total", data.total_pages)
    moreButton.classList.toggle("hidden", data.page == data.total_pages)
  }

  // Создаем наблюдателя, который будет загружать контент в блок отзывов
  // Когда юзер докрутит страницу до них
  function createObserver(callback) {
    return new IntersectionObserver(async (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const block = entry.target
          try {
            // Вызываем callback после успешного обновления содержимого
            if (typeof callback === "function") {
              // Передаем в атрибуты элемент, на котором сработал наблюдатель
              callback()
            } else {
              console.error("callback должен быть функцией", callback)
            }
          } catch (error) {
            Toastify({
              text: error.message,
              duration: 5000,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
              className: "fs-4 bg-danger bg-gradient",
            }).showToast()
          } finally {
            observer.unobserve(block)
          }
        }
      }
    })
  }

  function bindObservers() {
    const reviewsObserver = createObserver( () => renderReviews(query) )
    document.querySelectorAll(ui.reviews.block)?.forEach(block => reviewsObserver.observe(block))
  }

  function bindHandlers() {
    document.addEventListener("change", async (e) => {
      let sortElement    = e.target.closest(ui.reviews.sort)
      let filterElement  = e.target.closest(ui.reviews.filter)

      if (sortElement) {
        query.page = 1
        query.order = sortElement.value
        query.dir = sortElement.options[sortElement.selectedIndex].dataset.dir

        try {
          let data = await reviewsData(query)
          populateReviews(data.reviews, false)
          updateMoreButton(data)
        } catch (error) {
          console.log(error)
        }
      }

      if (filterElement) {
        query.source = filterElement.value
        query.page = 1

        try {
          let data = await reviewsData(query)
          populateReviews(data.reviews, false)
          updateMoreButton(data)
        } catch (error) {
          console.log(error)
        }

      }
    })

    document.addEventListener("click", async (e) => {
      let moreButton = e.target.closest(ui.reviews.more)

      if (moreButton) {
        e.preventDefault()
        let currentPage = parseInt(moreButton.dataset.page)
        let totalPages = parseInt(moreButton.dataset.total)
        // Если текущая страница меньше, чем всего, то запрашивать будем следующую
        if (currentPage < totalPages) {
          query.page = currentPage + 1
          try {
            moreButton.disabled = true
            setIcon(moreButton, "ui--spinner", "spin text-primary", "md")

            let data = await reviewsData(query)
            populateReviews(data.reviews, true)
            updateMoreButton(data)
          } catch (error) {
            console.log(error)
          } finally {
            moreButton.disabled = false
            resetIcon(moreButton)
          }
        }
      }
    })
  }

  function init() {
    bindObservers()
    bindHandlers()
  }

  return {
    init: init
  }
})()

export default reviews