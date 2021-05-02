import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { FaPlus, FaPlusCircle } from 'react-icons/fa';
import styles from '../styles.module.css'
export default function NewConversationModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <React.Fragment>
          <Button variant="flat" onClick={handleShow} className={styles.newConversationButton}>
            <FaPlusCircle fontSize="25px"/> Yeni mesaj
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Yeni bir konuşma başlat</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control type="text" placeholder="Kullanıcı adı" /><br/>
              <Form.Control as="textarea" rows={3} placeholder="Mesajınız"/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Vazgeç
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Gönder
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      );
}
