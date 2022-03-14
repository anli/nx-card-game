import { AnimatedView, Text, View } from '@nx-card-game/shared/ui'
import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming
} from 'react-native-reanimated'

export const ANIMATION_DURATION_MILLISECONDS = 300
const ANIMATION_TIMING_CONFIG = {
  duration: ANIMATION_DURATION_MILLISECONDS,
  easing: Easing.inOut(Easing.ease)
}

const CardBack = (): JSX.Element => (
  <View
    testID="CardBack"
    flex={1}
    backgroundColor="primary"
    borderColor="border"
    borderWidth={4}
    borderRadius="baseTight"
    alignItems="center"
    justifyContent="center">
    <Text color="text" fontSize={40}>
      ?
    </Text>
  </View>
)

const CardFront = ({ value }: { value: number }): JSX.Element => (
  <View
    testID="CardFront"
    flex={1}
    backgroundColor="text"
    borderColor="border"
    borderWidth={4}
    borderRadius="baseTight"
    alignItems="center"
    justifyContent="center">
    <Text color="surface" fontSize={24}>
      {value}
    </Text>
  </View>
)

const useFlipAnimatedStyle = (
  side: 0 | 1
): [
  {
    opacity: number
    transform: Array<{
      rotateY: string
    }>
  },
  {
    opacity: number
    transform: Array<{
      rotateY: string
    }>
  }
] => {
  const rotatePosition = interpolate(side, [0, 1], [180, 360])
  const rotateValue = useDerivedValue(() =>
    withTiming(rotatePosition, ANIMATION_TIMING_CONFIG)
  )
  const rotationFront = useDerivedValue(
    () => ({
      rotateY: `${rotateValue.value}deg`
    }),
    [rotateValue]
  )
  const rotationBack = useDerivedValue(
    () => ({
      rotateY: '180deg'
    }),
    []
  )
  const opacityFront = useDerivedValue(
    () => withTiming(side, ANIMATION_TIMING_CONFIG),
    [side]
  )
  const opacityBack = useDerivedValue(
    () => withTiming(side === 0 ? 1 : 0, ANIMATION_TIMING_CONFIG),
    [side]
  )
  const frontStyle = useAnimatedStyle(
    () => ({
      opacity: opacityFront.value,
      transform: [{ ...rotationFront.value }]
    }),
    [opacityFront, rotationFront]
  )
  const backStyle = useAnimatedStyle(
    () => ({
      opacity: opacityBack.value,
      transform: [{ ...rotationBack.value }, { ...rotationFront.value }]
    }),
    [opacityBack, rotationBack]
  )

  return [frontStyle, backStyle]
}

interface FlipCardProps {
  id: number
  width: number
  height: number
  isShown: boolean
  value: number
  onBackPress: (id: number) => void
}

export const FlipCard = React.memo(
  ({
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
)
