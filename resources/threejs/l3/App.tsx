import * as React from 'react'
import * as ReactDOM from 'react-dom'

import routes from './routes'

import './app.scss'

const App: JSX.Element = routes()

export default function run () {
  ReactDOM.render(App, document.querySelector('#app'))
}
