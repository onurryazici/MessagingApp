import React from 'react'
import NewConversation from '../modals/newConversationModal'
import styles from '../styles.module.css'
import Userbox from '../views/userbox'
export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <NewConversation />
            <Userbox username="onur"/>
            <Userbox username="ömer"/>
            <Userbox username="ahmet"/>
            <Userbox username="melek"/>
        </div>
    )
}
