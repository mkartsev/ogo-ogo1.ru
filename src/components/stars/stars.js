export const stars = (stars, size="sm") => {
  const count = Math.max(0, Math.min(5, Math.round(Number(stars) || 0)))
  const star = `<svg class="svg-icon svg-icon--${size}"><use xlink:href="/assets/img/sprites/sprite.svg#ui--star-fill"></use></svg>`

  const activeStars = `<span class="stars__item is-active">${star}</span>`.repeat(count)
  const inactiveStars = `<span class="stars__item">${star}</span>`.repeat(5 - count)
  return `<div class="stars">${activeStars}${inactiveStars}</div>`
}