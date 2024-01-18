export const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(' ')

export const formatTimestamp = (milliseconds: number): string => {
  let minutes = Math.floor(milliseconds / 60000).toString()
  let seconds = Math.floor((milliseconds % 60000) / 1000).toString()
  let centiseconds = Math.floor((milliseconds % 1000) / 10).toString()

  if (minutes === '0') {
    return `${seconds}:${centiseconds.padStart(2, '0')}`
  }

  return `${minutes}:${seconds.padStart(2, '0')}:${centiseconds.padStart(2, '0')}`
}

export const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const isCorrect = (
  selectedElements: number[],
  correctElements: number[],
): boolean => {
  if (!selectedElements.length) {
    return false
  }

  if (selectedElements.length !== correctElements.length) {
    return false
  }

  return selectedElements
    .sort((a, b) => a - b)
    .every((s, i) => s === correctElements[i])
}
