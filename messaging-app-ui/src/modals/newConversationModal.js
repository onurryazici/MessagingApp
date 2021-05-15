import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { FaPlusCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ADD_NEW_CONVERSATION } from '../redux/functions';
import { store } from '../redux/store';
import socket from '../socket';
import styles from '../styles.module.css'
export default function NewConversationModal() {
    const [message, setMessage]       = useState("")
    const [targetUser, setTargetUser] = useState("")
    const [show, setModalShow]        = useState(false);
    const loggedUser = useSelector(state => state.loggedUser)

    function NewConversation(event) {
      event.preventDefault()
        const sender    = loggedUser
        const receiver  = targetUser
        const date      = new Date().getTime()
        if(message !== ""){
            const payload = {
                sender:sender,
                receiver:receiver,
                message:message,
                datetime:date
            }
            socket.emit("SEND_MESSAGE", sender,receiver,message,date)
            store.dispatch(ADD_NEW_CONVERSATION(targetUser,true,null))
            setMessage("")
            setModalShow(false)
        }
    }
    return (
        <React.Fragment>
          <Button variant="flat" onClick={()=>setModalShow(true)} className={styles.newConversationButton}>
            <FaPlusCircle fontSize="25px"/> Yeni mesaj
          </Button>
          <Modal show={show} onHide={()=>setModalShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Yeni bir konuşma başlat</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control type="text" 
                    placeholder="Kullanıcı adı" 
                    onChange={(event)=>setTargetUser(event.target.value)}
                    /><br/>
              <Form.Control as="textarea" rows={3} 
                    placeholder="Mesajınız" 
                    onChange={(event)=>setMessage(event.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>setModalShow(false)}>
                Vazgeç
              </Button>
              <Button variant="flat" 
                  onClick={(event)=>NewConversation(event)} 
                  style={{backgroundColor:'#3f7fb3', color:'#fff'}} 
                  disabled={message.length===0 || message.trim(' ').length === 0 || targetUser.length === 0 || targetUser.trim(' ').length === 0}>
                Gönder
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      );
}
