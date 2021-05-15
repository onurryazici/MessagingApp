import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SET_CONVERSATION_LIST } from '../redux/functions'
import { store } from '../redux/store'
import { toast } from 'material-react-toastify'
import axios from 'axios'
import styles from '../styles.module.css'
import Userbox from '../views/userbox'
import NewConversation from '../modals/newConversationModal'

export default function Sidebar() {
    const loggedUser       = useSelector(state => state.loggedUser)
    const selectedUser     = useSelector(state => state.selectedUser)
    const conversationList = useSelector(state => state.conversationList)
    //const API_URL                     = store.getState().config.API_URL
    //const API_URL_GetConversationList = store.getState().config.API_URL_GetConversationList

    useEffect(() => {
        axios.post("http://192.168.91.128:4001/api/protected/getConversationList", {
            loggedUser:loggedUser
        }).then((response)=>{
            store.dispatch(SET_CONVERSATION_LIST(response.data.conversations))
        }).catch((error)=>{
            toast.error('Hata :' + error)
        })
    }, [])
    return (
        <div className={styles.sidebar}>
            <NewConversation />
            {conversationList.map((element,key)=>{
                    return <Userbox 
                                username={element.user} 
                                haveRead={element.read} 
                                key={key} 
                                isTyping={element.typing}
                                isSelected={selectedUser===element.user}/>
                })}
        </div>
    )
}
