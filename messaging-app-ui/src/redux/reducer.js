import { Actions } from './actions';
import { store } from './store';
export function reducer (state,action){
    switch(action.type){
        case Actions.SET_LOGGED_USER:
            return {
                ...state,
                loggedUser:action.payload
            }
        case Actions.SET_SELECTED_USER:
            return {
                ...state,
                selectedUser:action.payload
            }
        case Actions.SET_LOADING:
            return {
                ...state,
                loading:action.payload
            }
        case Actions.SET_CONVERSATION_LIST:
            return {
                ...state,
                conversationList: action.payload
            }
        case Actions.CLEAR_SELECTED_CONVERSATION:
            return {
                ...state,
                selectedConversation:[]
            }
        case Actions.SET_SELECTED_CONVERSATION:
            return {
                ...state,
                selectedConversation:action.payload
            }
        case Actions.ADD_NEW_CONVERSATION:
            const newConversationList = [...state.conversationList]
            newConversationList.unshift(action.payload)
            return {
                ...state,
                conversationList:newConversationList
            }
        case Actions.UPDATE_EXIST_CONVERSATION:
            const updatedConversationList = [...state.conversationList]
            updatedConversationList.map((element)=>{
                if(element.user===action.payload.user){
                    element.read = action.payload.read
                    element.seen = action.payload.seen
                }
            })
            return {
                ...state,
                conversationList:updatedConversationList
            }
        case Actions.UPDATE_SELECTED_CONVERSATION:
            const updatedSelectedConversation = [...state.selectedConversation]
            updatedSelectedConversation.map((element) => {
               element.hasRead = action.payload.hasRead
            })
            return {
                ...state,
                selectedConversation:updatedSelectedConversation
            }
        case Actions.PUSH_TO_SELECTED_CONVERSATION: 
            const newConversation = [...state.selectedConversation]
            newConversation.push(action.payload)
            return {
                ...state,
                selectedConversation:newConversation
            }

        case Actions.SET_CONVERSATION_READ:
            const newConversationList2 = [...state.conversationList]
            const targetUser = action.payload.user
            const hasRead    = action.payload.hasRead
            newConversationList2.filter((element)=>element.user===targetUser ? element.hasRead = hasRead : element)
            return {
                ...state,
                conversationList: newConversationList2
            }
        case Actions.SET_CONFIG:
            return {
                ...state,
                config:action.payload
            }
        default:
            return state;
    }
}