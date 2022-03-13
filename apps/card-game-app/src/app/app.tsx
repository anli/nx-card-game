import { ThemeProvider } from '@nx-card-game/shared/ui'
import React from 'react'
import { GameScreen } from '../screens'

export const App = (): React.ReactElement => (
  <ThemeProvider>
    <GameScreen />
  </ThemeProvider>
)
