export const getHeight = (element) => parseInt(window.getComputedStyle(element).height, 10)

export const getHiddenElementHeight = (element) => {
  const clone = element.cloneNode(true)
  let height = 0
  const style = `
    display: block
    width: ${element.clientWidth}px
    position: absolute
    top: 0
    left: -999rem
    max-height: none !important
    height: auto
    visibility: hidden
  `

  clone.setAttribute("style", style)
  element.parentElement.append(clone)
  height = clone.clientHeight
  clone.remove()

  return height
}

export const getOffsetTop = (element) => {
  let location = 0
  if (element.offsetParent) {
    while (element) {
      location += element.offsetTop
      element = element.offsetParent
    }
  }
  return location >= 0 ? location : 0
}

export const wrapElement = (element, wrapper) => {
  wrapper = wrapper || document.createElement("div")
  element.parentNode.appendChild(wrapper)
  return wrapper.appendChild(element)
}

export const getParents = (element, parentSelector) => {
  if (parentSelector === undefined) {
    parentSelector = document
  }
  let parents = []
  let p = element.parentNode
  while (p !== parentSelector) {
    let o = p
    parents.push(o)
    p = o.parentNode
  }
  parents.push(parentSelector)
  return parents
}

export const getSiblings = (element) => {
  let siblings = []
  if(!element.parentNode) {
    return siblings
  }
  let sibling  = element.parentNode.firstChild
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== element) {
      siblings.push(sibling)
    }
    sibling = sibling.nextSibling
  }
  return siblings
}