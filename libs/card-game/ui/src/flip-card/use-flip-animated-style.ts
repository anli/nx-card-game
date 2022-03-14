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

export const useFlipAnimatedStyle = (
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
