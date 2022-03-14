export const getRandomNumbers = (length: number): number[] => {
  const numbers = new Set<number>()
  while (numbers.size !== length) {
    numbers.add(Math.floor(Math.random() * 100) + 1)
  }

  return [...numbers]
}
