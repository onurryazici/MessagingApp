import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FaCircle, FaUserCircle} from 'react-icons/fa'
import { useSelector, useStore } from 'react-redux'
import { CLEAR_SELECTED_CONVERSATION, SET_SELECTED_CONVERSATION, SET_LOADING, SET_SELECTED_USER, UPDATE_EXIST_CONVERSATION } from '../redux/functions'
import { propTypes } from 'react-bootstrap/esm/Image'
import styles from '../styles.module.css'
import classNames from 'classnames'
import Axios from 'axios'
import socket from '../socket'

export default function Userbox(props) {
    const username          = props.username
    const haveRead          = props.haveRead
    const [isSelectedUser, setisSelectedUser] = useState(false)
    const [selectedClass, setselectedClass]   = useState(styles.userSelectionBox)
    const userBoxRef    = useRef(null)
    const store         = useStore();
    const loggedUser    = useSelector(state => state.loggedUser)
    const selectedUser  = useSelector(state => state.selectedUser)
    const API_URL       = store.getState().config.API_URL
    const API_URL_GetMessage = store.getState().config.API_URL_GetMessage

    const SelectUser = useCallback((_username) => {
        if(!isSelectedUser){
            setisSelectedUser(true)
            userBoxRef.current.className = classNames(styles.userSelectionBox,styles.userBoxSelected)
            //setselectedClass(classNames(styles.userSelectionBox,styles.userBoxSelected))
            store.dispatch(SET_LOADING(true))
            store.dispatch(SET_SELECTED_USER(_username))
            store.dispatch(CLEAR_SELECTED_CONVERSATION())

            Axios.post(API_URL + API_URL_GetMessage, {
                loggedUser : loggedUser, 
                targetUser : _username
            }).then((response)=>{
                console.log(response.data)
                store.dispatch(SET_SELECTED_CONVERSATION(response.data.message))
                store.dispatch(SET_LOADING(false))
                let from = loggedUser
                let target = _username
                socket.emit("SET_READ", from, target)
                store.dispatch(UPDATE_EXIST_CONVERSATION(target,true)) // gerekli değil gibi
            }).catch(err=>{
                alert("Hata " + err)
            })
        }
    }, [])

    useEffect(() => {
        if(username!==selectedUser) {
            userBoxRef.current.className = styles.userSelectionBox
            setisSelectedUser(false)
            console.log("username " + username + "; selecteduser "  +selectedUser)
        }
    }, [selectedUser])

    return (
        <div className={selectedClass} onClick={()=>SelectUser(username)} ref={userBoxRef}>
            <FaUserCircle className={styles.userAvatar}></FaUserCircle>
            <span style={{marginLeft:'10px'}}>{username}</span>
            {!haveRead ? <FaCircle className={styles.messengerRedDot} /> : ""}
        </div>
    )
}
Userbox.propTypes = {
    username : propTypes.string
}