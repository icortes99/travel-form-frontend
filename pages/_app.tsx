import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { RecoilRoot } from 'recoil'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import DefaultTheme from '../src/shared/theme/default-theme'
import Poppins from '../src/shared/font/font'

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache({
      addTypename: false
    }),
  })

  return (
    <RecoilRoot>
      <ChakraProvider theme={DefaultTheme}>
        <ApolloProvider client={client}>
          <main className={Poppins.className}>
            <Component {...pageProps} />
          </main>
        </ApolloProvider>
      </ChakraProvider>
    </RecoilRoot>
  )
}