class Preloader {
  constructor() {
    this.element = null
    this.template = `
      <div class="preloader">
        <span class="preloader__d"></span>
        <span class="preloader__d"></span>
        <span class="preloader__d"></span>
        <span class="preloader__d"></span>
      </div>`
  }

  #create() {
    this.element = document.createElement("div")
    this.element.className = "preloader__wrapper"
    this.element.innerHTML = this.template
    document.body.appendChild(this.element)
  }

  #remove() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element)
    }
    this.element = null
  }

  show() {
    if (!this.element) {
      this.#create()
    }
    document.body.classList.add("js-preloader")
  }

  hide() {
    if (this.element) {
      this.#remove()
    }
    document.body.classList.remove("js-preloader")
  }

  toggle() {
    this.visible ? this.hide() : this.show()
  }
}

const preloader = new Preloader()

export default preloader