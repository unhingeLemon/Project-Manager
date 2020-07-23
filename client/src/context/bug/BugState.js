import React, { useReducer } from 'react';
import bugContext from './bugContext';
import bugReducer from './bugReducer';
import { ADD_BUG, DELETE_BUG, GET_BUGS, UPDATE_BUG } from '../types';
import axios from 'axios';

const BugState = (props) => {
  const initialState = {
    bugs: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(bugReducer, initialState);

  // Most of these is authenticated routes so
  // our backend will read the token from the header
  // and then translate it to user data

  const getBugs = async () => {
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
    try {
      await axios.post('/api/bugs', bug);
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

  const updateBug = async (bug) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/bugs/${bug._id}`, bug, config);
      console.log(res.data);
      dispatch({
        type: UPDATE_BUG,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <bugContext.Provider
      value={{
        bugs: state.bugs,
        loading: state.loading,
        addBug,
        deleteBug,
        getBugs,
        updateBug,
      }}
    >
      {props.children}
    </bugContext.Provider>
  );
};

export default BugState;
