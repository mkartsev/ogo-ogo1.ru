export const formatNumberBySpaces = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

/*!
 * Get a random integer with a minimum and maximum value
 * @param  {Integer} min  The minimum value
 * @param  {Integer} max  The maximum value
 * @return {Integer}      A random number
 */
export const randomNumber = (min = 0, max = 1000) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
