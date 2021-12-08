import React from 'react'
import { Redirect } from 'react-router-dom'

function NavigateLogin (props) {

    const { afterLogin } = props
    return (
      <Redirect to={{
        pathname: '/',
        state: {
          afterLogin
        }
      }} />
    )
}

export default NavigateLogin
