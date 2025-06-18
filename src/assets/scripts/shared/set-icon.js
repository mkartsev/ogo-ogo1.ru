export function setIcon(el, icon, className = "", size = "sm") {
  if (!el) return

  const svgElement = el.querySelector("svg")
  const useElement = el.querySelector("use")

  if (useElement) {
    // Сохраняем исходную иконку в data-атрибуте элемента, если она еще не сохранена
    if (!el.hasAttribute("data-original-icon")) {
      el.setAttribute("data-original-icon", useElement.getAttribute("xlink:href").split("#")[1])
    }

    // Обновляем свойство xlink:href элемента <use>
    useElement.setAttribute("xlink:href", `/assets/img/sprites/sprite.svg#${icon}`)

    // Устанавливаем класс для svg-элемента, если он был передан
    if (className) {
      svgElement.classList.add(className)
    }
  } else {
    // Создаем новую иконку
    const newIcon = `<svg class='svg-icon svg-icon--${size} ${className}'><use xlink:href='/assets/img/sprites/sprite.svg#${icon}'></use></svg>`
    el.insertAdjacentHTML("afterbegin", newIcon)
  }
}