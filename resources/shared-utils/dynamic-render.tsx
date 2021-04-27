import * as React from 'react'
import * as ReactDOM from 'react-dom'

export default function dynamicRender(cls: string, Module) {
  const nd = (() => {
    const ndPanel = document.querySelector('.' + cls)
    if (ndPanel) {
      ReactDOM.unmountComponentAtNode(ndPanel)

      return ndPanel
    }
    const newNdPanel = document.createElement('div')
    newNdPanel.setAttribute('class', cls)
    document.body.appendChild(newNdPanel)
    return newNdPanel
  })()

  ReactDOM.render(<Module />, nd)

  return () => ReactDOM.unmountComponentAtNode(nd)
}
