import { Text, View } from '@nx-card-game/shared/ui'
import React from 'react'

interface CardFrontProps {
  value: number
}

export const CardFront = ({ value }: CardFrontProps): JSX.Element => (
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
