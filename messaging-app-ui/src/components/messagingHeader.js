import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { FaDotCircle, FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import styles from '../styles.module.css'
export default function MessagingHeader() {
    const selectedUser = useSelector(state => state.selectedUser)
    return (
        <Accordion as={Card.Header} style={{background:'#deefff'}}>
            <FaUserCircle color="#0066cc" fontSize="28px" />
            <span className={styles.messageUsernameTitle}>{selectedUser}</span>
            <FaDotCircle color="green" style={{marginLeft:'5px'}}/>
            <span className={styles.messageUserStatu}>Yazıyor...</span>
        </Accordion>
    )
}
