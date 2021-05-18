import  io  from "socket.io-client";
import { ADD_NEW_CONVERSATION, MOVE_CONVERSATION_TO_TOP, PUSH_TO_SELECTED_CONVERSATION, SET_CONVERSATION_IS_TYPING, SET_CONVERSATION_READ, UPDATE_EXIST_CONVERSATION} from "./redux/functions";
import { store } from "./redux/store";

const URL    = "http://192.168.91.128:4001";
const socket = io(URL, { autoConnect:false, query:{token:"token gelecek buraya"} });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

socket.on("INCOMING_MESSAGE", (data)=>{
  const loggedUser       = store.getState().loggedUser
  const selectedUser     = store.getState().selectedUser
  const conversationList = store.getState().conversationList
  if(data.sender === selectedUser) {
      store.dispatch(PUSH_TO_SELECTED_CONVERSATION(data))
      store.dispatch(SET_CONVERSATION_READ(selectedUser,true))
      let from     = loggedUser
      let target   = selectedUser
      socket.emit("SET_READ", from, target)
      store.dispatch(UPDATE_EXIST_CONVERSATION(target,true,true))
  } else {
      let isConversationExist = conversationList.some((element)=>element.user===data.sender)
      if (isConversationExist) {
        store.dispatch(UPDATE_EXIST_CONVERSATION(data.sender,false,null))
        store.dispatch(MOVE_CONVERSATION_TO_TOP(data.sender))
      }
      else
        store.dispatch(ADD_NEW_CONVERSATION(data.sender,false,true))
  }
})

socket.on("TYPING_NOTIFY", ({from, typing})=>{
  store.dispatch(SET_CONVERSATION_IS_TYPING(from,typing))
})

socket.on("ONLINE_NOTIFY", ({target,online})=>{
  const conversationList = store.getState().conversationList
  let isConversationExist = conversationList.some((element)=>element.user===target)
  if(isConversationExist)
    store.dispatch(UPDATE_EXIST_CONVERSATION(target,null,online))
})

export default socket;