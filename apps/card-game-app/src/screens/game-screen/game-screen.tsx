import { Screen, Text, View } from '@nx-card-game/shared/ui'
import React, { useState } from 'react'
import { Alert, Pressable } from 'react-native'
import { Card } from './card'
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

  const handleRestart = (): void => {
    setFlipCardIds([])
    setCards(getCards())
    setSteps([])
  }

  const handleBackCardPress = (id: number): void => {
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
        return Alert.alert(
          'Congratulations',
          `You win this game by ${steps.length + 1} steps!`,
          [{ text: 'Try another round', onPress: handleRestart }]
        )
      }
    }
  }

  return (
    <Screen backgroundColor="surface" flex={1} testID="GameScreen">
      <View flexDirection="row" justifyContent="space-between">
        <Pressable onPress={handleRestart}>
          <View padding="base">
            <Text color="primary" fontSize={20} fontWeight="bold">
              Restart
            </Text>
          </View>
        </Pressable>

        <View flexDirection="row" alignItems="flex-end">
          <Text color="text" fontSize={30} marginBottom="extraTight">
            STEPS:
          </Text>
          <Text color="primary" fontSize={48} testID="StepCounter">
            {steps.length}
          </Text>
        </View>
      </View>
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
            <Card
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
