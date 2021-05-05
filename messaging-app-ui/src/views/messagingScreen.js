import React from 'react'
import BubbleMe from './bubbleMe'
import BubbleSender from './bubbleSender'
import styles from '../styles.module.css'
export default function MessagingScreen() {
    return (
        <div className={styles.messageScrollerStage}>
            <BubbleSender message="merhaba" />
            <BubbleMe message="sanada (User)" />
            <BubbleSender message="merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)" />
            <BubbleSender message="merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)" />
            <BubbleMe message="sanada (User)" />
            <BubbleMe message="asdasdasdasdasda (User)" />
            <BubbleMe message="merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)" />
        </div>
    )
}
