import { Text, View } from '@nx-card-game/shared/ui'
import React from 'react'
import { Pressable } from 'react-native'
import Animated, {
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
): {
  front: {
    opacity: number
    transform: Array<{
      rotateY: string
    }>
  }
  back: {
    opacity: number
    transform: Array<{
      rotateY: string
    }>
  }
} => {
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
  const front = useAnimatedStyle(
    () => ({
      opacity: opacityFront.value,
      transform: [{ ...rotationFront.value }]
    }),
    [opacityFront, rotationFront]
  )
  const back = useAnimatedStyle(
    () => ({
      opacity: opacityBack.value,
      transform: [{ ...rotationBack.value }, { ...rotationFront.value }]
    }),
    [opacityBack, rotationBack]
  )

  return {
    front,
    back
  }
}

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
  const { front, back } = useFlipAnimatedStyle(isShown ? 1 : 0)

  const handlePress = (): void => {
    !isShown && onBackPress(id)
  }

  return (
    <Pressable
      onPress={handlePress}
      testID="FlipCard"
      style={{ width, height, padding: 4 }}>
      <Animated.View testID={isShown ? 'FlipCardFront' : 'FlipCardBack'}>
        <Animated.View
          style={[{ position: 'absolute', width, height, padding: 4 }, front]}>
          <CardFront value={value} />
        </Animated.View>

        <Animated.View
          style={[{ position: 'absolute', width, height, padding: 4 }, back]}>
          <CardBack />
        </Animated.View>
      </Animated.View>
    </Pressable>
  )
}
