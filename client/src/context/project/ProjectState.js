import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { GET_ALL_PROJECT, GET_CURRENT_PROJECT, ADD_PROJECT } from '../types';
import axios from 'axios';

const ProjectState = (props) => {
  const initialState = {
    projects: null,
    project: {},
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

  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        project: state.project,
        loadCurProject,
        getAllProjects,
        addProject,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
