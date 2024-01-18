import finger1 from './assets/finger-1.webp'
import finger2 from './assets/finger-2.webp'
import finger3 from './assets/finger-3.webp'
import finger4 from './assets/finger-4.webp'

import finger1_1 from './assets/finger-1-1.webp'
import finger1_2 from './assets/finger-1-2.webp'
import finger1_3 from './assets/finger-1-3.webp'
import finger1_4 from './assets/finger-1-4.webp'
import finger1_5 from './assets/finger-1-5.webp'
import finger1_6 from './assets/finger-1-6.webp'
import finger1_7 from './assets/finger-1-7.webp'
import finger1_8 from './assets/finger-1-8.webp'

import finger2_1 from './assets/finger-2-1.webp'
import finger2_2 from './assets/finger-2-2.webp'
import finger2_3 from './assets/finger-2-3.webp'
import finger2_4 from './assets/finger-2-4.webp'
import finger2_5 from './assets/finger-2-5.webp'
import finger2_6 from './assets/finger-2-6.webp'
import finger2_7 from './assets/finger-2-7.webp'
import finger2_8 from './assets/finger-2-8.webp'

import finger3_1 from './assets/finger-3-1.webp'
import finger3_2 from './assets/finger-3-2.webp'
import finger3_3 from './assets/finger-3-3.webp'
import finger3_4 from './assets/finger-3-4.webp'
import finger3_5 from './assets/finger-3-5.webp'
import finger3_6 from './assets/finger-3-6.webp'
import finger3_7 from './assets/finger-3-7.webp'
import finger3_8 from './assets/finger-3-8.webp'

import finger4_1 from './assets/finger-4-1.webp'
import finger4_2 from './assets/finger-4-2.webp'
import finger4_3 from './assets/finger-4-3.webp'
import finger4_4 from './assets/finger-4-4.webp'
import finger4_5 from './assets/finger-4-5.webp'
import finger4_6 from './assets/finger-4-6.webp'
import finger4_7 from './assets/finger-4-7.webp'
import finger4_8 from './assets/finger-4-8.webp'

const fingerprintMap = {
  '1': finger1,
  '2': finger2,
  '3': finger3,
  '4': finger4,
  '1-1': finger1_1,
  '1-2': finger1_2,
  '1-3': finger1_3,
  '1-4': finger1_4,
  '1-5': finger1_5,
  '1-6': finger1_6,
  '1-7': finger1_7,
  '1-8': finger1_8,
  '2-1': finger2_1,
  '2-2': finger2_2,
  '2-3': finger2_3,
  '2-4': finger2_4,
  '2-5': finger2_5,
  '2-6': finger2_6,
  '2-7': finger2_7,
  '2-8': finger2_8,
  '3-1': finger3_1,
  '3-2': finger3_2,
  '3-3': finger3_3,
  '3-4': finger3_4,
  '3-5': finger3_5,
  '3-6': finger3_6,
  '3-7': finger3_7,
  '3-8': finger3_8,
  '4-1': finger4_1,
  '4-2': finger4_2,
  '4-3': finger4_3,
  '4-4': finger4_4,
  '4-5': finger4_5,
  '4-6': finger4_6,
  '4-7': finger4_7,
  '4-8': finger4_8,
}

const fingerprintI = [1, 2, 3, 4] as const
export type FingerprintI = (typeof fingerprintI)[number]

export const fingerprintElementI = [1, 2, 3, 4, 5, 6, 7, 8]
export type FingerprintElementI = (typeof fingerprintElementI)[number]

export const load = () => {
  const promises = Object.values(fingerprintMap).map(
    (src) =>
      new Promise<void>((resolve) => {
        const img = new Image()
        img.src = src
        img.onload = () => resolve()
      }),
  )

  return Promise.all(promises)
}

export const getFingerprint = (i: FingerprintI) => fingerprintMap[i]

export const getFingerprintElement = (
  i: FingerprintI,
  j: FingerprintElementI,
) => fingerprintMap[`${i}-${j}`]
