import React, { useCallback, useEffect, useState } from 'react'
import styles from '../styles.module.css'
import classNames from 'classnames'
import { FaDotCircle, FaUserCircle} from 'react-icons/fa'
import { useSelector, useStore } from 'react-redux'
import { CLEAR_CONVERSATION, SET_CONVERSATION, SET_LOADING, SET_SELECTED_USER } from '../redux/functions'
import Axios from 'axios'
import { propTypes } from 'react-bootstrap/esm/Image'
export default function Userbox(props) {
    const username          = props.username
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
            store.dispatch(CLEAR_CONVERSATION())

            Axios.post(API_URL + API_URL_GetMessage, {
                sender:loggedUser, 
                receiver:_username
            }).then((response)=>{
                console.log(response.data)
                store.dispatch(SET_CONVERSATION(response.data.message))
                store.dispatch(SET_LOADING(false))
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
            <FaUserCircle className={styles.userAvatar} />
            <span style={{marginLeft:'10px'}}>{username}</span>
            <FaDotCircle className={styles.messengerRedDot}/>
        </div>
    )
}
Userbox.propTypes = {
    username : propTypes.string
}