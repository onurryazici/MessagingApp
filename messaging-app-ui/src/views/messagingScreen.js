import React, { useState } from 'react'
import { useSelector }     from 'react-redux'
import { AddToBubbleMe, MessengerSocket } from '../helper/global'
import { Button, Form } from 'react-bootstrap'
import { FaPaperPlane } from 'react-icons/fa'
import BubbleMe         from './bubbleMe'
import BubbleSender     from './bubbleSender'
import styles           from '../styles.module.css'
import classNames from 'classnames'

export default function MessagingScreen() {
    const [message, setMessage] = useState("")
    const loggedUser    = useSelector(state => state.loggedUser)
    const selectedUser  = useSelector(state => state.selectedUser)
    const loading       = useSelector(state => state.loading)

    function onKeyPress(event){
        if(event.which === 13 && !event.shiftKey){
            event.preventDefault()
            SendMessage(event)
        }
    }
    function SendMessage(event){
        event.preventDefault()
        const sender    = loggedUser
        const receiver  = selectedUser
        const message   = event.target.value
        const date      = new Date().getTime()
        if(message !== ""){
            MessengerSocket.emit("SEND_MESSAGE", sender,receiver,message,date)
            AddToBubbleMe(message, date)
        }
    }
    return (
        <React.Fragment>
            <div className={styles.messageScrollerStage}>
                { loading 
                  ? <div className={styles.loadingContainer}>
                        <div className={classNames(styles.loading__,styles.noselect)}>
                            <div class={styles.loading__letter}>.</div>
                            <div class={styles.loading__letter}>.</div>
                            <div class={styles.loading__letter}>.</div>
                        </div>
                    </div>
                  : <>
                    <BubbleSender message="merhaba" />
                    <BubbleMe message="sanada (User)" />
                    <BubbleSender message="merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)" />
                    <BubbleSender message="merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)" />
                    <BubbleMe message="sanada (User)" />
                    <BubbleMe message="asdasdasdasdasda (User)" />
                    <BubbleMe message="merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)" />
                    </> }
            </div>
            <div className={styles.messageTypingStage}>
                <Form.Control as="textarea" rows={3} 
                    className={styles.messageTypingArea} 
                    placeholder="Mesaj yazın..." 
                    onKeyPress={(event)=>onKeyPress(event)}
                    onChange={(event)=>setMessage(event.target.value)}
                    disabled={loading}
                    />
                <Button variant="flat" className={styles.messageSendButton} onClick={(event)=>SendMessage(event)} disabled={loading}>
                    <FaPaperPlane color="white"/>
                </Button>
            </div>
        </React.Fragment>
    )
}
