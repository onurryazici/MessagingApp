import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { ReactMessenger } from 'messaging-app-ui'
import 'messaging-app-ui/dist/index.css'

const App = () => {
  return (
    <div><ReactMessenger username="main"
            API_URL="http://192.168.91.128:4001/api"
            API_URL_GetMessage="/protected/getMessage"
            API_URL_GetConversationList = "/protected/getConversationList"
            API_URL_DeleteConversation  = "/protected/deleteConversation"
          />
    </div>
  )       
}

export default App
