import React, { useEffect, useState } from 'react'
import { Accordion, Card, Dropdown } from 'react-bootstrap'
import { FaCircle, FaEllipsisV, FaUserCircle } from 'react-icons/fa'
import { connect, useSelector } from 'react-redux'
import DeleteConversationModal from '../modals/deleteConversationModal'
import styles from '../styles.module.css'
import socket from '../socket'
import { store } from '../redux/store'
import { SET_CONVERSATION_IS_TYPING } from '../redux/functions'

function MessagingHeader(props) {
    const conversationList        = props.conversationList
    const selectedUser            = props.selectedUser
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        const isItTyping = conversationList.some((element)=>element.user===selectedUser && element.typing)
        if(isItTyping)
            setIsTyping(true)
        else
            setIsTyping(false)
        /*socket.on("TYPING_NOTIFY", ({from, typing})=>{
            store.dispatch(SET_CONVERSATION_IS_TYPING(from,typing))
        })*/
    }, [conversationList])

    /*socket.on("TYPING_NOTIFY", ({from, typing})=>{
        if(from === selectedUser) 
            setIsTyping(typing)
    })*/
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
                    <DeleteConversationModal/>
                </Dropdown.Menu>
            </Dropdown>
        </Accordion>
    )
}

const mapStateToProps = (state) => ({
    conversationList:state.conversationList,
    selectedUser:state.selectedUser
})
export default connect(mapStateToProps)(MessagingHeader)