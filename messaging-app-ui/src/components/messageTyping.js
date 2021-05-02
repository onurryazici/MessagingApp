import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { FaPaperPlane, FaPlane } from 'react-icons/fa'
import styles from '../styles.module.css'

const io = require('socket.io-client');

export default function MessageTyping() {
    const [socket, setsocket] = useState(null)

    useEffect(() => {
        setsocket
    }, [])

    function send() {
        
    }

    return (
        <div className={styles.messageTypingStage}>
            <Form.Control as="textarea" rows={3} className={styles.messageTypingArea} placeholder="Mesaj yazın..."/>
            <Button variant="flat" className={styles.messageSendButton}>
                <FaPaperPlane color="white"/>
            </Button>
        </div>
    )
}
