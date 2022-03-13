import { Text, View } from '@nx-card-game/shared/ui'
import React from 'react'
import { Pressable, PressableProps } from 'react-native'

const CardBack = ({
  onPress
}: Pick<PressableProps, 'onPress'>): JSX.Element => (
  <Pressable style={{ flex: 1 }} onPress={onPress}>
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
  </Pressable>
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

interface CardProps {
  id: number
  width: number
  height: number
  isShown: boolean
  value: number
  onBackPress: (id: number) => void
}

export const Card = ({
  id,
  width,
  height,
  isShown,
  value,
  onBackPress
}: CardProps): JSX.Element => {
  const handleBackPress = (): void => {
    onBackPress(id)
  }

  return (
    <View
      testID="Card"
      key={id}
      width={width}
      height={height}
      padding="extraTight">
      {isShown ? (
        <CardFront value={value} />
      ) : (
        <CardBack onPress={handleBackPress} />
      )}
    </View>
  )
}
