import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Mount function to start up the app
const mount = (el) => {
  ReactDOM.render(<App />, el)
}
// if we are in development mode and in isolation call mount inmediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root')
  // Assuming our container doesn't have an element with id 'dev-products'
  if (devRoot) {
    // We are probably running in isolation
    mount(devRoot)
  }
}

// we are running through container and we should export the mount function
export { mount }
