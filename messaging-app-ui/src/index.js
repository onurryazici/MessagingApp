import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Tab, Row, Col, Nav, Button, Form } from 'react-bootstrap'
import MessengerCore from './core';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { SET_LOGGED_USER } from './redux/functions';
export function ReactMessenger (props){
  store.dispatch(SET_LOGGED_USER(props.username))
  return (
    <Provider store={store}>
      <MessengerCore/>
    </Provider>
  )
}

ReactMessenger.PropTypes = {
  username  : PropTypes.string,
}