import React, { useEffect, useState } from 'react'
import { Accordion, Card, Dropdown } from 'react-bootstrap'
import { FaCircle, FaEllipsisV, FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import styles from '../styles.module.css'
import socket from '../socket'

export default function MessagingHeader() {
    const selectedUser            = useSelector(state => state.selectedUser)
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        socket.on("TYPING_NOTIFY", ({from, typing})=>{
            if(from === selectedUser)
                setIsTyping(typing)
        })
    }, [])
    return (
        <Accordion as={Card.Header} className={styles.messagingHeader}>
            <FaUserCircle color="#0066cc" fontSize="28px"/>
            <span className={styles.messageUsernameTitle}>
                {selectedUser}
            </span>
            <FaCircle color="green" className={styles.userOnlineHeader}/>
            <span className={styles.messageUserStatu}>{
                isTyping ? "Yazıyor..." : ""
            }</span>
            <Dropdown style={{position:'absolute',right:'15px'}}>
                <Dropdown.Toggle variant="link" bsPrefix="p-0">
                    <FaEllipsisV fontSize="25px" color="#3f7fb3"/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Konuşmayı Sil</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Accordion>
    )
}
