import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './app.scss'

const smoothstep = (min, max, _x) => {
  const x = Math.max(0, Math.min(1, (_x - min) / (max - min)))
  return x * x * (3 - 2 * x)
}

export default function run () {
  const ndCanvas: HTMLCanvasElement = document.querySelector('#canvas')

  console.warn('ndCanvas', ndCanvas)

  ReactDOM.render(<h1>Hello World!</h1>, document.querySelector('#app'))

  const ctx = ndCanvas.getContext('webgl')
  ctx.clearColor(0, 1, 0, 1)
  ctx.clear(ctx.COLOR_BUFFER_BIT)
}
