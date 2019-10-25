import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './app.scss'

export default function run () {
  const ndCanvas = document.querySelector('#canvas')

  console.warn('ndCanvas', ndCanvas)

  ReactDOM.render(<h1>Hello World!</h1>, document.querySelector('#app'))
}
