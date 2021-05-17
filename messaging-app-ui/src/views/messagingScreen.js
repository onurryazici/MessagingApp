import React, { useEffect, useRef, useState } from 'react'
import { MOVE_CONVERSATION_TO_TOP, PUSH_TO_SELECTED_CONVERSATION, UPDATE_SELECTED_CONVERSATION } from '../redux/functions'
import { useSelector, useStore }     from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import { FaPaperPlane } from 'react-icons/fa'
import BubbleMe         from './bubbleMe'
import BubbleSender     from './bubbleSender'
import styles           from '../styles.module.css'
import classNames from 'classnames'
import socket from '../socket'

export default function MessagingScreen() {
    const [message, setMessage]  = useState(null)
    const [typing, setTyping]    = useState(false)
    const [isAcceptable, setisAcceptable] = useState(false)
    const store                  = useStore()
    const messagingStage         = useRef(null)
    const loggedUser             = useSelector((state)=>state.loggedUser)
    const selectedUser           = useSelector((state)=>state.selectedUser)
    const loading                = useSelector((state)=>state.loading)
    const selectedConversation   = useSelector((state)=>state.selectedConversation)

    useEffect(() => {
        socket.on("SEEN_NOTIFY",({from, seen})=>{
            if(from === selectedUser)
                store.dispatch(UPDATE_SELECTED_CONVERSATION(seen))
        })
        if(messagingStage){
            messagingStage.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget:target } = event
                target.scroll({top:target.scrollHeight, behavior:'smooth'})
            })
        }
    }, [])    
    /*useEffect(() => {
        messagingStage.current.scrollTop = messagingStage.current.scrollHeight
    },[selectedConversation])*/
    useEffect(() => {
        setMessage("")
    }, [selectedUser])

    useEffect(() => {
        if(loading || (message===undefined || message ===null || message.length === 0 || message.trim(' ').length === 0)){
            setisAcceptable(false)
        }
        else {
            setisAcceptable(true)
        }
    }, [message,loading])

    // kalkmalı
    /*useEffect(() => {
        messagingStage.current.scrollTop = messagingStage.current.scrollHeight // BU BLOK KALDIRILACAK
    },)*/
    function onKeyDown(event) {
        if (event.keyCode == 13 && !event.shiftKey)
            event.preventDefault();
    }
    function onKeyUp(event) {
        setMessage(event.target.value)
        const _from    = loggedUser
        const _target  = selectedUser

        if(message !== undefined && message.length > 0 && !typing){
            setTyping(true)
            const _typing = true
            socket.emit("SET_TYPING", _from, _target, _typing)
        }
        else if((event.which === 13 && !event.shiftKey && message !== undefined && message.trim(' ').length !==0)){ // If pressed ENTER key
            setTyping(false)
            const _typing = false
            socket.emit("SET_TYPING", _from, _target, _typing)
            SendMessage(event)
        }
    }
    function SendMessage(event){
        event.preventDefault()
        const sender    = loggedUser
        const receiver  = selectedUser
        const date      = new Date().getTime()
        if(message !== "") {
            const payload = {
                sender:sender,
                receiver:receiver,
                message:message,
                datetime:date
            }
            socket.emit("SEND_MESSAGE", sender,receiver,message,date)
            store.dispatch(PUSH_TO_SELECTED_CONVERSATION(payload))
            store.dispatch(MOVE_CONVERSATION_TO_TOP(receiver))
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
                    onKeyDown={(event)=>onKeyDown(event)}
                    onChange={(event)=>setMessage(event.target.value)}
                    disabled={loading}
                    value={message}
                    />
                <Button type="submit" variant="flat" className={styles.messageSendButton} 
                disabled={!isAcceptable}>
                    <FaPaperPlane color="white"/>
                </Button>
            </Form>
        </React.Fragment>
    )
}