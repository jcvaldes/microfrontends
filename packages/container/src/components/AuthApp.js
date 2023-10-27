import { mount } from 'auth/AuthApp'
import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default ({ onSignIn }) => {
  const ref = useRef(null)
  const history = useHistory()
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      // lo pongo porque sino tengo q apretar 2 veces el boton de login
      // porque no tiene un estado inicial correcto para /auth
      initialPath: history.location.pathname,
      // onNavigate: (location) => {
      // este objeto lo paso solo si quiero actualizar las rutas en el hijo si quiero que se navegue la url
      // sino no es necesario
      onNavigate: ({ pathname: nextPathname }) => {
        // console.log('The container noticed navigation in Marketing')
        // console.log(location)
        const { pathname } = history.location
        if (pathname !== nextPathname) {
          history.push(nextPathname)
        }
      },
      // onSignIn: () => {
      //   onSignIn()
      //   console.log('User signed in')
      // },
      onSignIn,
    })
    // este objeto lo paso solo si quiero actualizar las rutas del navegador
    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />
}
