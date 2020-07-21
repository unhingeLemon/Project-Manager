import React, { useReducer } from 'react';
import bugContext from './bugContext';
import bugReducer from './bugReducer';
import { ADD_BUG, DELETE_BUG, GET_BUGS } from '../types';
import axios from 'axios';

const BugState = (props) => {
  const initialState = {
    bugs: [],
  };
  const [state, dispatch] = useReducer(bugReducer, initialState);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYxNThlMDM2M2MwZjczMjgwMGI5YjIyIn0sImlhdCI6MTU5NTI0OTE4MywiZXhwIjoxNTk1NjA5MTgzfQ.2mrfCiHvpJqlPGOi7UigVhd0qBM4SPk8z-oJjZXSXag';

  const getBugs = async () => {
    axios.defaults.headers.common['x-auth-token'] = token;

    try {
      const res = await axios.get('/api/bugs');

      dispatch({
        type: GET_BUGS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addBug = async (bug) => {
    axios.defaults.headers.common['x-auth-token'] = token;
    try {
      const res = await axios.post('/api/bugs', bug);
      dispatch({
        type: ADD_BUG,
        payload: bug,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBug = async (id) => {
    try {
      await axios.delete(`/api/bugs/${id}`);
      dispatch({
        type: DELETE_BUG,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <bugContext.Provider
      value={{
        bugs: state.bugs,
        addBug,
        deleteBug,
        getBugs,
      }}
    >
      {props.children}
    </bugContext.Provider>
  );
};

export default BugState;
