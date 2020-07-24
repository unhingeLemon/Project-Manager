import React, { useReducer } from 'react';
import axios from 'axios';
import setAuthToken from '../../components/utils/setAuthToken';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOG_OUT,
  SET_LOADING,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  REMOVE_ERROR,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
    loading: false,
    error: '',
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //LOAD USER
  const loadUser = async () => {
    setAuthToken(localStorage.token);
    setLoading(true);
    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      setLoading(false);
      /// ERROR IS ABOUT TOKEN
    }
  };
  // LOGIN USER
  const login = async (formData) => {
    setLoading(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/auth', formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (error) {
      /// WE CAN MANIPULATE THIS DATA TO PULL OUT AN ERROR IN THE UI
      console.log(error.response.data.msg);

      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg,
      });

      dispatch({
        type: REMOVE_ERROR,
      });
    }
  };

  // REGISTER
  const register = async (formData) => {
    setLoading(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (error) {
      /// WE CAN MANIPULATE THIS DATA TO PULL OUT AN ERROR IN THE UI
      console.log(error.response.data.msg);
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg,
      });
      dispatch({
        type: REMOVE_ERROR,
      });
    }
  };

  //LOGOUT
  const logout = () => {
    setLoading(true);
    dispatch({
      type: LOG_OUT,
    });
  };

  const setLoading = (b) => {
    dispatch({
      type: SET_LOADING,
      payload: b,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        login,
        loadUser,
        register,
        logout,
        setLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
