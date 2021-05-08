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
export function CLEAR_CONVERSATION(){
    return dispatch => {
        dispatch({type:Actions.CLEAR_CONVERSATION, payload: null})
    }
}
export function SET_CONVERSATION(_conversationArray){
    return dispatch => {
        dispatch({type:Actions.SET_CONVERSATION, payload: _conversationArray})
    }
}

export function SET_CONFIG(_config){
    return dispatch => {
        dispatch({type:Actions.SET_CONFIG, payload: _config})
    }
}