import { Screen, Text, ThemeProvider, View } from '@nx-card-game/shared/ui'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { Card } from './card'
import { getRandomNumberPairs } from './get-random-number-pairs'

const cards = getRandomNumberPairs(6).map((value, index) => {
  return { id: index, value }
})

const GameScreen = (): React.ReactElement => {
  const [cardHeight, setCardHeight] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)
  const [flipCardIds, setFlipCardIds] = useState<number[]>([])

  const handleBackCardPress = (id: number): void => {
    setFlipCardIds([...flipCardIds, id])
  }

  return (
    <Screen backgroundColor="surface" flex={1}>
      <View flexDirection="row" justifyContent="space-between">
        <Pressable>
          <View padding="base">
            <Text color="primary" fontSize={20} fontWeight="bold">
              Restart
            </Text>
          </View>
        </Pressable>

        <View flexDirection="row" alignItems="flex-end" testID="StepCounter">
          <Text color="text" fontSize={30} marginBottom="extraTight">
            STEPS:
          </Text>
          <Text color="primary" fontSize={48}>
            0
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

export const App = (): React.ReactElement => (
  <ThemeProvider>
    <GameScreen />
  </ThemeProvider>
)
