import '@testing-library/jest-native/extend-expect'
import { act, fireEvent } from '@testing-library/react-native'
import React from 'react'
import { GameScreen } from './game-screen'
import { render } from './render'

const DEFAULT_CARD_VALUES = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]

describe('Given I am at Game Screen', () => {
  it('Then I should see Restart Button, And I should see Steps Count, And I should see Cards', async () => {
    const { getByText, findByTestId, getAllByTestId } = render(<GameScreen />)

    expect(getByText('Restart')).toBeDefined()

    expect(await findByTestId('StepCounter')).toHaveTextContent('0')

    expect(getAllByTestId('Card')).toHaveLength(12)
  })

  it('When I change device screen size, Then I should see Cards resized', () => {
    const { getByTestId, getAllByTestId } = render(<GameScreen />)
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
    const { getAllByTestId, queryAllByTestId } = render(<GameScreen />)

    expect(queryAllByTestId('CardFront')).toHaveLength(0)

    fireEvent.press(getAllByTestId('CardBack')[0])

    expect(queryAllByTestId('CardFront')).toHaveLength(1)
  })

  it('And I have Cards flipped open, When I press Restart Button, Then I should not see Card Front', async () => {
    const defaultFlipCardIds = [0, 1, 2]
    const { getByText, queryAllByTestId } = render(
      <GameScreen defaultFlipCardIds={defaultFlipCardIds} />
    )

    expect(queryAllByTestId('CardFront')).toHaveLength(
      defaultFlipCardIds.length
    )

    fireEvent.press(getByText('Restart'))

    expect(queryAllByTestId('CardFront')).toHaveLength(0)
  })

  it('And I have 1 Card flipped open, When I flip open a matching Card, Then I should see matching Card stay open', async () => {
    const defaultFlipCardIds = [0]
    const defaultCards = Array.from({ length: 12 }, (_, k) => ({
      id: k,
      value: DEFAULT_CARD_VALUES[k]
    }))

    const { queryAllByTestId, getAllByTestId } = render(
      <GameScreen
        defaultFlipCardIds={defaultFlipCardIds}
        defaultCards={defaultCards}
      />
    )

    expect(queryAllByTestId('CardFront')).toHaveLength(
      defaultFlipCardIds.length
    )

    fireEvent.press(getAllByTestId('CardBack')[0])

    expect(queryAllByTestId('CardFront')).toHaveLength(2)
  })

  it('And I have 1 Card flipped open, When I flip open a non matching Card, Then I should see matching Card flipped closed', async () => {
    jest.useFakeTimers('legacy')
    const defaultFlipCardIds = [0]
    const defaultCards = Array.from({ length: 12 }, (_, k) => ({
      id: k,
      value: DEFAULT_CARD_VALUES[k]
    }))

    const { queryAllByTestId, getAllByTestId, findAllByTestId } = render(
      <GameScreen
        defaultFlipCardIds={defaultFlipCardIds}
        defaultCards={defaultCards}
      />
    )

    expect(queryAllByTestId('CardFront')).toHaveLength(
      defaultFlipCardIds.length
    )

    fireEvent.press(getAllByTestId('CardBack')[1])
    expect(await findAllByTestId('CardFront')).toHaveLength(2)
    void act(() => jest.runOnlyPendingTimers())

    expect(queryAllByTestId('CardFront')).toHaveLength(0)

    jest.useRealTimers()
  })
})
