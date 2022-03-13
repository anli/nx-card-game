import '@testing-library/jest-native/extend-expect'
import { act, fireEvent, waitFor } from '@testing-library/react-native'
import React from 'react'
import { Alert, AlertButton } from 'react-native'
import { GameScreen } from './game-screen'
import { render } from './render'

const defaultCards = Array.from({ length: 12 }, (_, k) => ({
  id: k,
  value: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6][k]
}))

const lastMatchingCardMocks = {
  defaultFlipCardIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  defaultCards
}

const oneCardOpenMocks = {
  defaultFlipCardIds: [0],
  defaultCards
}

describe('Given I am at Game Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Then I should see Restart Button, And I should see Steps Count, And I should see Cards', async () => {
    const { getByText, findByTestId, getAllByTestId } = render(<GameScreen />)

    expect(getByText('Restart')).toBeDefined()
    expect(await findByTestId('StepCounter')).toHaveTextContent('0')
    expect(getAllByTestId('Card')).toHaveLength(12)
  })

  it('When I change device screen size, Then I should see Cards resized', () => {
    const cardsHeight = 400
    const cardsWidth = 400
    const { getByTestId, getAllByTestId } = render(<GameScreen />)

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

  it('And I have 1 Card flipped open, When I press Restart Button, Then I should not see Card Front', async () => {
    const { getByText, queryAllByTestId } = render(
      <GameScreen {...oneCardOpenMocks} />
    )
    expect(queryAllByTestId('CardFront')).toHaveLength(
      oneCardOpenMocks.defaultFlipCardIds.length
    )

    fireEvent.press(getByText('Restart'))

    expect(queryAllByTestId('CardFront')).toHaveLength(0)
  })

  it('And I have 1 Card flipped open, When I flip open a matching Card, Then I should see matching Card stay open', async () => {
    jest.useFakeTimers('legacy')
    const { queryAllByTestId, getAllByTestId } = render(
      <GameScreen {...oneCardOpenMocks} />
    )

    fireEvent.press(getAllByTestId('CardBack')[0])
    void act(() => jest.runOnlyPendingTimers())

    expect(queryAllByTestId('CardFront')).toHaveLength(2)
    jest.useRealTimers()
  })

  it('And I have 1 Card flipped open, When I flip open a non matching Card, Then I should see matching Card flipped closed', async () => {
    jest.useFakeTimers('legacy')
    const { queryAllByTestId, getAllByTestId, findAllByTestId } = render(
      <GameScreen {...oneCardOpenMocks} />
    )

    fireEvent.press(getAllByTestId('CardBack')[1])
    expect(await findAllByTestId('CardFront')).toHaveLength(2)
    void act(() => jest.runOnlyPendingTimers())

    expect(queryAllByTestId('CardFront')).toHaveLength(0)
    jest.useRealTimers()
  })

  it('When I flip the last matching card, Then I should see message with steps, And I should see Try another round Button', async () => {
    const spyAlert = jest.spyOn(Alert, 'alert')
    const { getAllByTestId } = render(<GameScreen {...lastMatchingCardMocks} />)

    fireEvent.press(getAllByTestId('CardBack')[0])
    await waitFor(() => expect(spyAlert).toBeCalledTimes(1))

    expect(spyAlert.mock.calls[0][0]).toEqual('Congratulations')
    expect(spyAlert.mock.calls[0][1]).toEqual('You win this game by 1 steps!')
    expect((spyAlert.mock.calls[0][2] as AlertButton[])[0]?.text).toEqual(
      'Try another round'
    )
  })

  it('And I flip the last matching card, When I press Try another round Button, Then I should see game restart', async () => {
    const spyAlert = jest.spyOn(Alert, 'alert')
    const { queryAllByTestId, getAllByTestId } = render(
      <GameScreen {...lastMatchingCardMocks} />
    )
    fireEvent.press(getAllByTestId('CardBack')[0])
    await waitFor(() => expect(spyAlert).toBeCalledTimes(1))

    void act(() => {
      const buttons = spyAlert.mock.calls[0][2] as AlertButton[]
      buttons[0]?.onPress?.()
    })

    expect(queryAllByTestId('CardFront')).toHaveLength(0)
  })
})
