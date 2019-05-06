import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './app.scss';

export default function run () {
  ReactDOM.render(<h1>Hello World!</h1>, document.querySelector('#app'))

  import('./split-chunks.ts')
    .then(npm => console.log(npm))
}

