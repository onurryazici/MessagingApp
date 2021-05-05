import React from 'react'
import styles from '../styles.module.css'
export default function BubbleMe(props) {
    return (
        <div className={styles.bubbleMe}>
            <div>{props.message}</div><br/>
            <span className={styles.bubbleTimeMe}>04.16.2020 17:44</span>
        </div>
    )
}
