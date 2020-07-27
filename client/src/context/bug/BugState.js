import React, { useReducer } from 'react';
import bugContext from './bugContext';
import bugReducer from './bugReducer';
import {
  ADD_BUG,
  DELETE_BUG,
  GET_BUGS,
  UPDATE_BUG,
  RESET_BUGS,
} from '../types';
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

  const getBugs = async (project) => {
    try {
      const res = await axios.get(`/api/bugs/${project}`);

      dispatch({
        type: GET_BUGS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addBug = async (bug, project) => {
    try {
      await axios.post(`/api/bugs/${project}`, bug);
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
  const resetBugs = () => {
    dispatch({
      type: RESET_BUGS,
    });
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
        resetBugs,
      }}
    >
      {props.children}
    </bugContext.Provider>
  );
};

export default BugState;
