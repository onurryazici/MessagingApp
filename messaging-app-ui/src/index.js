import React from 'react'
import PropTypes from 'prop-types'
import MessengerCore from './core'
import { MessengerStore } from './redux/messengerStore'
import { Provider } from 'react-redux'
import { SET_CONFIG, SET_LOGGED_USER } from './redux/functions'
import socket from './socket'
import MessengerSocket from './messengerSocket'
export default function ReactMessenger (props){
  const configPayload={
    tokenName:props.tokenName
  }
  
  MessengerStore.dispatch(SET_LOGGED_USER(props.username))
  MessengerStore.dispatch(SET_CONFIG(configPayload))  
  return (
    <Provider store={MessengerStore}>
      <MessengerCore/>
    </Provider>
  )
}

export {
  MessengerSocket,
  MessengerStore
}
ReactMessenger.PropTypes = {
  username : PropTypes.string,
  tokenName : PropTypes.string,
}
