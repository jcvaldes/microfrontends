import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'

import Landing from './components/Landing'
import Pricing from './components/Pricing'

// esto es para que no choquen los estilos en produccion
// cuando se renombran las clases
const generateClassName = createGenerateClassName({
  productionPrefix: 'ma',
})

export default ({ history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route exact path="/pricing" component={Pricing} />
            <Route path="/" component={Landing} />
          </Switch>{' '}
        </Router>
      </StylesProvider>
    </div>
  )
}
