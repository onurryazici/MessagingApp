import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FaPaperPlane, FaPlane } from 'react-icons/fa'
import styles from '../styles.module.css'

import socketIOClient from "socket.io-client";
const ENDPOINT = "192.168.91.128:4001";

export default function TypingStage() {
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
        setResponse(data);
        });
    }, []);


    return (
        <div className={styles.messageTypingStage}>
            <Form.Control as="textarea" rows={3} className={styles.messageTypingArea} placeholder="Mesaj yazın..." value={response}/>
            <Button variant="flat" className={styles.messageSendButton} >
                <FaPaperPlane color="white"/>
            </Button>
        </div>
    )
}
