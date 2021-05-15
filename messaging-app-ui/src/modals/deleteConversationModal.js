import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { DELETE_SELECTED_CONVERSATION } from '../redux/functions';
import { store } from '../redux/store';
import styles from '../styles.module.css'
export default function DeleteConversationModal() {
    const [show, setModalShow] = useState(false);
    const selectedUser = useSelector(state => state.selectedUser)
    const loggedUser   = useSelector(state => state.loggedUser)
    //const API_URL = store.getState().config.API_URL
    //const API_URL_DeleteConversation = store.getState().config.API_URL_DeleteConversation
    function DeleteConversation() {
        axios.post("http://192.168.91.128:4001/api/protected/deleteConversation",{
            loggedUser   : loggedUser,
            selectedUser : selectedUser
        }).then((response)=>{
            if(response.data.statu){
                store.dispatch(DELETE_SELECTED_CONVERSATION(selectedUser))
                setModalShow(false)
            }
        })
    }
    return (
        <React.Fragment>
          <Button variant="flat" onClick={()=>setModalShow(true)} className={styles.deleteConversationButton}>
            Konuşmayı Sil
          </Button>
          <Modal show={show} onHide={()=>setModalShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Uyarı!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Bu konuşmayı silmek istediğinize emin misiniz?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>setModalShow(false)}>
                Hayır
              </Button>
              <Button variant="danger" onClick={()=>DeleteConversation()} >
                Evet
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
    )
}
