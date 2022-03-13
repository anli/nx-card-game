const shuffle = <T>(array: T[]): T[] => {
  array = [...array]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

const getRandomNumbers = (length: number): number[] => {
  const numbers = new Set<number>()
  while (numbers.size !== length) {
    numbers.add(Math.floor(Math.random() * 100) + 1)
  }

  return [...numbers]
}

export const getRandomNumberPairs = (uniquePairsCount: number): number[] => {
  const numbers = getRandomNumbers(uniquePairsCount)

  return shuffle([...numbers, ...numbers])
}
