import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NewConversation from '../modals/newConversationModal'
import { store } from '../redux/store'
import styles from '../styles.module.css'
import Userbox from '../views/userbox'
export default function Sidebar() {
    const loggedUser  = useSelector(state => state.loggedUser)
    const API_URL     = store.getState().config.API_URL
    const API_URL_GetConversationList = store.getState().config.API_URL_GetConversationList
    const [conversationList, setConversationList] = useState([])
    useEffect(() => {
        axios.post(API_URL+API_URL_GetConversationList,{
            loggedUser:loggedUser
        }).then((response)=>{
            //alert(JSON.stringify(response.data))
 
            setConversationList(response.data.users)
        }).catch((error)=>{
            alert("Hata x" + error)
        })
    }, )
    return (
        <div className={styles.sidebar}>
            <NewConversation />
            {
                conversationList.map((element)=>{
                    return <Userbox username={element} />
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
