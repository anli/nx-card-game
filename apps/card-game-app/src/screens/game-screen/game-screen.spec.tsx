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
    jest.useRealTimers()
  })

  it('Then I should see Restart Button, And I should see Steps Count, And I should see Cards', async () => {
    const { getByText, findByTestId, getAllByTestId } = render(<GameScreen />)

    expect(getByText('Restart')).toBeDefined()
    expect(await findByTestId('StepCounter')).toHaveTextContent('0')
    expect(getAllByTestId('FlipCard')).toHaveLength(12)
  })

  it('When I change device screen size, Then I should see Cards resized', () => {
    const cardsHeight = 400
    const cardsWidth = 300
    const { getByTestId, getAllByTestId } = render(<GameScreen />)

    fireEvent(getByTestId('Cards'), 'layout', {
      nativeEvent: {
        layout: {
          width: cardsWidth,
          height: cardsHeight
        }
      }
    })

    expect(getAllByTestId('FlipCard')[0]).toHaveStyle({
      width: cardsWidth / 3,
      height: cardsHeight / 4
    })
  })

  it('When I press Card Back, Then I should see Card Front', () => {
    jest.useFakeTimers()
    const { queryAllByTestId, getAllByTestId } = render(<GameScreen />)
    expect(queryAllByTestId('FlipCardFront')).toHaveLength(0)

    fireEvent.press(getAllByTestId('FlipCardBack')[0])
    void act(() => jest.runAllTimers())

    expect(getAllByTestId('FlipCardFront')).toHaveLength(1)
    jest.useRealTimers()
  })

  it('And I have 1 Card flipped open, When I press Restart Button, Then I should not see Card Front', () => {
    jest.useFakeTimers()
    const { getByText, getAllByTestId, queryAllByTestId } = render(
      <GameScreen {...oneCardOpenMocks} />
    )
    expect(getAllByTestId('FlipCardFront')).toHaveLength(1)

    fireEvent.press(getByText('Restart'))
    void act(() => jest.runAllTimers())

    expect(queryAllByTestId('FlipCardFront')).toHaveLength(0)
    jest.useRealTimers()
  })

  it('And I have 1 Card flipped open, When I flip open a matching Card, Then I should see matching Card stay open', () => {
    jest.useFakeTimers()
    const { getAllByTestId, queryAllByTestId } = render(
      <GameScreen {...oneCardOpenMocks} />
    )
    expect(getAllByTestId('FlipCardFront')).toHaveLength(1)

    fireEvent.press(getAllByTestId('FlipCard')[1])
    void act(() => jest.runAllTimers())

    expect(queryAllByTestId('FlipCardFront')).toHaveLength(2)
    jest.useRealTimers()
  })

  it('And I have 1 Card flipped open, When I flip open a non matching Card, Then I should see both Card flipped closed', () => {
    jest.useFakeTimers()
    const { getAllByTestId, queryAllByTestId } = render(
      <GameScreen {...oneCardOpenMocks} />
    )
    expect(getAllByTestId('FlipCardFront')).toHaveLength(1)

    fireEvent.press(getAllByTestId('FlipCard')[2])
    void act(() => jest.runAllTimers())

    expect(queryAllByTestId('FlipCardFront')).toHaveLength(0)
    jest.useRealTimers()
  })

  it('When I flip the last matching card, Then I should see message with steps, And I should see Try another round Button', async () => {
    const spyAlert = jest.spyOn(Alert, 'alert')
    const { getAllByTestId } = render(<GameScreen {...lastMatchingCardMocks} />)

    fireEvent.press(getAllByTestId('FlipCard')[11])
    await waitFor(() => expect(spyAlert).toBeCalledTimes(1))

    expect(spyAlert.mock.calls[0][0]).toEqual('Congratulations')
    expect(spyAlert.mock.calls[0][1]).toEqual('You win this game by 1 steps!')
    expect((spyAlert.mock.calls[0][2] as AlertButton[])[0]?.text).toEqual(
      'Try another round'
    )
  })

  it('And I flip the last matching card, When I press Try another round Button, Then I should see game restart', () => {
    jest.useFakeTimers()
    const spyAlert = jest.spyOn(Alert, 'alert')
    const { getByTestId, getAllByTestId } = render(
      <GameScreen {...lastMatchingCardMocks} />
    )
    fireEvent.press(getAllByTestId('FlipCard')[11])
    void act(() => jest.runAllTimers())
    expect(getByTestId('StepCounter')).toHaveTextContent('1')

    void act(() => {
      const buttons = spyAlert.mock.calls[0][2] as AlertButton[]
      buttons[0]?.onPress?.()
    })
    void act(() => jest.runAllTimers())

    expect(getByTestId('StepCounter')).toHaveTextContent('0')
    jest.useRealTimers()
  })
})
