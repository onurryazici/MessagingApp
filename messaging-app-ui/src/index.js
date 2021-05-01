import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Tab, Row, Col, Nav, Button, Form } from 'react-bootstrap'
import styles from './styles.module.css'
import Userbox from './components/userbox';
import Sidebar from './components/sidebar';
import MessageStage from './components/messageStage';
import MessengerCore from './core';

export function ReactMessenger (props){
const [selectedUserName, setSelectedUserName] = useState("");

  return (
    <div className={styles.container}>
      <MessengerCore/>
    </div>
  )
}

ReactMessenger.PropTypes = {
  username                      : PropTypes.string,
  API_URL                       : PropTypes.string,
  tokenName                     : PropTypes.string,
}