import { expect, test, describe } from 'vitest'
import { formatTimestamp, isCorrect } from './utils'

describe('formatTimestamp', () => {
  test('shows centiseconds as 0:xx', () => {
    expect(formatTimestamp(0)).toEqual('0:00')
    expect(formatTimestamp(10)).toEqual('0:01')
    expect(formatTimestamp(990)).toEqual('0:99')
  })

  test('seconds is only padded if minutes exist', () => {
    expect(formatTimestamp(5100)).toEqual('5:10')
    expect(formatTimestamp(65100)).toEqual('1:05:10')
  })

  // the minigame puzzle is designed to be solved within a minute
  test('hours is never shown', () => {
    expect(formatTimestamp(6000000)).toEqual('100:00:00')
  })

  test('time is floored', () => {
    expect(formatTimestamp(9)).toEqual('0:00')
    expect(formatTimestamp(65599)).toEqual('1:05:59')
  })
})

test('isCorrect', () => {
  expect(isCorrect([], [1])).toEqual(false)
  expect(isCorrect([1], [1, 2])).toEqual(false)
  expect(isCorrect([1, 2], [1, 2])).toEqual(true)
  expect(isCorrect([6, 1, 7, 4], [1, 4, 6, 7])).toEqual(true)
})
