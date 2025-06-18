class SyncScroll {
  constructor() {
    this.groups = new Map()
    this.mutationObserver = null
    this.init()
  }

  init() {
    this.updateGroups()
    this.observeDOMChanges()
  }

  updateGroups() {
    const elements = document.querySelectorAll("[data-syncscroll]")
    const newGroups = new Map()

    elements.forEach(el => {
      const groupName = el.getAttribute("data-syncscroll")
      if (!newGroups.has(groupName)) {
        newGroups.set(groupName, new Set())
      }
      newGroups.get(groupName).add(el)
    })

    // Remove listeners from elements that are no longer present or changed group
    this.groups.forEach((elements, groupName) => {
      elements.forEach(el => {
        if (!newGroups.has(groupName) || !newGroups.get(groupName).has(el)) {
          el.removeEventListener("scroll", this.handleScroll)
        }
      })
    })

    // Add listeners to new elements
    newGroups.forEach((elements, groupName) => {
      elements.forEach(el => {
        if (!this.groups.has(groupName) || !this.groups.get(groupName).has(el)) {
          el.addEventListener("scroll", this.handleScroll)
        }
      })
    })

    this.groups = newGroups
  }

  handleScroll = (e) => {
    const scrolledEl = e.target
    const groupName = scrolledEl.getAttribute("data-syncscroll")
    const group = this.groups.get(groupName)

    if (group) {
      this.syncScroll(scrolledEl, group)
    }
  }

  syncScroll(scrolledEl, group) {
    const scrolledPercent = scrolledEl.scrollTop / (scrolledEl.scrollHeight - scrolledEl.clientHeight)
    const scrolledWidthPercent = scrolledEl.scrollLeft / (scrolledEl.scrollWidth - scrolledEl.clientWidth)

    group.forEach(el => {
      if (el !== scrolledEl && document.body.contains(el)) {
        const top = scrolledPercent * (el.scrollHeight - el.clientHeight)
        const left = scrolledWidthPercent * (el.scrollWidth - el.clientWidth)

        el.scrollTo({
          behavior: "instant",
          top,
          left,
        })
      }
    })
  }

  observeDOMChanges() {
    this.mutationObserver = new MutationObserver((mutations) => {
      let needsUpdate = false
      for (let mutation of mutations) {
        if (mutation.type === "childList" ||
            (mutation.type === "attributes" && mutation.attributeName === "data-syncscroll")) {
          needsUpdate = true
          break
        }
      }
      if (needsUpdate) {
        this.updateGroups()
      }
    })

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-syncscroll"]
    })
  }

  destroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }
    this.groups.forEach(group => {
      group.forEach(el => {
        el.removeEventListener("scroll", this.handleScroll)
      })
    })
    this.groups.clear()
  }
}

export default SyncScroll