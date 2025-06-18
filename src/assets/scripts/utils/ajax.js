import { curry } from "./curry.js"

export const ajax = curry((method, url, data) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    let contentType = data instanceof FormData ? "multipart/form-data" : "application/x-www-form-urlencoded"

    function readystatechange(event) {
      if (event.target.DONE !== event.target.readyState) {
        return
      }
      xhr.removeEventListener(event.type, readystatechange)

      if (event.target.status === 200) {
        let response, ctype = event.target.getResponseHeader("Content-Type")
        switch (ctype) {
          case "application/json":
          case "text/json":
            response = JSON.parse(event.target.responseText)
            break
          //case "text/html":
          //  response = event.target.responseText
          //  break
          default:
            response = event.target.responseText
        }
        //resolve({ "response": response }) // Можно и объект создать
        resolve(response)
      } else {
        reject(new Error(`${event.target.status} ${event.target.responseText}`))
      }
    }

    xhr.addEventListener("readystatechange", readystatechange, false)

    switch (method) {
      case "get":
      case "GET":
        xhr.open(method, data ? `${url}?${data}` : `${url}`, true)
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        xhr.send()
        break

      case "post":
      case "POST":
        xhr.open(method, url, true)
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        if (contentType !== "multipart/form-data") {
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        }
        xhr.send(data)
        break
    }
  })
})