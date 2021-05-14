import React, { useEffect, useState } from 'react'
import { useSelector, useStore } from 'react-redux';
import Content from './components/content'
import Sidebar from './components/sidebar'
import socket from './socket';
import styles from './styles.module.css'

export default function MessengerCore() {
    const loggedUser   = useSelector(state => state.loggedUser)
    useEffect(() => {
        socket.auth = { loggedUser }
        socket.connect()
        socket.emit("USER_CONNECTED", loggedUser)
    }, []);

    return (
        <div className={styles.container}>
            <Sidebar />
            <Content />
        </div>
    )
}
