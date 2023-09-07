import { ColorModeScript } from '@chakra-ui/react'
import { Html, Head, Main, NextScript } from 'next/document'
import theme from '../src/shared/theme/theme'

export default function Document() {
  return (
    <Html lang='es'>
      <Head>
        <link rel='stylesheet' href='./styles/variables.css' />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}