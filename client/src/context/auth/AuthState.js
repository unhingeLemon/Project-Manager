import React, { useReducer } from 'react';

import {} from '../types';

const AuthState = (props) => {
  const initialState = {};

  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (formData) => {
    try {
      const res = await axios.post;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>
  );
};

export default AuthState;
