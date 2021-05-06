import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Content from './components/content'
import Sidebar from './components/sidebar'
import { MessengerSocket } from './helper/global';
import styles from './styles.module.css'

export default function MessengerCore() {
    const loggedUser = useSelector(state => state.loggedUser)
    useEffect(() => {
        MessengerSocket.emit("USER_CONNECTED", loggedUser)
    }, []);
    return (
        <div className={styles.container}>
            <Sidebar />
            <Content />
        </div>
    )
}
