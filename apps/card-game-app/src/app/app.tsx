import { Screen, Text, ThemeProvider, View } from '@nx-card-game/shared/ui'
import React, { useState } from 'react'
import { Pressable } from 'react-native'

const cards = Array.from({ length: 12 }, (_, k) => {
  return { id: k }
})

const GameScreen = (): React.ReactElement => {
  const [cardHeight, setCardHeight] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)

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
        {cards.map(({ id }) => (
          <View
            testID="Card"
            key={id}
            width={cardWidth / 3}
            height={cardHeight / 4}
            padding="extraTight">
            <View
              flex={1}
              backgroundColor="primary"
              borderColor="border"
              borderWidth={4}
              borderRadius="baseTight"
              alignItems="center"
              justifyContent="center">
              <Text color="text" fontSize={40}>
                ?
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  )
}

export const App = (): React.ReactElement => (
  <ThemeProvider>
    <GameScreen />
  </ThemeProvider>
)
