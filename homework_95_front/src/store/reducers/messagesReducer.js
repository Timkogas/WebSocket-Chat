import { FETCH_MESSAGES_ERROR, FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS, SEND_MESSAGE_SUCCESS } from "../actionTypes/messagesActionTypes";

const initialState = {
  messages: [],
  error: null,
};

const messagesReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_MESSAGES_REQUEST: 
      return {...state};
    case FETCH_MESSAGES_SUCCESS: 
      return {...state, messages: action.messages.reverse()};
    case FETCH_MESSAGES_ERROR: 
      return {...state, error: action.error};
    case SEND_MESSAGE_SUCCESS: 
      return {...state, messages: [...state.messages, action.message]};
    default:
      return state;
  }
};

export default messagesReducer;