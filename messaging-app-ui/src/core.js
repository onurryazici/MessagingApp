import React from 'react'
import MessagingScreen from './components/messageScreen'
import Sidebar from './components/sidebar'
import styles from './styles.module.css'

export default function MessengerCore() {
    return (
        <div className={styles.container}>
            <Sidebar />
            <MessagingScreen />
        </div>
    )
}
