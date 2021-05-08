import React, { useEffect, useRef, useState } from 'react'
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
    const messagingStage = useRef(null)
    const loggedUser     = useSelector(state => state.loggedUser)
    const selectedUser   = useSelector(state => state.selectedUser)
    const loading        = useSelector(state => state.loading)
    const conversation   = useSelector(state => state.conversation)


    useEffect(() => {
        messagingStage.current.scrollTop = messagingStage.current.scrollHeight
    },[conversation])
    
    useEffect(() => {
      messagingStage.current.scrollTop = messagingStage.current.scrollHeight
    },)

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
            <div className={styles.messageScrollerStage} ref={messagingStage}>
                { loading 
                  ? <div className={styles.loadingContainer}>
                        <div className={classNames(styles.loading__,styles.noselect)}>
                            <div className={styles.loading__letter}>.</div>
                            <div className={styles.loading__letter}>.</div>
                            <div className={styles.loading__letter}>.</div>
                        </div>
                    </div>
                  : <React.Fragment>
                      {conversation && conversation.map((element)=>{
                            if(element.sender===loggedUser)
                                return <BubbleMe message={element.message} />
                            else
                                return <BubbleSender message={element.message}/>
                      })}
                    </React.Fragment> }
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
