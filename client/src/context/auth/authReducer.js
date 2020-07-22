import { USER_LOADED, LOGIN_SUCCESS,LOG_OUT } from '../types';

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
    default:
      return state;
  }
};
