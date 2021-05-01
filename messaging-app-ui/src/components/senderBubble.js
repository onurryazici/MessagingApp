import React from 'react'
import styles from '../styles.module.css'
export default function SenderBubble(props) {
    return (
        <div className={styles.userBubble}>
            {props.message}
            <br/>
            <span style={{position:'absolute',right:'0px'}}>ss</span>
        </div>
    )
}
