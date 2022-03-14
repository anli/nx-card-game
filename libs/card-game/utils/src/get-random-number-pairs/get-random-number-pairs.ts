import { getRandomNumbers } from './get-random-number'
import { shuffle } from './shuffle'

export const getRandomNumberPairs = (uniquePairsCount: number): number[] => {
  const numbers = getRandomNumbers(uniquePairsCount)

  return shuffle([...numbers, ...numbers])
}
