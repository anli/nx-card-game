import { Screen, Text, ThemeProvider, View } from '@nx-card-game/shared/ui'
import React from 'react'

const GameScreen = (): React.ReactElement => {
  return (
    <Screen>
      <View>
        <Text>Welcome</Text>
      </View>
    </Screen>
  )
}

export const App = (): React.ReactElement => (
  <ThemeProvider>
    <GameScreen />
  </ThemeProvider>
)
