import * as React from 'react'

import ReactLoading from 'react-loading'

export interface Props {
  done: boolean
}

export interface State {
  done: boolean
}

export default function (promise: Promise<any>) {
  
  return class extends React.Component<Props, State> {
    
    refCanvas: React.RefObject<HTMLCanvasElement>
  
    dispose: Function

    constructor (props) {
      
      super(props)
      
      this.refCanvas = React.createRef()

      this.state = {

        done: false
      
      }
    
    }

    render () {
    
      const loading = this.state.done ? null : <ReactLoading key="0" type={'bars'} color={'#2bb8aa'} height={'20%'} width={'20%'} />

      return (
    
        <div className="webgl-canvas">
          { loading }
          <canvas ref={this.refCanvas} />          
        </div>
    
      )
    
    }

    componentDidMount () {
  
      promise.then(m => m.default).then(m => (this.dispose = m(this.refCanvas.current)) && this.setState({done: true}))

    }

    componentWillUnmount () {

      if (this.dispose) this.dispose()

    }
  }
}