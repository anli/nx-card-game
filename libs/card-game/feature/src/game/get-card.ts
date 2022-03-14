import { getRandomNumberPairs } from '@nx-card-game/card-game/utils'

export interface CardProps {
  id: number
  value: number
}

export const getCards = (count: number): CardProps[] =>
  getRandomNumberPairs(count).map((value, index) => {
    return { id: index, value }
  })
