import { Actions } from "./actions"

export function SET_LOGGED_USER(_username){
    return dispatch => {
        dispatch({type:Actions.SET_LOGGED_USER, payload:_username})
    }
}