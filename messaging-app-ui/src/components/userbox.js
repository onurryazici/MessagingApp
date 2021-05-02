import React, { useEffect, useState } from 'react'
import styles from '../styles.module.css'
import classNames from 'classnames'
import { FaDotCircle, FaUserCircle} from 'react-icons/fa'
import { useSelector, useStore } from 'react-redux'
import { SET_SELECTED_USER } from '../redux/functions'
export default function Userbox(props) {
    const username = props.username
    const [isSelectedUser, setisSelectedUser] = useState(false)
    const store = useStore();
    const selectedClass = isSelectedUser ? classNames(styles.userSelectionBox,styles.userBoxSelected) : styles.userSelectionBox
    const selectedUser = useSelector(state => state.selectedUser)

    useEffect(() => {
        if(username===selectedUser)
            setisSelectedUser(true)
        else
            setisSelectedUser(false)        
    }, [selectedUser])
    function SelectUser(){
        store.dispatch(SET_SELECTED_USER(username))
    }
    return (
        <div className={selectedClass} onClick={()=>SelectUser()}>
            <FaUserCircle className={styles.userAvatar} />
            <span style={{marginLeft:'10px'}}>{username}</span>
            <FaDotCircle className={styles.messengerRedDot}/>
        </div>
    )
}
