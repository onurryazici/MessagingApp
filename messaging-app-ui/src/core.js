import React from 'react'
import MessageStage from './components/messageStage'
import Sidebar from './components/sidebar'

export default function MessengerCore() {
    return (
        <div>
            <Sidebar />
            <MessageStage />
        </div>
    )
}
