import { map } from "nanostores"

import header from "@components/header/header.js"

export const $store = map({
  bodyOverflow: false,
  catalog: {},
  catalogTime: Number(localStorage.getItem("catalogTime")) || 0,
  catalogIsOpen: false,
  isMobile: false,
  sidebarIsOpen: false,
  headerIsSticky: false
})

const breakpoint = window.matchMedia("(max-width: 640px)")

function checkBreakpoint(e) {
  $store.setKey("isMobile", e.matches)
}

checkBreakpoint(breakpoint)
breakpoint.onchange = (e) => {
  checkBreakpoint(e)
}

export function addBodyOverflow() {
  document.body.style.overflow = "hidden"
  $store.setKey("bodyOverflow", true)
}
export function removeBodyOverflow() {
  document.body.style.removeProperty("overflow")
  $store.setKey("bodyOverflow", false)
}
export function toggleBodyOverflow() {
  $store.get().bodyOverflow ? removeBodyOverflow() : addBodyOverflow()
}

export function setHeaderSticky() {
  header.isSticky = true
  $store.setKey("headerIsSticky", true)
}
export function unsetHeaderSticky() {
  header.isSticky = false
  $store.setKey("headerIsSticky", false)
}
export function toggleHeaderSticky() {
  $store.get().headerIsSticky ? unsetHeaderSticky() : setHeaderSticky()
}