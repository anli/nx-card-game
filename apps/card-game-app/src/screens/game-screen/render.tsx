import { ThemeProvider } from '@nx-card-game/shared/ui'
import {
  render as TestingRender,
  RenderAPI
} from '@testing-library/react-native'
import React from 'react'

export const render = (Component: JSX.Element): RenderAPI => {
  return TestingRender(<ThemeProvider>{Component}</ThemeProvider>)
}
