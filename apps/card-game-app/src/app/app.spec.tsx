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

  it('When I change device screen size, Then I should see Cards resized', () => {
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

  it('When I press Card Back, Then I should see Card Front', async () => {
    const { getAllByTestId, queryAllByTestId } = render(<App />)

    expect(await queryAllByTestId('CardFront')).toHaveLength(0)

    fireEvent.press(getAllByTestId('CardBack')[0])

    expect(await queryAllByTestId('CardFront')).toHaveLength(1)
  })

  it('And I have Cards Front, When I press Restart Button, Then I should not see Card Front', async () => {
    const { getByText, getAllByTestId, queryAllByTestId } = render(<App />)

    fireEvent.press(getAllByTestId('CardBack')[0])
    fireEvent.press(getAllByTestId('CardBack')[0])
    fireEvent.press(getAllByTestId('CardBack')[0])
    expect(await queryAllByTestId('CardFront')).toHaveLength(3)

    fireEvent.press(getByText('Restart'))

    expect(await queryAllByTestId('CardFront')).toHaveLength(0)
    expect(await queryAllByTestId('CardBack')).toHaveLength(12)
  })
})
