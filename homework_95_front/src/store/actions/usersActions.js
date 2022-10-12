import axios from '../../axiosInstance'
import {
  FETCH_TRACK_HISTORY_ERROR,
  FETCH_TRACK_HISTORY_REQUEST,
  FETCH_TRACK_HISTORY_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    SEND_LISTENED_TRACK_ERROR,
    SEND_LISTENED_TRACK_SUCCESS,
    SET_NULL_LOGIN_ERROR,
    SET_NULL_REGISTER_ERROR
} from "../actionTypes/usersActionTypes";



const registerUserRequest = () => {
    return {type: REGISTER_USER_REQUEST};
};
const registerUserSuccess = () => {
    return {type: REGISTER_USER_SUCCESS};
};
const registerUserFailure = (error) => {
    return {type: REGISTER_USER_FAILURE, error};
};

export const setNullRegisterError = () => {
  return {type: SET_NULL_REGISTER_ERROR}
}
export const setNullLoginError = () => {
  return {type: SET_NULL_LOGIN_ERROR}
}

export const registerUser = (userData, navigate) => {
    return async (dispatch) => {
        dispatch(registerUserRequest());
        try {
            await axios.post("/users", userData);
            dispatch(registerUserSuccess());
            dispatch(setNullRegisterError())
            navigate("/log-in");
        } catch (e) {
            if (e?.response?.data) {
                dispatch(registerUserFailure(e.response.data.message));
            } else {
                dispatch(registerUserFailure({global: "Потеряно соединение"}));
            }
        }
    };
};

export const loginUserSuccess = (user) => {
    return {type: LOGIN_USER_SUCCESS, user};
};
const loginUserFailure = (error) => {
    return {type: LOGIN_USER_FAILURE, error};
};

export const loginUser = (userData, navigate) => {
    return async (dispatch) => {
      dispatch(registerUserRequest());
        try {
            const response = await axios.post("users/session", userData);
            dispatch(loginUserSuccess(response.data));
            dispatch(setNullLoginError())
            navigate("/");
        } catch (e) {
            dispatch(loginUserFailure(e?.response?.data?.message));
        }
    };
};

export const sendListenedTrackSuccess = () => {
  return {type: SEND_LISTENED_TRACK_SUCCESS};
};
const sendListenedTrackError = (error) => {
  return {type: SEND_LISTENED_TRACK_ERROR, error};
};

export const sendListenedTrack = (track) => {
  return async (dispatch, getState) => {
    const token = getState().users?.user?.token;
      try {
          const response = await axios.post("/track_history", track, {
            headers: {
              'Authenticate': token
            }
          });
          dispatch(sendListenedTrackSuccess(response.data));
      } catch (e) {
          dispatch(sendListenedTrackError(e?.response?.data?.message));
      }
  };
};

export const fetchTrackHistoryRequest = () => {
  return {type: FETCH_TRACK_HISTORY_REQUEST};
};
export const fetchTrackHistorySuccess = (trackHistory) => {
  return {type: FETCH_TRACK_HISTORY_SUCCESS, trackHistory};
};
const  fetchTrackHistoryError = (error) => {
  return {type: FETCH_TRACK_HISTORY_ERROR, error};
};

export const fetchTrackHistory = () => {
  return async (dispatch, getState) => {
    const token = getState().users?.user?.token;
    dispatch(fetchTrackHistoryRequest())
      try {
        const response = await axios.get(`/track_history`, {
          headers: {
            'Authenticate': token
          }
        })
        dispatch(fetchTrackHistorySuccess(response.data));
      } catch (e) {
        dispatch(fetchTrackHistoryError(e?.response?.data?.message));
      }
  };
};

const logoutUserSuccess = () => {
  return {type: LOGOUT_USER_SUCCESS};
};
const logoutUserFailure = (error) => {
  return {type: LOGOUT_USER_FAILURE, error};
};
export const logoutUser = (navigate) => {
  return async (dispatch, getState) => {
    const token = getState().users?.user?.token;
    dispatch(registerUserRequest());
      try {
          await axios.delete("/users/session", {
              headers: {
                  'Authenticate': token
              }
          });
          dispatch(logoutUserSuccess());
          navigate("/");
      } catch(e) {
          dispatch(logoutUserFailure(e?.response?.data));
      }
  }
};


