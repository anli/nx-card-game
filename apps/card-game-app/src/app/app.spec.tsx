import '@testing-library/jest-native/extend-expect'
import { render } from '@testing-library/react-native'
import React from 'react'
import { App } from './app'

describe('Given I open App', () => {
  it('Then I should see Game Screen', async () => {
    const { getByTestId } = render(<App />)

    expect(getByTestId('GameScreen')).toBeDefined()
  })
})
