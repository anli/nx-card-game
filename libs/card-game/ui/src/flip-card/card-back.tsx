import { Text, View } from '@nx-card-game/shared/ui'
import React from 'react'

export const CardBack = (): JSX.Element => (
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
