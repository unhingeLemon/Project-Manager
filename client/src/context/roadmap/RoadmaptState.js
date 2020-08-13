import React, { useReducer } from 'react';
import roadmapContext from './roadmapContext';
import axios from 'axios';
import roadmapReducer from './roadmapReducer';
import {} from '../types';

const RoadmapState = (props) => {
  const initialState = {
    // TO DO:
    // SET INIT STATE
  };
  const [state, dispatch] = useReducer(roadmapReducer, initialState);

  // const setLoading = () => {
  //   dispatch({
  //     /// SET LOADING ROADMAP
  //   });
  // };

  return (
    <roadmapContext.Provider
      value={
        {
          // projects: state.projects,
          // project: state.project,
          // invProjects: state.invProjects,
          // reqUser: state.reqUser,
          // loading: state.loading,
          // loadCurProject,
          // getAllProjects,
          // addProject,
          // updateProject,
          // deleteProject,
          // getInvProjects,
          // deleteUsers,
          // getReqUser,
          // resetProject,
        }
      }
    >
      {props.children}
    </roadmapContext.Provider>
  );
};

export default RoadmapState;
