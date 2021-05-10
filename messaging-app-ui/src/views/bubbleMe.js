import React from 'react'
import styles from '../styles.module.css'
import DateFormatter from 'date-and-time'

export default function BubbleMe(props) {
    
    const datetime = props.datetime
    const message  = props.message
    const time     = (isToday(new Date(datetime))) 
                     ? DateFormatter.format(new Date(datetime), 'HH:mm')
                     : DateFormatter.format(new Date(datetime), 'DD.MM.YYYY HH:mm')

    function isToday(date){
        const today = new Date()
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    return (
        <div className={styles.bubbleMe}>
            <div>{message}</div><br/>
            <span className={styles.bubbleTimeMe}>{time}</span>
        </div>
    )
}