import React from 'react'
import styles from '../styles.module.css'
export default function MeBubble(props) {
    return (
        <div className={styles.meBubble}>
            {props.message}
        </div>
    )
}
