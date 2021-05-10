import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useStore }     from 'react-redux'
import { AddToBubbleMe, MessengerSocket } from '../helper/global'
import { Button, Form } from 'react-bootstrap'
import { FaPaperPlane } from 'react-icons/fa'
import BubbleMe         from './bubbleMe'
import BubbleSender     from './bubbleSender'
import styles           from '../styles.module.css'
import classNames from 'classnames'
import { PUSH_TO_CONVERSATION } from '../redux/functions'

export default function MessagingScreen() {
    const [message, setMessage] = useState("")
    const store          = useStore()
    const messagingStage = useRef(null)
    const loggedUser     = useSelector(state => state.loggedUser)
    const selectedUser   = useSelector(state => state.selectedUser)
    const loading        = useSelector(state => state.loading)
    const conversation   = useSelector(state => state.conversation)
    
    useEffect(() => {
        //MessengerSocket.on('ömer',async(data)=>{
        alert("mesaj alındı")
    }, [])
    

    useEffect(() => {
        messagingStage.current.scrollTop = messagingStage.current.scrollHeight
    },[conversation])
    
    useEffect(() => {
        messagingStage.current.scrollTop = messagingStage.current.scrollHeight // BU BLOK KALDIRILACAK
    },)

    function onKeyPress(event){
        if(event.which === 13 && !event.shiftKey){ // If pressed ENTER key
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
            const payload = {
                id:"asdas",
                sender:sender,
                receiver:receiver,
                message:message,
                datetime:date
            }
            //MessengerSocket.emit("SEND_MESSAGE", sender,receiver,message,date)
            store.dispatch(PUSH_TO_CONVERSATION(payload))
            setMessage("")
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
                                return <BubbleMe message={element.message} datetime={element.datetime}/>
                            else
                                return <BubbleSender message={element.message} datetime={element.datetime}/>
                      })}
                    </React.Fragment> }
            </div>
            <Form autoComplete="off" onSubmit={SendMessage} className={styles.messageTypingStage}>
                <Form.Control as="textarea" rows={3} 
                    className={styles.messageTypingArea} 
                    placeholder="Mesaj yazın..." 
                    onKeyPress={(event)=>onKeyPress(event)}
                    onChange={(event)=>setMessage(event.target.value)}
                    disabled={loading}
                    value={message}
                    />
                <Button  type="submit" variant="flat" className={styles.messageSendButton} disabled={loading}>
                    <FaPaperPlane color="white"/>
                </Button>
            </Form>
        </React.Fragment>
    )
}
