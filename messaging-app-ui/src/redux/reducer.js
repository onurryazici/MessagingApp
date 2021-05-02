import { Actions } from './actions';
import styles from '../styles.module.css';

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
        default:
            return state;
    }
}