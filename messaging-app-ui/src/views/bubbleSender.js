import React from 'react'
import styles from '../styles.module.css'
export default function BubbleSender(props) {
    return (
        <div className={styles.bubbleSender}>
            <div>{props.message}</div><br/>
            <span className={styles.bubbleTimeSender}>04.16.2020 17:44</span>
        </div>
    )
}
