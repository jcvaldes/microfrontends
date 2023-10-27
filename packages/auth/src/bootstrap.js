import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'

// Mount function to start up the app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  debugger
  // default history solo para correrlo en isolation
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    })

  // poner solo si quiero que el padre actualice la url del router
  if (onNavigate) {
    history.listen(onNavigate)
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el)

  // poner solo si quiero que el padre actualice la url del router
  return {
    // onParentNavigate(location) {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location
      // console.log('Container just navigated')
      if (pathname !== nextPathname) {
        history.push(nextPathname)
      }
    },
  }
}
// if we are in development mode and in isolation call mount inmediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root')
  // Assuming our container doesn't have an element with id 'dev-products'
  if (devRoot) {
    // We are probably running in isolation
    mount(devRoot, { defaultHistory: createBrowserHistory() })
  }
}

// we are running through container and we should export the mount function
export { mount }
