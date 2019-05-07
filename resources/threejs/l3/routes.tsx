import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import webGL from '@components/webGL'

const routes = () => {
  return (
    <Router>
      <div className="l3-nav">
        <ul>
        <li><Link to="/threejs/l3">Index</Link></li>
        <li><Link to="/threejs/l3/cube">Cube</Link></li>
        </ul>
      </div>
      <Route exact path="/threejs/l3" component={webGL(import(/* webpackChunkName: "l3-examples-home"*//* webpackMode: "lazy" */'@three/l3/examples/index'))} />
      <Route exact path="/threejs/l3/cube" component={webGL(import(/* webpackChunkName: "l3-examples-cube"*//* webpackMode: "lazy" */'@three/l3/examples/cube'))} />
    </Router>
  )
}

export default routes
