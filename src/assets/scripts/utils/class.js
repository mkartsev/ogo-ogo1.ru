export const removeClassesByPrefix = (element, prefix) => {
  for (var i = element.classList.length - 1; i >= 0; i--) {
    if (element.classList[i].startsWith(prefix)) {
      element.classList.remove(element.classList[i])
    }
  }
}
