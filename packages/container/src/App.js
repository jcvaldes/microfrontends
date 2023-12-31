import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
// import MarketingApp from './components/MarketingApp'
// import AuthApp from './components/AuthApp'
import Header from './components/Header'
import Progress from './components/Progress'
const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))
const DashboardLazy = lazy(() => import('./components/DashboardApp'))

import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'

import { createBrowserHistory } from 'history'

// esto es para que no choquen los estilos en produccion
// cuando se renombran las clases
const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
})

const history = createBrowserHistory()

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard')
    }
  }, [isSignedIn])

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              {/* <Route path="/auth" component={AuthApp} />
            <Route path="/" component={MarketingApp} /> */}

              {/* <Route path="/auth" component={AuthLazy} /> */}
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazy />
              </Route>

              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
          {/* <MarketingApp /> */}
        </div>
      </StylesProvider>
    </Router>
  )
}
