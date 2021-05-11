import { Actions } from "./actions"

export function SET_LOGGED_USER(_username){
    return dispatch => {
        dispatch({type:Actions.SET_LOGGED_USER, payload:_username})
    }
}

export function SET_SELECTED_USER(_username){
    return dispatch => {
        dispatch({type:Actions.SET_SELECTED_USER, payload:_username})
    }
}
export function SET_LOADING(_value){
    return dispatch => {
        dispatch({type:Actions.SET_LOADING, payload: _value})
    }
}
export function SET_CONVERSATION_LIST(_list){
    return dispatch => {
        dispatch({type:Actions.SET_CONVERSATION_LIST, payload: _list})
    }
}
export function CLEAR_SELECTED_CONVERSATION(){
    return dispatch => {
        dispatch({type:Actions.CLEAR_SELECTED_CONVERSATION, payload: null})
    }
}
export function SET_SELECTED_CONVERSATION(_conversationArray){
    return dispatch => {
        dispatch({type:Actions.SET_SELECTED_CONVERSATION, payload: _conversationArray})
    }
}
export function PUSH_TO_SELECTED_CONVERSATION(_messagePayload){
    return dispatch => {
        dispatch({type:Actions.PUSH_TO_SELECTED_CONVERSATION, payload: _messagePayload})
    }
}
export function SET_CONVERSATION_SEEN(_whichUser, _isRead){
    const _payload ={
        user:_whichUser,
        hasRead : _isRead
    }
    return dispatch => {
        dispatch({type:Actions.SET_CONVERSATION_READ, payload: _payload})
    }
}

export function SET_CONFIG(_config){
    return dispatch => {
        dispatch({type:Actions.SET_CONFIG, payload: _config})
    }
}