import {
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  SET_NULL_LOGIN_ERROR,
  SET_NULL_REGISTER_ERROR
} from "../actionTypes/usersActionTypes";

const initialState = {
  user: null,
  registerError: null,
  loginError: null,
  trackError: null,
  trackHistory: [],
  loading: false,
  logoutError: null
};

const usersReducer = (state = initialState, action) => {
  switch(action.type) {
      case REGISTER_USER_REQUEST:
          return {...state, loading: true};
      case REGISTER_USER_SUCCESS:
          return {...state, loading: false};
      case REGISTER_USER_FAILURE:
          return {...state, loading: false, registerError: action.error};
      case LOGIN_USER_SUCCESS:
          return {...state, loading: false, user: action.user};
      case LOGIN_USER_FAILURE:
          return {...state, loading: false, loginError: action.error};
      case SET_NULL_LOGIN_ERROR: 
          return {...state, loginError: null};
      case SET_NULL_REGISTER_ERROR:
          return {...state, registerError: null};
      case LOGOUT_USER_SUCCESS:
          return {...state, loading: false, user: null};
      case LOGOUT_USER_FAILURE: 
          return {...state, loading: false, logoutError: action.error}
      default:
          return state;
  }
};

export default usersReducer;