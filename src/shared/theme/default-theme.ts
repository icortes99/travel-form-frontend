import { extendTheme } from '@chakra-ui/react'

const sizes = {
  sizes: {
    text: '1rem',
    borderRadius: '0.9rem'
  }
}

const borderRadius = {
  radii: {
    none: '0',
    sm: '0.9rem'
  },
}

const colors = {
  white: {
    main: '#ECECEC',
    btnColor: '#111042',
    subTitles: '#636363',
    text: '#000000',
    skyBlue: '#00C4C8',
    pink: '#B5456E'
  }
}

const breakpoints = {
  base: '0px',
  sm: '300px',
  md: '600px',
  lg: '900px',
  xl: '1200px',
  '2xl': '1800px',
}

const DefaultTheme = extendTheme({ colors, breakpoints, borderRadius })

export default DefaultTheme