import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Tab, Row, Col, Nav, Button, Form } from 'react-bootstrap'
import MessengerCore from './core';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { SET_CONFIG, SET_LOGGED_USER } from './redux/functions';
export function ReactMessenger (props){
  const configPayload={
    API_URL: props.API_URL,
    API_URL_GetMessage : props.API_URL_GetMessage
  }

  store.dispatch(SET_LOGGED_USER(props.username))
  store.dispatch(SET_CONFIG(configPayload))
  return (
    <Provider store={store}>
      <MessengerCore/>
    </Provider>
  )
}

ReactMessenger.PropTypes = {
  API_URL : PropTypes.string,
  API_URL_GetMessage : PropTypes.string
}
