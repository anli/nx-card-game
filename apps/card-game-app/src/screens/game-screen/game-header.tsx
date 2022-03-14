import { Text, View } from '@nx-card-game/shared/ui'
import React from 'react'
import { Pressable } from 'react-native'

interface GameHeaderProps {
  onRestartPress: () => void
  buttonTitle: string
  stepLabel: string
  stepCount: number
}

export const GameHeader = React.memo(
  ({
    onRestartPress,
    buttonTitle,
    stepLabel,
    stepCount
  }: GameHeaderProps): JSX.Element => {
    return (
      <View flexDirection="row" justifyContent="space-between">
        <Pressable onPress={onRestartPress}>
          <View padding="base">
            <Text color="primary" fontSize={20} fontWeight="bold">
              {buttonTitle}
            </Text>
          </View>
        </Pressable>

        <View flexDirection="row" alignItems="flex-end">
          <Text color="text" fontSize={30} marginBottom="extraTight">
            {stepLabel}
          </Text>
          <Text color="primary" fontSize={48} testID="StepCounter">
            {stepCount}
          </Text>
        </View>
      </View>
    )
  }
)
