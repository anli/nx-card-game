import { baseTheme, Theme } from './base'
import { tokens } from './tokens'

export const darkTheme: Theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    surface: tokens.colorBlack,
    text: tokens.colorWhite,
    success: tokens.colorGreen,
    warning: tokens.colorYellow,
    critical: tokens.colorRed,
    primary: tokens.colorBlue,
    icon: tokens.colorWhite,
    border: tokens.colorWhite
  }
}
