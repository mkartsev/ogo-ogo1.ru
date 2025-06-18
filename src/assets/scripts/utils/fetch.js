/**
 * Получает данные из указанного URL-адреса с использованием fetch и необязательных данных.
 *
 * @param {string} url - URL-адрес, из которого нужно получить данные.
 * @param {string} method - HTTP-метод, который нужно использовать для запроса (например, "GET", "POST").
 * @param {Object|URLSearchParams|FormData|null} [data=null] - Данные, которые нужно отправить вместе с запросом. Может быть объектом, URLSearchParams или FormData.
 * @returns {Promise<any>} - Promise, который резолвится с полученными данными или отклоняется с ошибкой.
 */
export function fetchData(url, method = "GET", data = null, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const defaultHeaders = { "X-Requested-With": "XMLHttpRequest" }
    let requestOptions = { method: method, headers: defaultHeaders }
    if (method.toUpperCase() === "GET") {
      if (data) {
        let queryString
        if (data instanceof URLSearchParams) {
          queryString = data.toString()
        } else {
          queryString = new URLSearchParams(data).toString()
        }
        url = `${url}?${queryString}`
      }
    } else if (method.toUpperCase() === "POST") {
      if (data instanceof FormData) {
        requestOptions.body = data
      } else if (data) {
        let urlEncodedData
        if (data instanceof URLSearchParams) {
          urlEncodedData = data.toString()
        } else {
          urlEncodedData = new URLSearchParams(data).toString()
        }
        requestOptions.body = urlEncodedData
        requestOptions.headers["Content-Type"] = "application/x-www-form-urlencoded"
      }
    }

    const controller = new AbortController()
    const abortTimer = setTimeout(() => {
      controller.abort() // Прерывание запроса после таймаута
      reject(new Error("Ошибка: Время ожидания истекло", {cause: { code: "Timeout exceeded", value: timeout }}))
    }, timeout)

    requestOptions.signal = controller.signal

    fetch(url, requestOptions)
      .then(response => {
        clearTimeout(abortTimer) // Отмена таймаута после получения ответа
        if (!response.ok) {
          return reject(new Error(`Ошибка: ${response.status} ${response.statusText}`))
        }
        const contentType = response.headers.get("Content-Type")
        if (contentType && (contentType.includes("application/json") || contentType.includes("text/json"))) {
          return response.json().then(resolve)
        } else {
          return response.text().then(resolve)
        }
      })
      .catch(error => {
        clearTimeout(abortTimer) // Отмена таймаута в случае ошибки
        console.error(error)
        reject(error)
      })
  })
}