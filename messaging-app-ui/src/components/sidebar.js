import React from 'react'
import NewConversation from '../modals/newConversationModal'
import styles from '../styles.module.css'
import Userbox from './userbox'
export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <NewConversation />
            <Userbox username="onur"/>
        </div>
    )
}
