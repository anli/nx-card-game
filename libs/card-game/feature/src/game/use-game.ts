import { useCallback, useState } from 'react'
import { CardProps } from './get-card'
import { GameState, getGameState } from './get-game-state'

export const useGame = (
  defaultCards: CardProps[],
  defaultFlipCardIds: number[]
): {
    cards: CardProps[]
    steps: number[]
    flipCardIds: number[]
    resetSteps: () => void
    resetCards: React.Dispatch<React.SetStateAction<CardProps[]>>
    addStep: (id: number) => GameState
    flipBackLatestPair: () => void
  } => {
  const [cards, setCards] = useState<CardProps[]>(defaultCards)
  const [flipCardIds, setFlipCardIds] = useState<number[]>(defaultFlipCardIds)
  const [steps, setSteps] = useState<number[]>([])

  const resetSteps = useCallback((): void => {
    setFlipCardIds([])
    setSteps([])
  }, [])

  const addStep = useCallback(
    (id: number): GameState => {
      setSteps((_steps) => [..._steps, id])
      setFlipCardIds((_flipCardIds) => [..._flipCardIds, id])
      return getGameState(id, flipCardIds, cards)
    },
    [cards, flipCardIds]
  )

  const flipBackLatestPair = useCallback((): void => {
    setFlipCardIds((_flipCardIds) => _flipCardIds.slice(0, -2))
  }, [])

  return {
    cards,
    steps,
    flipCardIds,
    resetSteps,
    resetCards: setCards,
    addStep,
    flipBackLatestPair
  }
}
