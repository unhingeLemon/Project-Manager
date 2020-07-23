import React, { useReducer } from 'react';
import axios from 'axios';
import setAuthToken from '../../components/utils/setAuthToken';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { USER_LOADED, LOGIN_SUCCESS, LOG_OUT, SET_LOADING } from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
    loading: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //LOAD USER
  const loadUser = async () => {
    setLoading();
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // LOGIN USER
  const login = async (formData) => {
    setLoading();
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
      console.log(error);
    }
  };

  //LOGOUT
  const logout = () => {
    setLoading();
    dispatch({
      type: LOG_OUT,
    });
  };

  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        login,
        loadUser,
        logout,
        setLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
