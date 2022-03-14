import { CardProps, getCards, useGame } from '@nx-card-game/card-game/feature'
import {
  ANIMATION_DURATION_MILLISECONDS,
  FlipCard,
  GameHeader
} from '@nx-card-game/card-game/ui'
import { Screen, View } from '@nx-card-game/shared/ui'
import React, { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { useCardDimensions } from './use-card-dimensions'

const INCORRECT_MATCH_DELAY_MILLISECONDS = 1000
const CARD_PAIRS_VALUE = 6
const MemoFlipCard = React.memo(FlipCard)
const MemoGameHeader = React.memo(GameHeader)

interface GameScreenProps {
  defaultFlipCardIds?: number[]
  defaultCards?: CardProps[]
}

export const GameScreen = ({
  defaultCards = getCards(CARD_PAIRS_VALUE),
  defaultFlipCardIds = []
}: GameScreenProps): React.ReactElement => {
  const [pendingAnimation, setPendingAnimation] = useState(false)
  const {
    cards,
    steps,
    flipCardIds,
    resetSteps,
    resetCards,
    addStep,
    flipBackLatestPair
  } = useGame(defaultCards, defaultFlipCardIds)
  const { width: cardWidth, height: cardHeight, onLayout } = useCardDimensions()

  const handleRestart = useCallback((): void => {
    resetSteps()

    setTimeout(() => {
      resetCards(getCards(CARD_PAIRS_VALUE))
    }, ANIMATION_DURATION_MILLISECONDS)
  }, [resetSteps, resetCards])

  const handleBackCardPress = useCallback(
    (id: number): void => {
      if (!pendingAnimation) {
        setPendingAnimation(true)
        const gameState = addStep(id)

        switch (gameState) {
          case 'BOTH_CARD_INCORRECT':
            setTimeout(() => {
              flipBackLatestPair()
              setPendingAnimation(false)
            }, INCORRECT_MATCH_DELAY_MILLISECONDS)
            break

          case 'GAME_ENDED':
            setTimeout(() => {
              Alert.alert(
                'Congratulations',
                `You win this game by ${steps.length + 1} steps!`,
                [{ text: 'Try another round', onPress: handleRestart }]
              )
              setPendingAnimation(false)
            }, ANIMATION_DURATION_MILLISECONDS)
            break
          default:
            setPendingAnimation(false)
        }
      }
    },
    [addStep, flipBackLatestPair, steps.length, handleRestart, pendingAnimation]
  )

  return (
    <Screen backgroundColor="surface" flex={1} testID="GameScreen">
      <MemoGameHeader
        onRestartPress={handleRestart}
        buttonTitle="Restart"
        stepLabel="STEPS:"
        stepCount={steps.length}
      />
      <View
        testID="Cards"
        flex={1}
        alignItems="center"
        flexDirection="row"
        flexWrap="wrap"
        onLayout={onLayout}>
        {cards.map(({ id, value }) => {
          const isShown = flipCardIds.some((flipCardId) => flipCardId === id)

          return (
            <MemoFlipCard
              key={id}
              id={id}
              width={cardWidth}
              height={cardHeight}
              isShown={isShown}
              value={value}
              onBackPress={handleBackCardPress}
            />
          )
        })}
      </View>
    </Screen>
  )
}
