import { CardProps } from './get-card'

export type GameState =
  | 'BOTH_CARD_INCORRECT'
  | 'BOTH_CARD_CORRECT'
  | 'GAME_ENDED'
  | 'FIRST_CARD_PICKED'

export const getGameState = (
  id: number,
  flipCardIds: number[],
  cards: CardProps[]
): GameState => {
  if (flipCardIds.length > 0 && flipCardIds.length % 2 !== 0) {
    const [previousCardId] = flipCardIds.slice(-1)
    const { value: previousCardValue } = cards[previousCardId]
    const { value: currentCardValue } = cards[id]

    if (previousCardValue !== currentCardValue) {
      return 'BOTH_CARD_INCORRECT'
    }

    if (flipCardIds.length + 1 === cards.length) {
      return 'GAME_ENDED'
    }

    return 'BOTH_CARD_CORRECT'
  }

  return 'FIRST_CARD_PICKED'
}
