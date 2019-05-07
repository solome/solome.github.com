import * as React from 'react'

import ReactLoading from 'react-loading'

export interface Props {
}

export interface State {
}

export default function (promise: Promise<any>) {
  
  return class extends React.Component<Props, State> {
    
    refCanvas: React.RefObject<HTMLCanvasElement>
  
    dispose: Function

    constructor (props) {
      
      super(props)
      
      this.refCanvas = React.createRef()

    }

    render () {
    

      return (
    
        <div className="webgl-canvas">
          <canvas ref={this.refCanvas} />          
        </div>
    
      )
    
    }

    componentDidMount () {
  
      promise.then(m => m.default).then(m => this.dispose = m(this.refCanvas.current))

    }

    componentWillUnmount () {

      if (this.dispose) this.dispose()

    }
  }
}