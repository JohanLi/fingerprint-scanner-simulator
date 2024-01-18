import { expect, test } from 'vitest'
import { formatTimestamp, isCorrect } from './utils'

test('formatTimestamp', () => {
  expect(formatTimestamp(1234)).toEqual('1:23')
  expect(formatTimestamp(12345)).toEqual('12:35')
  expect(formatTimestamp(123456)).toEqual('123:46')
})

test('isCorrect', () => {
  expect(isCorrect([], [1])).toEqual(false)
  expect(isCorrect([1], [1, 2])).toEqual(false)
  expect(isCorrect([1, 2], [1, 2])).toEqual(true)
  expect(isCorrect([6, 1, 7, 4], [1, 4, 6, 7])).toEqual(true)
})
