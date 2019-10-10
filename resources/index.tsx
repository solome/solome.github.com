import * as React from 'react'
import * as ReactDOM from 'react-dom'
import minionsGif from './images/minions.gif'

export default function run () {
  ReactDOM.render(<img src={minionsGif} className="minions" width="80"/>, document.querySelector('#app'))
}

