import { createTheme } from '@shopify/restyle'
import { tokens } from './tokens'

const pxToNumber = (px: string): number => {
  return parseInt(px.replace('px', ''), 10)
}

const base = {
  colors: {
    border: '',
    surface: '',
    text: '',
    success: '',
    warning: '',
    critical: '',
    primary: '',
    icon: '',
    transparent: 'transparent'
  },
  spacing: {
    none: 0,
    extraTight: pxToNumber(tokens.spacingExtraTight),
    tight: pxToNumber(tokens.spacingTight),
    baseTight: pxToNumber(tokens.spacingBaseTight),
    base: pxToNumber(tokens.spacingBase),
    loose: pxToNumber(tokens.spacingLoose),
    extraLoose: pxToNumber(tokens.spacingExtraLoose)
  },
  borderRadii: {
    none: 0,
    extraTight: pxToNumber(tokens.spacingExtraTight),
    tight: pxToNumber(tokens.spacingTight),
    baseTight: pxToNumber(tokens.spacingBaseTight),
    base: pxToNumber(tokens.spacingBase),
    loose: pxToNumber(tokens.spacingLoose),
    extraLoose: pxToNumber(tokens.spacingExtraLoose)
  },
  breakpoints: {
    phone: 0,
    tablet: 768
  },
  textVariants: {},
  screenVariants: {}
}

export const baseTheme = createTheme({
  ...base
})

export type Theme = typeof baseTheme
