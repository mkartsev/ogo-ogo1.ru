/** Переделаем объект в URI строку
 * @param obj - JSON объект на вход
 * @returns {string} Возвращает URI строку через амперсанд
 */
export const objectToURI = (obj) => {
  let str = []
  for (let p in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
    }
  }
  return str.join("&")
}