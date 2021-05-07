import React from 'react'
import { FaFacebookMessenger } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import styles from '../styles.module.css'
import MessagingHeader from '../views/messagingHeader'
import MessagingScreen from '../views/messagingScreen'
export default function Content() {
    const selectedUser = useSelector(state => state.selectedUser)

    if(selectedUser === ""){
        return (
            <div className={styles.messagingScreen}>
                <div className={styles.messengerLogo}><FaFacebookMessenger style={{color: '#1e538c',width: '100px',height: '100px'}}/></div>
            </div>
        )
    }
    else{
        return (
            <div className={styles.messagingScreen}>
                <MessagingHeader/>
                <MessagingScreen/>
            </div>
        )
    }
}
