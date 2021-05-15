import React, { useCallback, useRef } from 'react'
import { FaCircle, FaUserCircle} from 'react-icons/fa'
import { useSelector, useStore } from 'react-redux'
import { CLEAR_SELECTED_CONVERSATION, SET_SELECTED_CONVERSATION, SET_LOADING, SET_SELECTED_USER, UPDATE_EXIST_CONVERSATION } from '../redux/functions'
import { propTypes } from 'react-bootstrap/esm/Image'
import styles from '../styles.module.css'
import classNames from 'classnames'
import Axios from 'axios'
import socket from '../socket'

export default function Userbox(props) {
    const isSelected         = props.isSelected
    const username           = props.username
    const haveRead           = props.haveRead
    const store              = useStore()
    const loggedUser         = useSelector(state => state.loggedUser)
    const API_URL            = store.getState().config.API_URL
    const API_URL_GetMessage = store.getState().config.API_URL_GetMessage

    const SelectUser = useCallback((_username) => {
        if(!isSelected){
            store.dispatch(SET_LOADING(true))
            store.dispatch(SET_SELECTED_USER(_username))
            store.dispatch(CLEAR_SELECTED_CONVERSATION())

            Axios.post(API_URL + API_URL_GetMessage, {
                loggedUser : loggedUser, 
                targetUser : _username
            }).then((response)=>{
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

    return (
        <div className={isSelected ? classNames(styles.userSelectionBox,styles.userBoxSelected) :styles.userSelectionBox} onClick={()=>SelectUser(username)} >
            <FaUserCircle className={styles.userAvatar}></FaUserCircle>
            <span style={{marginLeft:'10px'}}>{username}</span>
            {!haveRead ? <FaCircle className={styles.messengerRedDot} /> : ""}
        </div>
    )
}
Userbox.propTypes = {
    username : propTypes.string
}