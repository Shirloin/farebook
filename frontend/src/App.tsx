import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Template from './page/Template'
import { ApolloProvider } from '@apollo/client'
import client from './helper/ApolloClient'
import { Toaster } from 'react-hot-toast'
import { SearchProvider } from './context/SearchContext'
import { SkeletonTheme } from 'react-loading-skeleton'

function App() {

  return (
    <>
      <Toaster />
      <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
        <SearchProvider>
          <ApolloProvider client={client}>
            <BrowserRouter>
              <Template />
            </BrowserRouter>
          </ApolloProvider>
        </SearchProvider>
      </SkeletonTheme>
    </>
  )
}

export default App
