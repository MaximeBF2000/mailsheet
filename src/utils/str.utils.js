export const capitalize = str =>
  str[0].toUpperCase() + str.slice(1).toLowerCase()

export const toCamelCase = str => {
  return str
    .split(' ')
    .map((s, index) => (index === 0 ? s.toLowerCase() : capitalize(s)))
    .join('')
}

export const genId = () => Math.random().toString().slice(2)
