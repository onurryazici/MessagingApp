import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NewConversation from '../modals/newConversationModal'
import { SET_CONVERSATION_LIST, SET_SELECTED_CONVERSATION } from '../redux/functions'
import { store } from '../redux/store'
import styles from '../styles.module.css'
import Userbox from '../views/userbox'
export default function Sidebar() {
    const loggedUser       = useSelector(state => state.loggedUser)
    const selectedUser     = useSelector(state => state.selectedUser)
    const conversationList = useSelector(state => state.conversationList)
    const API_URL     = store.getState().config.API_URL
    const API_URL_GetConversationList = store.getState().config.API_URL_GetConversationList
    useEffect(() => {
        axios.post(API_URL + API_URL_GetConversationList, {
            loggedUser:loggedUser
        }).then((response)=>{
            store.dispatch(SET_CONVERSATION_LIST(response.data.conversations))
        }).catch((error)=>{
            alert("Hata : " + error)
        })

        
    }, [])
    return (
        <div className={styles.sidebar}>
            <NewConversation />
            {
                conversationList.map((element,key)=>{
                    return <Userbox username={element.user} haveRead={element.read} key={key} isSelected={selectedUser===element.user}/>
                })
            }
            
            {
                /*
                <Userbox username="ömer"/>
            <Userbox username="ahmet"/>
            <Userbox username="melek"/>
                */
            }
        </div>
    )
}
