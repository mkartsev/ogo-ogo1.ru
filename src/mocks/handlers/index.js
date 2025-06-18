import { http, delay, HttpResponse } from "msw"
import { catalog } from "../resolvers/catalog.js"
import { listing } from "../resolvers/listing.js"
import { addToCartSuccess, addToCartFail, accessoriesSuccess, accessoriesMore, accessoriesFail, dropdown } from "../resolvers/cart.js"
import { authForm, authSuccess, authFail } from "../resolvers/auth.js"
import { callbackForm, callbackSuccess, callbackFail } from "../resolvers/callback.js"
import { complainForm, complainSuccess, complainFail } from "../resolvers/complain.js"
import { questionForm, questionSuccess, questionFail } from "../resolvers/question.js"
import { feedbackForm } from "../resolvers/feedback.js"
import { productDelivery, productQuestions, productPreview, productReviews, productQuestionReply, productQuestionFail, productReviewReply, productReviewFail, productPreorderSuccess } from "../resolvers/product.js"
import { recoveryForm, recoverySuccess, recoveryFail } from "../resolvers/recovery.js"
import { registrationForm, registrationSuccess, registrationFail } from "../resolvers/registration.js"
import { supplierForm, supplierSuccess, supplierFail } from "../resolvers/supplier.js"
import { citiesList, selectCityForm } from "../resolvers/city.js"
import { serviceSuccess, serviceFail } from "../resolvers/service.js"
import { adultForm, adultSuccess, adultFail } from "../resolvers/adult.js"
import { fastBuyForm, fastBuySuccess, fastBuyFail } from "../resolvers/fastbuy.js"
import { userWishForm, userWishSuccess, userWishFail } from "../resolvers/userwish.js"
import { userListSuccess, userListFail } from "../resolvers/userlist.js"
import { noutbukiHTML, smartfonyHTML, monitoryiHTML, compareEmpty } from "../resolvers/compare.js"
import { configuratorHTML } from "../resolvers/configurator.js"
import { findByArticle } from "../resolvers/findByArticle.js"

const DELAY = 500

