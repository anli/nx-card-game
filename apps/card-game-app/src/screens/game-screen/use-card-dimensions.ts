import { useState } from 'react'
import { LayoutChangeEvent } from 'react-native'

export const useCardDimensions = (): {
  height: number
  width: number
  onLayout: (ev: LayoutChangeEvent) => void
} => {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const onLayout = (ev: LayoutChangeEvent): void => {
    setHeight(ev.nativeEvent.layout.height / 4)
    setWidth(ev.nativeEvent.layout.width / 3)
  }

  return { height, width, onLayout }
}
