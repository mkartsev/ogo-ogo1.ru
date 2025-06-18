import dayjs         from "dayjs"
import Toastify      from "toastify-js"
import { setIcon }   from "@scripts/shared/set-icon.js"
import { resetIcon } from "@scripts/shared/reset-icon.js"
import { fetchData } from "@scripts/utils/fetch.js"

const questions = (() => {
  const ui = {
    questions: {
      block:    ".product-questions",
      status:   ".product-questions__status",
      slot:     ".product-questions__slot",
      more:     ".product-questions__more",
    },
  }

  const questionsBlock = document.querySelector(ui.questions.block)
  let statusElement  = questionsBlock?.querySelector(ui.questions.status)
  let moreButton     = questionsBlock?.querySelector(ui.questions.more)

  let id     = questionsBlock?.dataset.id
  let page   = 1

  let query = {
    id: id,
    page: page
  }

  const questionsData = async (query) => {
    return await fetchData(process.env.PRODUCT_QUESTIONS_URL, "GET", query)
  }

  async function renderQuestions(query) {
    try {
      const data = await questionsData(query)

      // Если массив с вопросами пустой
      if (data.questions.length === 0) {
        statusElement.textContent = "Пока вопросов про этот товар нет"
      } else {
        statusElement.classList.add("hidden")
        populateQuestions(data.questions)
      }

      updateMoreButton(data)

    } catch(error) {
      console.log(error)
    }
  }

  function createQuestion(question) {
    const { author, photo, date, text, replies } = question

    const authorPlaceholder = author ? `<span class="product-question__author-placeholder">${author.charAt(0)}</span>` : ""
    const authorImage = photo ? `<img class="product-question__author-image" src="${photo}" alt="${author}">` : ""
    const authorName = author ? `<span class="product-question__author-name">${author}</span>` : ""
    const questionDate = date ? `<time class="product-question__pubdate" time="${date}" pubdate="">${dayjs(date).format("DD.MM.YYYY")}</time>` : ""
    const questionText = text ? `<div class="product-question__text"><b>Вопрос: </b>${text}</div>` : ""
    const questionReplies = replies.length > 0 ? `<section class="product-question__replies">${replies.map(el => createReply(el)).join("")}</section>` : ""

    return `
      <article class="product-question">
        <header class="product-question__author">
          ${photo ? authorImage : authorPlaceholder}
          ${authorName}
          ${questionDate}
        </header>
        <section class="product-question__body">
          ${questionText}
        </section>
        ${questionReplies}
      </article>
    `
  }

  function createReply(reply) {
    const { author, photo, date, text } = reply

    const authorPlaceholder = author ? `<span class="product-reply__author-placeholder">${author.charAt(0)}</span>` : ""
    const authorImage = photo ? `<img class="product-reply__author-image" src="${photo}" alt="${author}">` : ""
    const authorName = author ? `<span class="product-reply__author-name">${author}</span>` : ""
    const replyDate = date ? `<time class="product-reply__pubdate" time="${date}" pubdate="">${dayjs(date).format("DD.MM.YYYY")}</time>` : ""
    const replyText = text ? `<section class="product-reply__body"><b>Ответ: </b>${text}</section>` : ""

    return `
      <article class="product-reply">
        <header class="product-reply__author">
          ${photo ? authorImage : authorPlaceholder}
          ${authorName}
          ${replyDate}
        </header>
        ${replyText}
      </article>
    `
  }

  function populateQuestions(questions, append) {
    const slot = document.querySelector(ui.questions.slot)

    if (slot) {
      // Создаем строку с новым контентом из отзывов
      const newContent = questions.map(question => createQuestion(question)).join("")

      if (append) {
        // Если append == true, добавляем новый контент в конец блока
        slot.insertAdjacentHTML("beforeend", newContent)
      } else {
        // Если append == false, заменяем содержимое блока новым контентом
        slot.innerHTML = newContent
      }
    }
  }

  function updateMoreButton(data) {
    moreButton.setAttribute("data-page", data.page)
    moreButton.setAttribute("data-total", data.total_pages)
    moreButton.classList.toggle("hidden", data.page == data.total_pages)
  }

  // Создаем наблюдателя, который будет загружать контент в блок вопросов
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
    const questionsObserver = createObserver( () => renderQuestions(query) )
    document.querySelectorAll(ui.questions.block)?.forEach(block => questionsObserver.observe(block))
  }

  function bindHandlers() {
    document.addEventListener("click", async (e) => {
      let moreButton = e.target.closest(ui.questions.more)

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

            let data = await questionsData(query)
            populateQuestions(data.questions, true)
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

export default questions