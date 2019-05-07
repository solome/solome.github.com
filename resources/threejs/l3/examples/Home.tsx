import * as React from 'react'
import ReactLoading from 'react-loading'

export default class Home extends React.Component {

  constructor (props) {
  
    super(props)
  
  }

  render () {
  
    return (
      <div>
        <ReactLoading type={'bars'} color={'#2bb8aa'} height={'20%'} width={'20%'} />
      </div>
    )
    
  }
}