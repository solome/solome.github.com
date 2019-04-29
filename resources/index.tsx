import * as React from 'react'
import * as ReactDOM from 'react-dom'

export default function run () {
  ReactDOM.render(<h1>Hello World!</h1>,
    document.querySelector('#app')
  )
}
