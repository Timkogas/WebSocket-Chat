import axios from '../../axiosInstance'
import { FETCH_MESSAGES_ERROR, FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS, SEND_MESSAGE_SUCCESS } from "../actionTypes/messagesActionTypes";

const fetchMessagesRequest = () => {
  return {type: FETCH_MESSAGES_REQUEST};
};
const fetchMessagesSuccess = (messages) => {
  return {type: FETCH_MESSAGES_SUCCESS, messages};
};
const fetchMessagesFailure = (error) => {
  return {type: FETCH_MESSAGES_ERROR, error};
};

export const sendMessageSuccess = (message) => {
  return {type: SEND_MESSAGE_SUCCESS, message};
}

export const fetchMessages = () => {
  return async (dispatch) => {
      dispatch(fetchMessagesRequest());
      try {
        const res = await axios.get("/messages");
        dispatch(fetchMessagesSuccess(res.data));
      } catch (e) {
        dispatch(fetchMessagesFailure(e?.response?.data?.message)); 
      }
  };
};