export const handlers = [
  http.get(process.env.CATALOG_URL, async () => {
    await delay(DELAY)

    return HttpResponse.json(catalog, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.AUTH_URL, () => {
    return HttpResponse.text(authForm, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),

  http.post(process.env.AUTH_URL, async ({ request }) => {
    await delay(DELAY)

    const data = await request.formData().then((data) => Object.fromEntries(data))
    let response = data.USER_PASSWORD == "123" ? authSuccess : authFail

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.CALLBACK_URL, () => {
    return HttpResponse.text(callbackForm, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),

  http.post(process.env.CALLBACK_URL, async ({ request }) => {
    const data = await request.formData().then((data) => Object.fromEntries(data))
    let response = data.name == "user" ? callbackSuccess : callbackFail

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.COMPLAIN_URL, () => {
    return HttpResponse.text(complainForm, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),

  http.post(process.env.COMPLAIN_URL, async ({ request }) => {
    const data = await request.formData().then((data) => Object.fromEntries(data))
    let response = data.name == "user" ? complainSuccess : complainFail

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.QUESTION_URL, () => {
    return HttpResponse.text(questionForm, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),

  http.post(process.env.QUESTION_URL, async ({ request }) => {
    const data = await request.formData().then((data) => Object.fromEntries(data))
    let response = data.name == "user" ? questionSuccess : questionFail

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.FEEDBACK_FORM_URL, () => {
    return HttpResponse.text(feedbackForm, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),
  // http.post(process.env.FEEDBACK_FORM_URL, async ({ request }) => {
  //   // const data = await request.formData().then((data) => Object.fromEntries(data))
  //   // let response = data.name == "user" ? feedbackSuccess : feedbackFail

  //   return HttpResponse.json(response, {
  //     headers: {
  //       "Content-Type": "application/json; charset=UTF-8",
  //     },
  //   })
  // }),

  http.get(process.env.RECOVERY_URL, () => {
    return HttpResponse.text(recoveryForm, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),

  http.post(process.env.RECOVERY_URL, async ({ request }) => {
    const data = await request.formData().then((data) => Object.fromEntries(data))
    let response = data.USER_EMAIL == "user@user.com" ? recoverySuccess : recoveryFail

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.REGISTRATION_URL, () => {
    return HttpResponse.text(registrationForm, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),

  http.post(process.env.REGISTRATION_URL, async ({ request }) => {
    const data = await request.formData().then((data) => Object.fromEntries(data))
    let response = data.REGISTER["FIRST_NAME"] == "user" ? registrationSuccess : registrationFail

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.SELECT_CITY_URL, () => {
    return HttpResponse.text(selectCityForm, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),

  http.post(process.env.SET_CITY_URL, async ({ request }) => {
    // { result: "ok" } будет приходить только при кликах на 4011 - Москва
    const data = await request.formData().then((data) => Object.fromEntries(data))
    let response = data.city_id == 4011 ? "ok" : "error"

    return HttpResponse.json(
      { "result": response },
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    )
  }),

  http.get(process.env.GET_CITIES_URL, () => {
    return HttpResponse.json(citiesList, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.SUPPLIER_FORM_URL, () => {
    return HttpResponse.text(supplierForm, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),

  http.post(process.env.SUPPLIER_URL, async ({ request }) => {
    const data = await request.formData().then((data) => Object.fromEntries(data))
    let response = data.name == "user" ? supplierSuccess : supplierFail

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.post(process.env.SERVICE_CHECK_URL, async ({ request }) => {
    const data = await request.formData().then((data) => Object.fromEntries(data))
    let response = data.id == "ОБ000001287" ? serviceSuccess : serviceFail

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.ADULT_FORM_URL, () => {
    return HttpResponse.text(adultForm, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),

  http.post(process.env.ADULT_CONFIRM_URL, async ({ request }) => {
    const data = await request.formData().then((data) => Object.fromEntries(data))
    let response = data.CONFIRM_ADULT == "true" ? adultSuccess : adultFail

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.FAST_BUY_FORM_URL, async () => {
    await delay(DELAY)

    return HttpResponse.text(fastBuyForm, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),

  http.post(process.env.FAST_BUY_URL, async ({ request }) => {
    const data = await request.formData().then((data) => Object.fromEntries(data))
    let response = data.name == "user" ? fastBuySuccess : fastBuyFail

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.USER_WISH_FORM_URL, () => {
    return HttpResponse.text(userWishForm, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),

  http.post(process.env.USER_WISH_URL, async ({ request }) => {
    await delay(DELAY)

    const data = await request.formData().then((data) => Object.fromEntries(data))
    let response = data.PRODUCT_REQUEST == "test" ? userWishSuccess : userWishFail

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.ADD_TO_CART_URL, async ({ request }) => {
    await delay(DELAY)

    const searchParams = new URLSearchParams(request.url.split("?")[1])
    let id = searchParams.get("id")

    // Ноутбук HP ZBook Fury G8 не будет добавляться в корзину, его id=382239
    let response = id != "382239" ? addToCartSuccess(id) : addToCartFail

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
    })
  }),

  http.get(process.env.GET_ACCESSORIES_URL, async ({ request }) => {
    await delay(DELAY)

    const searchParams = new URLSearchParams(request.url.split("?")[1])
    let id = searchParams.get("ELEMENT_ID")
    let page = searchParams.get("PAGEN_1")

    // Аксессы будут возвращать ошибку для Ноутбука MSI Creator 16 AI Studio, его id=391062
    if (id != "391062") {
      return HttpResponse.text(page ? accessoriesMore : accessoriesSuccess, {
        headers: {
          "Content-Type": "text/html; charset=UTF-8",
        },
      })
    } else {
      return HttpResponse.json(accessoriesFail, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
    }
  }),

  http.post(process.env.CART_REFRESH_URL, async () => {
    await delay(DELAY)

    return HttpResponse.text(dropdown, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),

  http.post(process.env.ADD_TO_LIST_URL, async ({ request }) => {
    // Ноутбук HP ZBook Fury G8 не будет добавляться в избранное и сравнение, его id=382239
    const data = await request.formData().then((data) => Object.fromEntries(data))
    let response = data.id == "382239" ? userListFail : userListSuccess

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.LISTING_URL, async () => {
    await delay(DELAY)

    return HttpResponse.text(listing, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.COMPARE_URL, async ({ request }) => {
    await delay(DELAY)

    const searchParams = new URLSearchParams(request.url.split("?")[1])
    const category = searchParams.get("sec")

    let response
    let options = {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    }

    switch (category) {
      case "Ноутбуки":
        response = noutbukiHTML
        break
      case "Смартфоны":
        response = smartfonyHTML
        break
      case "Мониторы":
        response = monitoryiHTML
        break
      case "":
      case "undefined":
      case "null":
        options.headers["Content-Type"] = "application/json; charset=UTF-8"
        response = { "result": "error", "error": "Категория не указана" }
        break
      default:
        options.headers["Content-Type"] = "application/json; charset=UTF-8"
        response = { "result": "error", "error": "Категория не найдена" }
    }

    if (options.headers["Content-Type"].startsWith("text/html")) {
      return HttpResponse.text(response, options)
    } else {
      return HttpResponse.json(response, options)
    }
  }),

  http.post(process.env.COMPARE_URL, async ({ request }) => {
    await delay(DELAY)

    const data = await request.formData().then((data) => Object.fromEntries(data))
    let response = data.action == "DELETE_FROM_COMPARE_RESULT" ? compareEmpty : monitoryiHTML

    return HttpResponse.text(response, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),

  http.post(process.env.CONFIGURATOR_ACTIONS, async ({ request }) => {
    await delay(DELAY)

    const data = await request.formData().then((data) => Object.fromEntries(data))
    let response

    switch (data.action) {
      case "add":
        response = {
          "result": "ok",
          "mustRedirect": false,
          "url": process.env.CONFIGURATOR_URL,
        }
        break

      case "remove":
        response = {
          "result": "ok",
          "mustRedirect": false,
          "url": process.env.CONFIGURATOR_URL
        }
        break

      case "setQuantity":
        response = {
          "result": "ok",
          "mustRedirect": false,
          "url": process.env.CONFIGURATOR_URL
        }
        break

      case "addToBasket":
        response = {
          "result": "ok",
          "mustRedirect": true
        }
        break

      case "saveConfiguration":
        response = {
          "result": "error",
          "error": "Конфигурация с таким названием уже существует",
          "mustRedirect": false
        }
        break

      case "newConfiguration":
        response = {
          "result": "ok",
          "mustRedirect": true
        }
        break

      case "switchConfiguration":
        response = {
          "result": "ok",
          "mustRedirect": false
        }
        break

      default:
        response = {
          "result": "error",
          "error": "Не указано действие конфигуратора",
          "mustRedirect": false
        }
        break
    }

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.CONFIGURATOR_URL, async () => {
    await delay(DELAY)

    return HttpResponse.text(configuratorHTML, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.CONFIGURATOR_MAIL, async () => {
    await delay(DELAY)

    const response = {
      result: "ok",
      message: "Ваше сообщение отправлено"
    }

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.CONFIGURATOR_EXPERT, async () => {
    await delay(DELAY)

    const response = {
      result: "ok",
      message: "Наш гига-эксперт оценит вашу сборку и свяжется с вами в ближайшее время с ответом"
    }

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.FIND_BY_ARTICLE, async ({ request }) => {
    await delay(DELAY)

    const searchParams = new URLSearchParams(request.url.split("?")[1])
    const article = searchParams.get("article")
    let response

    if (article == "111") {
      return new HttpResponse(null, {
        status: 500,
        statusText: "Internal server error",
      })
    } else {
      response = findByArticle(article)
      return HttpResponse.text(response, {
        headers: {
          "Content-Type": "text/html; charset=UTF-8",
        },
      })
    }
  }),

  http.get(process.env.PRODUCT_DELIVERY_URL, async () => {
    await delay(DELAY)

    return HttpResponse.text(productDelivery, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.PRODUCT_QUESTIONS_URL, async ({ request }) => {
    await delay(DELAY)

    let response = { ...productQuestions }

    const searchParams = new URLSearchParams(request.url.split("?")[1])
    const { page = 1 } = Object.fromEntries(searchParams.entries())

    // Вернем номер запрошенной страницы
    response.page = page

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.post(process.env.PRODUCT_QUESTIONS_URL, async ({ request }) => {
    await delay(DELAY)

    const { NAME, QUESTION } = await request.formData().then((data) => Object.fromEntries(data))

    let response = NAME == "user" ? productQuestionReply : productQuestionFail

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.PRODUCT_PREVIEW_URL, async () => {
    await delay(DELAY)

    return HttpResponse.text(productPreview, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    })
  }),

  http.get(process.env.PRODUCT_REVIEWS_URL, async ({ request }) => {
    await delay(DELAY)

    // Создаем копию объекта отзывов, чтобы не изменять оригинал
    let response = { ...productReviews }

    // Получаем параметры из URL
    const searchParams = new URLSearchParams(request.url.split("?")[1])
    const { order = "date", dir = "asc", source = "all", page = 1 } = Object.fromEntries(searchParams.entries())

    // Фильтрация отзывов
    let filteredReviews = source === "all"
      ? [...response.reviews] // Если "all", возвращаем все отзывы
      : response.reviews.filter(review => review.source === source) // Иначе фильтруем по ключу "source"

    // Сортировка отзывов
    filteredReviews.sort((a, b) => {
      if (order === "date") {
        // Сортировка по дате
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dir === "asc" ? dateA - dateB : dateB - dateA
      } else if (order === "rate") {
        // Сортировка по рейтингу, null или 0 учитываются как минимальное значение
        const rateA = a.rate || 0
        const rateB = b.rate || 0
        return dir === "asc" ? rateA - rateB : rateB - rateA
      }
      return 0 // Если sort не date или rate, сортировка не применяется
    })

    if (filteredReviews.length > 5) {
      response.total_pages = 2
    }
    // Обновляем объект response с отфильтрованными и отсортированными отзывами
    response.reviews = filteredReviews

    // Вернем номер запрошенной страницы
    response.page = page
    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.post(process.env.PRODUCT_REVIEWS_URL, async ({ request }) => {
    await delay(DELAY)

    let data = await request.formData().then((data) => Object.fromEntries(data))
    let name = data["PROPERTY_VALUES[NAME]"]

    let response = name == "user" ? productReviewReply : productReviewFail

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),

  http.post(process.env.PRODUCT_PREORDER_URL, async () => {
    await delay(DELAY)

    let response = productPreorderSuccess

    return HttpResponse.json(response, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
  }),
]
