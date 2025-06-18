/**
 * Склоняет слово в зависимости от числа.
 * @param {number} number - Число, для которого нужно склонять слово.
 * @param {string} one - Форма слова для одного (например, "яблоко").
 * @param {string} two - Форма слова для чисел от 2 до 4 (например, "яблока").
 * @param {string} five - Форма слова для множественного числа (например, "яблок").
 * @returns {string} Подходящая форма слова.
 */

export const pluralize = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2]
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
}