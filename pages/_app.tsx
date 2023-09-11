import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import DefaultTheme from '../src/shared/theme/default-theme'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: '500',
  subsets: ['latin'],
  style: ['normal'],
  display: 'block'
})

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache(),
  })

  return (
    <ChakraProvider theme={DefaultTheme}>
      <ApolloProvider client={client}>
        <main className={poppins.className}>
          <Component {...pageProps} />
        </main>
      </ApolloProvider>
    </ChakraProvider>
  )
}