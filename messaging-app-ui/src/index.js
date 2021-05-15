import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import MessengerCore from './core';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { SET_CONFIG, SET_LOGGED_USER } from './redux/functions';
import { ToastContainer } from 'material-react-toastify'
export function ReactMessenger (props){
  const configPayload={
    API_URL: props.API_URL,
    API_URL_GetMessage : props.API_URL_GetMessage,
    API_URL_GetConversationList : props.API_URL_GetConversationList,
    API_URL_DeleteConversation  : props.API_URL_DeleteConversation
  }
  
  store.dispatch(SET_LOGGED_USER(prompt("kullanıcı adı gir","main")))
  store.dispatch(SET_CONFIG(configPayload))  
  return (
    <Provider store={store}>
      <MessengerCore/>
      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
    </Provider>
  )
}

ReactMessenger.PropTypes = {
  username : PropTypes.string,
  API_URL : PropTypes.string,
  API_URL_GetMessage : PropTypes.string,
  API_URL_GetConversationList:PropTypes.string,
  API_URL_DeleteConversation : PropTypes.string
}
