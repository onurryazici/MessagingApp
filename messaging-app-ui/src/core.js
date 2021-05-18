import React, { useEffect, useState } from 'react'
import { useSelector, useStore } from 'react-redux';
import Content from './components/content'
import Sidebar from './components/sidebar'
import socket from './socket';
import styles from './styles.module.css'
import { ToastContainer } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css'
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
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
        </div>
    )
}
