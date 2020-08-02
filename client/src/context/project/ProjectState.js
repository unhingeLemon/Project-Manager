import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {
  GET_ALL_PROJECT,
  GET_CURRENT_PROJECT,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_INVITED_PROJECT,
  REQUESTED_USER,
} from '../types';
import axios from 'axios';

const ProjectState = (props) => {
  const initialState = {
    projects: null,
    project: {},
    invProjects: null,
    reqUser: null,
  };
  const [state, dispatch] = useReducer(projectReducer, initialState);

  const addProject = async (formData) => {
    try {
      const res = await axios.post('/api/projects', formData);
      dispatch({
        type: ADD_PROJECT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getAllProjects = async () => {
    try {
      const res = await axios.get('/api/projects');

      dispatch({
        type: GET_ALL_PROJECT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // pass in the user.projectId
  const loadCurProject = async (project) => {
    try {
      const res = await axios.get(`/api/projects/${project}`);

      dispatch({
        type: GET_CURRENT_PROJECT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateProject = async (id, data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(`/api/projects/${id}`, data, config);

      dispatch({
        type: UPDATE_PROJECT,
        payload: res.data,
      });
    } catch (err) {
      alert(err.response.data.msg);
      console.log(err);
    }
  };
  /// delete one of the userS
  const deleteUsers = async (id, data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(`/api/projects/users/${id}`, data, config);

      dispatch({
        type: UPDATE_PROJECT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response.data.msg);
      console.log(err);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      dispatch({
        type: DELETE_PROJECT,
      });
    } catch (err) {
      console.log(err.response.data.msg);
      console.log(err);
    }
  };

  const getInvProjects = async (email) => {
    try {
      const res = await axios.get(`/api/projects/invited/${email}`);
      dispatch({
        type: GET_INVITED_PROJECT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // if the deleted user is still hold the
  // Project Id then remove it.
  const getReqUser = async (email) => {
    try {
      const res = await axios.get(`/api/auth/${email}`);
      console.log(res);
      dispatch({
        type: REQUESTED_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        project: state.project,
        invProjects: state.invProjects,
        reqUser: state.reqUser,
        loadCurProject,
        getAllProjects,
        addProject,
        updateProject,
        deleteProject,
        getInvProjects,
        deleteUsers,
        getReqUser,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
