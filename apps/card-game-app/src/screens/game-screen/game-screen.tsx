import { Screen, View } from '@nx-card-game/shared/ui'
import React, { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { ANIMATION_DURATION_MILLISECONDS, FlipCard } from './flip-card'
import { GameHeader } from './game-header'
import { getRandomNumberPairs } from './get-random-number-pairs'

const INCORRECT_MATCH_DELAY_MILLISECONDS = 1000

interface CardProps {
  id: number
  value: number
}

const getCards = (): CardProps[] =>
  getRandomNumberPairs(6).map((value, index) => {
    return { id: index, value }
  })

interface GameScreenProps {
  defaultFlipCardIds?: number[]
  defaultCards?: CardProps[]
}

export const GameScreen = ({
  defaultCards = getCards(),
  defaultFlipCardIds = []
}: GameScreenProps): React.ReactElement => {
  const [cards, setCards] = useState(defaultCards)
  const [cardHeight, setCardHeight] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)
  const [flipCardIds, setFlipCardIds] = useState<number[]>(defaultFlipCardIds)
  const [steps, setSteps] = useState<number[]>([])

  const handleRestart = useCallback((): void => {
    setFlipCardIds([])
    setSteps([])

    setTimeout(() => {
      setCards(getCards())
    }, ANIMATION_DURATION_MILLISECONDS)
  }, [])

  const handleBackCardPress = useCallback(
    (id: number): void => {
      setSteps([...steps, id])
      setFlipCardIds([...flipCardIds, id])

      if (flipCardIds.length > 0 && flipCardIds.length % 2 !== 0) {
        const [previousCardId] = flipCardIds.slice(-1)
        const { value: previousCardValue } = cards[previousCardId]
        const { value: currentCardValue } = cards[id]

        if (previousCardValue !== currentCardValue) {
          setTimeout(() => {
            setFlipCardIds(flipCardIds.slice(0, -1))
          }, INCORRECT_MATCH_DELAY_MILLISECONDS)
          return
        }

        if (flipCardIds.length + 1 === cards.length) {
          setTimeout(() => {
            Alert.alert(
              'Congratulations',
              `You win this game by ${steps.length + 1} steps!`,
              [{ text: 'Try another round', onPress: handleRestart }]
            )
          }, ANIMATION_DURATION_MILLISECONDS)
        }
      }
    },
    [cards, flipCardIds, steps, handleRestart]
  )

  return (
    <Screen backgroundColor="surface" flex={1} testID="GameScreen">
      <GameHeader
        onRestartPress={handleRestart}
        buttonTitle="Restart"
        stepLabel="STEPS:"
        stepCount={steps.length}
      />
      <View
        testID="Cards"
        flex={1}
        flexDirection="row"
        flexWrap="wrap"
        onLayout={(ev) => {
          setCardHeight(ev.nativeEvent.layout.height)
          setCardWidth(ev.nativeEvent.layout.width)
        }}>
        {cards.map(({ id, value }) => {
          const isShown = flipCardIds.some((flipCardId) => flipCardId === id)

          return (
            <FlipCard
              key={id}
              id={id}
              width={cardWidth / 3}
              height={cardHeight / 4}
              isShown={isShown}
              value={value}
              onBackPress={handleBackCardPress}
            />
          )
        })}
      </View>
    </Screen>
  )
}
