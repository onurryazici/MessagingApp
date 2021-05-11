import React, { useCallback, useEffect, useState } from 'react'
import styles from '../styles.module.css'
import classNames from 'classnames'
import { FaCheckDouble, FaCircle, FaDotCircle, FaUserCircle} from 'react-icons/fa'
import { useSelector, useStore } from 'react-redux'
import { CLEAR_SELECTED_CONVERSATION, SET_SELECTED_CONVERSATION, SET_LOADING, SET_SELECTED_USER } from '../redux/functions'
import Axios from 'axios'
import { propTypes } from 'react-bootstrap/esm/Image'
import socket from '../socket'
export default function Userbox(props) {
    const username          = props.username
    const haveRead          = props.haveRead
    const [isSelectedUser, setisSelectedUser] = useState(false)
    const [selectedClass, setselectedClass]   = useState(styles.userSelectionBox)
    const store         = useStore();
    const loggedUser    = useSelector(state => state.loggedUser)
    const selectedUser  = useSelector(state => state.selectedUser)
    const API_URL       = store.getState().config.API_URL
    const API_URL_GetMessage = store.getState().config.API_URL_GetMessage

    const SelectUser = useCallback((_username) => {
        if(!isSelectedUser){
            setisSelectedUser(true)
            setselectedClass(classNames(styles.userSelectionBox,styles.userBoxSelected))
            store.dispatch(SET_SELECTED_USER(username))
            store.dispatch(SET_LOADING(true))
            store.dispatch(CLEAR_SELECTED_CONVERSATION())

            Axios.post(API_URL + API_URL_GetMessage, {
                sender:loggedUser, 
                receiver:_username
                }).then((response)=>{
                    console.log(response.data)
                    store.dispatch(SET_SELECTED_CONVERSATION(response.data.message))
                    store.dispatch(SET_LOADING(false))
                    /*let from = loggedUser
                    let target = selectedUser
                    let haveRead = true
                    socket.emit("SET_READ", from, target, haveRead)*/
                }).catch(err=>{
                alert("hata " + err)
                })
            }
    }, [])

    useEffect(() => {
        if(username!==selectedUser) {
            setisSelectedUser(false)
            setselectedClass(styles.userSelectionBox)
        }
    }, [selectedUser])

    return (
        <div className={selectedClass} onClick={()=>SelectUser(username)}>
            <FaUserCircle className={styles.userAvatar}></FaUserCircle>
            <span style={{marginLeft:'10px'}}>{username}</span>
            {!haveRead ? <FaCircle className={styles.messengerRedDot} /> : ""}
        </div>
    )
}
Userbox.propTypes = {
    username : propTypes.string
}