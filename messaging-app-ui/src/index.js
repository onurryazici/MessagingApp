import React from 'react'
import PropTypes from 'prop-types'
import MessengerCore from './core'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { SET_CONFIG, SET_LOGGED_USER } from './redux/functions'
import socket from './socket'


export default function ReactMessenger (props){
  const configPayload={
    tokenName:props.tokenName
  }
  
  store.dispatch(SET_LOGGED_USER(props.username))
  store.dispatch(SET_CONFIG(configPayload))  
  return (
    <Provider store={store}>
      <MessengerCore/>
    </Provider>
  )
}

export {
  socket
}
ReactMessenger.PropTypes = {
  username : PropTypes.string,
  tokenName : PropTypes.string,
}
