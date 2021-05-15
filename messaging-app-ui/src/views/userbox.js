import React, { useCallback, useEffect, useState } from 'react'
import { FaCircle, FaUserCircle} from 'react-icons/fa'
import { useSelector, useStore } from 'react-redux'
import { CLEAR_SELECTED_CONVERSATION, SET_SELECTED_CONVERSATION, SET_LOADING, SET_SELECTED_USER, UPDATE_EXIST_CONVERSATION } from '../redux/functions'
import { propTypes } from 'react-bootstrap/esm/Image'
import styles from '../styles.module.css'
import classNames from 'classnames'
import Axios from 'axios'
import socket from '../socket'
import { toast } from 'material-react-toastify'

export default function Userbox(props) {
    const isOnlineProps      = props.isOnline
    const isTyping           = props.isTyping
    const isSelected         = props.isSelected
    const username           = props.username
    const haveRead           = props.haveRead
    const store              = useStore()
    const loggedUser         = useSelector(state => state.loggedUser)
    const [isOnline, setIsOnline] = useState(false)
    
    useEffect(() => {
        socket.on(`${username}_ONLINE_NOTIFY`,()=>{
            setIsOnline(true)
        })
        socket.on(`${username}_OFFLINE_NOTIFY`,()=>{
            setIsOnline(false)
        })
        if(isOnlineProps)
            setIsOnline(true)
        else
            setIsOnline(false)
    }, [])
    const SelectUser = useCallback((_username) => {
        if(!isSelected){
            store.dispatch(SET_LOADING(true))
            store.dispatch(SET_SELECTED_USER(_username))
            store.dispatch(CLEAR_SELECTED_CONVERSATION())
            Axios.post("http://192.168.91.128:4001/api/protected/getMessage", {
                loggedUser : loggedUser, 
                targetUser : _username
            }).then((response)=>{
                store.dispatch(SET_SELECTED_CONVERSATION(response.data.message))
                store.dispatch(SET_LOADING(false))
                let from = loggedUser
                let target = _username
                socket.emit("SET_READ", from, target)
                store.dispatch(UPDATE_EXIST_CONVERSATION(target,true)) // gerekli değil gibi
            }).catch((error)=>{
                toast.error('Hata :' + error)
            })
        }
    }, [])

    return (
        <div className={isSelected ? classNames(styles.userSelectionBox,styles.userBoxSelected) :styles.userSelectionBox} onClick={()=>SelectUser(username)} >
            {isOnlineProps || isOnline
                ? <FaUserCircle className={styles.userOnlineAvatar}></FaUserCircle>
                : <FaUserCircle className={styles.userOfflineAvatar}></FaUserCircle>
            }
            <span style={{marginLeft:'10px'}}>{username}</span>
            {!haveRead ? <FaCircle className={styles.messengerRedDot} /> : ""}
            {isTyping  ? <span className={styles.typingBox}>Yazıyor...</span> : ""}
        </div>
    )
}
Userbox.propTypes = {
    username : propTypes.string
}