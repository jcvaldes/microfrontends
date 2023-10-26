import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MarketingApp from './components/MarketingApp'
import Header from './components/Header'
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'

// esto es para que no choquen los estilos en produccion
// cuando se renombran las clases
const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
})

export default () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header />
          <MarketingApp />
        </div>{' '}
      </StylesProvider>
    </BrowserRouter>
  )
}
