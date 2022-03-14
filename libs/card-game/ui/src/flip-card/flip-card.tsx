import { AnimatedView } from '@nx-card-game/shared/ui'
import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import { CardBack } from './card-back'
import { CardFront } from './card-front'
import { useFlipAnimatedStyle } from './use-flip-animated-style'

interface FlipCardProps {
  id: number
  width: number
  height: number
  isShown: boolean
  value: number
  onBackPress: (id: number) => void
}

export const FlipCard = ({
  id,
  width,
  height,
  isShown,
  value,
  onBackPress
}: FlipCardProps): JSX.Element => {
  const [frontStyle, backStyle] = useFlipAnimatedStyle(isShown ? 1 : 0)

  const handlePress = useCallback((): void => {
    !isShown && onBackPress(id)
  }, [onBackPress, isShown, id])

  return (
    <Pressable onPress={handlePress} testID="FlipCard">
      <AnimatedView
        width={width}
        height={height}
        padding="extraTight"
        testID={isShown ? 'FlipCardFront' : 'FlipCardBack'}>
        <AnimatedView
          position="absolute"
          width="100%"
          height="100%"
          style={[frontStyle]}>
          <CardFront value={value} />
        </AnimatedView>

        <AnimatedView
          position="absolute"
          width="100%"
          height="100%"
          style={[backStyle]}>
          <CardBack />
        </AnimatedView>
      </AnimatedView>
    </Pressable>
  )
}
