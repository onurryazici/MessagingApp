import React from 'react'
import MeBubble from './meBubble'
import SenderBubble from './senderBubble'
import styles from '../styles.module.css'
export default function MessageScroller() {
    return (
        <div className={styles.messageScrollerStage}>
            <SenderBubble message="merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)merhaba (sender)" />
            <MeBubble message="sanada (User)" />
        </div>
    )
}
