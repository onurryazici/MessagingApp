import { compose } from 'redux';
import { applyMiddleware } from 'redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducer';
export const initialState = {
    loggedUser           : "",
    selectedUser         : "",
    conversationList     : [],
    selectedConversation : [],
    loading              : true,
    config               : {},
}
const allEnhancers = compose( 
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // FOR DISABLE MAKE COMMENT LINE
  )
export const MessengerStore = createStore(reducer, initialState, allEnhancers)