import React from 'react'
import styles from '../styles.module.css'
import classNames from 'classnames'
import { Accordion, Card, Dropdown } from 'react-bootstrap'
import { FaDotCircle, FaEllipsisV, FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
export default function MessagingHeader() {
    const selectedUser = useSelector(state => state.selectedUser)
    return (
        <Accordion as={Card.Header} className={styles.messagingHeader}>
            <FaUserCircle color="#0066cc" fontSize="28px"/>
            <span className={styles.messageUsernameTitle}>{selectedUser}</span>
            <FaDotCircle color="green" style={{marginLeft:'5px',marginTop:'5px'}}/>
            <span className={styles.messageUserStatu}>Yazıyor...</span>
            <Dropdown style={{position:'absolute',right:'15px'}}>
                <Dropdown.Toggle variant="link" bsPrefix="p-0">
                    <FaEllipsisV fontSize="25px" color="#3f7fb3"/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Konuşmayı Sil</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Accordion>
    )
}
