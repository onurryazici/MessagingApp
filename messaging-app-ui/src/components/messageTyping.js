import React from 'react'
import { Form } from 'react-bootstrap'
import styles from '../styles.module.css'
export default function MessageTyping() {
    return (
        <div className={styles.messageTypingStage}>
            <Form.Control as="textarea" rows={3} />
        </div>
    )
}
