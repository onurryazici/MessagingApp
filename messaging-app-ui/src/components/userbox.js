import React from 'react'
import styles from '../styles.module.css'
import { FaDotCircle, FaUserCircle} from 'react-icons/fa'
export default function Userbox(props) {
    return (
        <div className={styles.userSelectionBox}>
            <FaUserCircle className={styles.userAvatar} />
            <span style={{marginLeft:'10px'}}>{props.username}</span>
            <FaDotCircle className={styles.messengerRedDot}/>
        </div>
    )
}
