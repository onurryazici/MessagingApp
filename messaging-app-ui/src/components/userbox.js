import React, { useState } from 'react'
import styles from '../styles.module.css'
import { FaDotCircle, FaUserCircle} from 'react-icons/fa'
export default function Userbox(props) {
    const [isSelectedUser, setisSelectedUser] = useState(false)
    const selectedClass = isSelectedUser ? classNames(styles.userSelectionBox,styles.userBoxSelected) : styles.userSelectionBox

    function SelectUser(){
        
    }
    return (
        <div className={selectedClass} onClick={()=>SelectUser()}>
            <FaUserCircle className={styles.userAvatar} />
            <span style={{marginLeft:'10px'}}>{props.username}</span>
            <FaDotCircle className={styles.messengerRedDot}/>
        </div>
    )
}
