import React, { useEffect, useRef, useState } from 'react'
import { PUSH_TO_SELECTED_CONVERSATION, UPDATE_EXIST_CONVERSATION, UPDATE_SELECTED_CONVERSATION } from '../redux/functions'
import { useSelector, useStore }     from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import { FaPaperPlane } from 'react-icons/fa'
import BubbleMe         from './bubbleMe'
import BubbleSender     from './bubbleSender'
import styles           from '../styles.module.css'
import classNames from 'classnames'
import socket from '../socket'

export default function MessagingScreen() {
    const [message, setMessage]  = useState("")
    const [typing, setTyping]    = useState(false)
    const store                  = useStore()
    const messagingStage         = useRef(null)
    const loggedUser             = useSelector((state)=>state.loggedUser)
    const selectedUser           = useSelector((state)=>state.selectedUser)
    const loading                = useSelector((state)=>state.loading)
    const selectedConversation   = useSelector((state)=>state.selectedConversation)

    useEffect(() => {
        socket.on("SEEN_NOTIFY",({from, seen})=>{
            if(from === selectedUser)
                store.dispatch(UPDATE_SELECTED_CONVERSATION(true,seen))
            else
                store.dispatch(UPDATE_EXIST_CONVERSATION(from,false,seen))
        })
        
    }, [])    
    useEffect(() => {
        messagingStage.current.scrollTop = messagingStage.current.scrollHeight
    },[selectedConversation])
    
    useEffect(() => {
        messagingStage.current.scrollTop = messagingStage.current.scrollHeight // BU BLOK KALDIRILACAK
    },)

    function onKeyUp(event) {
        setMessage(event.target.value)

        if(message.length > 0 && !typing){
            setTyping(true)
            const _from    = loggedUser
            const _target  = selectedUser
            const _typing = true
            socket.emit("SET_TYPING", _from, _target, _typing)
        }
        else if((event.which === 13 && !event.shiftKey) || message.length === 0){ // If pressed ENTER key OR message was cleared
            event.preventDefault()
            const _from   = loggedUser
            const _target = selectedUser
            const _typing = false
            socket.emit("SET_TYPING", _from, _target, _typing)
            setTyping(false)
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
                sender:sender,
                receiver:receiver,
                message:message,
                datetime:date
            }
            socket.emit("SEND_MESSAGE", sender,receiver,message,date)
            store.dispatch(PUSH_TO_SELECTED_CONVERSATION(payload))
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
                      {selectedConversation && selectedConversation.map((element)=>{
                            if(element.sender===loggedUser)
                                return <BubbleMe message={element.message} datetime={element.datetime} seen={element.hasRead}/>
                            else
                                return <BubbleSender message={element.message} datetime={element.datetime}/>
                      })}
                    </React.Fragment> }
            </div>
            <Form autoComplete="off" onSubmit={SendMessage} className={styles.messageTypingStage}>
                <Form.Control as="textarea" rows={3} 
                    className={styles.messageTypingArea} 
                    placeholder="Mesaj yazın..." 
                    onKeyUp={(event)=>onKeyUp(event)}
                    onChange={(event)=>setMessage(event.target.value)}
                    disabled={loading}
                    value={message}
                    />
                <Button type="submit" variant="flat" className={styles.messageSendButton} disabled={loading || message.length === 0}>
                    <FaPaperPlane color="white"/>
                </Button>
            </Form>
        </React.Fragment>
    )
}