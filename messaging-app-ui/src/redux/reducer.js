import { Actions } from './actions';
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
        case Actions.CLEAR_CONVERSATION:
            return {
                ...state,
                conversation:[]
            }
        case Actions.SET_CONVERSATION:
            return {
                ...state,
                conversation:action.payload
            }
        case Actions.PUSH_TO_CONVERSATION: 
            const newConversation = [...state.conversation]
            newConversation.push(action.payload)
            return {
                ...state,
                conversation:newConversation
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