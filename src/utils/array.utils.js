export const copyArr = arr => [...arr]

export const chunk = (arr, chunkSize) => {
  const copiedArr = copyArr(arr)
  const newArr = []

  if (chunkSize === 1) return copiedArr

  while (copiedArr.length > 0) {
    if (copiedArr.length === 1 && chunkSize !== 1) {
      newArr.push(copiedArr.pop())
    } else {
      newArr.push(copiedArr.splice(0, chunkSize))
    }
  }

  return newArr
}
