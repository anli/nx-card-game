import '@testing-library/jest-native/extend-expect'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { App } from './app'

describe('Given I am at Game Screen', () => {
  it('Then I should see Restart Button, And I should see Steps Count, And I should see Cards', () => {
    const { getByText, getByTestId, getAllByTestId } = render(<App />)

    expect(getByText('Restart')).toBeDefined()

    expect(getByTestId('StepCounter')).toHaveTextContent('STEPS:0')

    expect(getAllByTestId('Card')).toHaveLength(12)
  })

  it('When device screen size changes, Then I should see Cards resized', async () => {
    const { getByTestId, getAllByTestId } = render(<App />)
    const cardsHeight = 400
    const cardsWidth = 400

    fireEvent(getByTestId('Cards'), 'layout', {
      nativeEvent: {
        layout: {
          width: cardsWidth,
          height: cardsHeight
        }
      }
    })

    expect(getAllByTestId('Card')[0]).toHaveStyle({
      width: cardsWidth / 3,
      height: cardsHeight / 4
    })
  })
})
