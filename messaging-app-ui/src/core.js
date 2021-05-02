import React from 'react'
import MessageStage from './components/messageStage'
import Sidebar from './components/sidebar'
import styles from './styles.module.css'

export default function MessengerCore() {
    return (
        <div className={styles.container}>
            <Sidebar />
            <MessageStage />
        </div>
    )
}
