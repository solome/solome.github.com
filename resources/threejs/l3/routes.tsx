import * as React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import webGL from '@components/webGL'
import L3Navi from './components/L3Navi'

const routes = () => {

  return (

    <Router>
      <L3Navi />
      <Route exact path="/" component={webGL(import(/* webpackChunkName: "l3-examples-index"*//* webpackMode: "lazy" */'@three/l3/examples/index'))} />
      <Route exact path="/cube" component={webGL(import(/* webpackChunkName: "l3-examples-cube"*//* webpackMode: "lazy" */'@three/l3/examples/cube'))} />
      <Route exact path="/vertices-faces" component={webGL(import(/* webpackChunkName: "l3-examples-vertices-faces"*//* webpackMode: "lazy" */'@three/l3/examples/vertices-faces'))} />
    </Router>
  
  )
}

export default routes
