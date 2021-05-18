import React from 'react'
import PropTypes from 'prop-types'
import MessengerCore from './core'
import { MessengerStore } from './redux/messenger-store'
import { Provider } from 'react-redux'
import { SET_CONFIG, SET_LOGGED_USER } from './redux/functions'
import MessengerSocket from './messenger-socket'

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
