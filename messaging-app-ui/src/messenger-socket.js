import  io  from "socket.io-client";
import { ADD_NEW_CONVERSATION, MOVE_CONVERSATION_TO_TOP, PUSH_TO_SELECTED_CONVERSATION, SET_CONVERSATION_IS_TYPING, SET_CONVERSATION_READ, UPDATE_EXIST_CONVERSATION} from "./redux/functions";
import { MessengerStore } from "./redux/store";

const URL    = "http://192.168.91.128:4001";
const socket = io(URL, { autoConnect:false, query:{token:"token gelecek buraya"} });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

socket.on("INCOMING_MESSAGE", (data)=>{
  const loggedUser       = MessengerStore.getState().loggedUser
  const selectedUser     = MessengerStore.getState().selectedUser
  const conversationList = MessengerStore.getState().conversationList
  if(data.sender === selectedUser) {
      MessengerStore.dispatch(PUSH_TO_SELECTED_CONVERSATION(data))
      MessengerStore.dispatch(SET_CONVERSATION_READ(selectedUser,true))
      let from     = loggedUser
      let target   = selectedUser
      socket.emit("SET_READ", from, target)
      MessengerStore.dispatch(UPDATE_EXIST_CONVERSATION(target,true,true))
  } else {
      let isConversationExist = conversationList.some((element)=>element.user===data.sender)
      if (isConversationExist) {
        MessengerStore.dispatch(UPDATE_EXIST_CONVERSATION(data.sender,false,null))
        MessengerStore.dispatch(MOVE_CONVERSATION_TO_TOP(data.sender))
      }
      else
        MessengerStore.dispatch(ADD_NEW_CONVERSATION(data.sender,false,true))
  }
})

socket.on("TYPING_NOTIFY", ({from, typing})=>{
  MessengerStore.dispatch(SET_CONVERSATION_IS_TYPING(from,typing))
})

socket.on("ONLINE_NOTIFY", ({target,online})=>{
  const conversationList = MessengerStore.getState().conversationList
  let isConversationExist = conversationList.some((element)=>element.user===target)
  if(isConversationExist)
    MessengerStore.dispatch(UPDATE_EXIST_CONVERSATION(target,null,online))
})

export default socket;
