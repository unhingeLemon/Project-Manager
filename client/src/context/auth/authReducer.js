import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOG_OUT,
  SET_LOADING,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  REMOVE_ERROR,
  UPDATE_USER_PROJECT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOG_OUT:
      localStorage.removeItem('token');
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case REMOVE_ERROR:
      return {
        ...state,
        error: '',
        loading: false,
      };
    case UPDATE_USER_PROJECT:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
