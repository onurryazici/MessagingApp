import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { FaDotCircle, FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import styles from '../styles.module.css'
import MessagingHeader from './messagingHeader'
import MessagingScreen from './messagingScreen'
import TypingStage from './typingStage'
export default function MessageStage() {
    return (
        <div className={styles.messageStage}>
            <MessagingHeader/>
            <MessagingScreen/>
            <TypingStage/>
        </div>
    )
}
