export default class HtmlCache {
  constructor() {
    if (!HtmlCache.instance) {
      HtmlCache.instance = this
      this.init()
    }
    return HtmlCache.instance
  }

  init() {
    if (!document.getElementById("htmlcachewrapper")) {
      const wrapper = document.createElement("div")
      wrapper.id = "htmlcachewrapper"
      wrapper.style.display = "none"
      document.body.appendChild(wrapper)
    }
  }

  add(id, html) {
    this.init()
    if (!document.getElementById(id)) {
      const wrapper = document.createElement("div")
      wrapper.id = id
      document.getElementById("htmlcachewrapper").appendChild(wrapper)
    }
    const block = document.getElementById(id)
    block.innerHTML = html
  }

  get(id) {
    this.init()
    return document.getElementById(id)
  }
}