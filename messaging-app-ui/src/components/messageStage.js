import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { FaDotCircle, FaUserCircle } from 'react-icons/fa'
import styles from '../styles.module.css'
import MessageScroller from './messageScroller'
import MessageTyping from './messageTyping'
export default function MessageStage() {
    return (
        <div className={styles.messageStage}>
            <Accordion  as={Card.Header} style={{background:'#deefff'}}>
                <FaUserCircle color="#0066cc" fontSize="28px" />
                <span className={styles.messageUsernameTitle}>onur</span>
                <FaDotCircle color="green" style={{marginLeft:'5px'}}/>
                <span className={styles.messageUserStatu}>Yazıyor...</span>
            </Accordion>
            <MessageScroller/>
            <MessageTyping/>
        </div>
    )
}
