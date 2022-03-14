import {
  backgroundColor,
  BackgroundColorProps,
  createRestyleComponent,
  layout,
  LayoutProps,
  PositionProps,
  spacing,
  SpacingProps,
  VariantProps
} from '@shopify/restyle'
import React from 'react'
import Animated from 'react-native-reanimated'
import { Theme } from '../..'

export type Props = SpacingProps<Theme> &
LayoutProps<Theme> &
BackgroundColorProps<Theme> &
PositionProps<Theme> &
VariantProps<Theme, 'viewVariants'> &
React.ComponentProps<typeof Animated.View> & {
  children?: React.ReactNode
}

export const AnimatedView = createRestyleComponent<Props, Theme>(
  [spacing, layout, backgroundColor],
  Animated.View
)
