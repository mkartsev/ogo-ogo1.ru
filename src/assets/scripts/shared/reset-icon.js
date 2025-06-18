export function resetIcon(el) {
  if (!el) return

  const svgElement = el.querySelector("svg")
  const useElement = el.querySelector("use")
  const originalIcon = el.getAttribute("data-original-icon")

  if (svgElement) {
    // Если сохранена оригинальная иконка, то ставим ёё
    // Если нет, или она пустая, то удаляем свг элемент
    if (originalIcon && originalIcon != "") {
      useElement.setAttribute("xlink:href", `/assets/img/sprites/sprite.svg#${originalIcon}`)
    } else {
      svgElement.remove()
    }

    // Переписываем классы иконки на стандартные, вдруг там анимация есть или еще что
    svgElement.setAttribute("class", "svg-icon svg-icon--sm")
  }
}