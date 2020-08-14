import React, { useReducer } from 'react';
import roadmapContext from './roadmapContext';
import axios from 'axios';
import roadmapReducer from './roadmapReducer';
import { ADD_PLAN } from '../types';

const RoadmapState = (props) => {
  const initialState = {
    plans: [
      {
        id: '1',
        title: 'Sample title',
        startDate: 'November 1 2021',
        dueDate: 'November 1 2021',
        description: 'sdsdsd',
        status: 'INP',
        childPlans: [
          {
            id: '3',
            title: 'do this #1',
            description: 'description',
            checked: true,
          },
          {
            id: '2',
            title: 'do this #2',
            description: 'description',
            checked: false,
          },
          {
            id: '1',
            title: 'do this #3',
            description: 'description',
            checked: false,
          },
        ],
      },
      {
        id: '2',
        title: 'Sample title',
        startDate: 'No23er 1 2021121',
        dueDate: 'Nov23er 1 202331',
        description: 'sdsdsd',
        status: 'INP',
        childPlans: [
          {
            id: '1',
            title: 'do this #1',
            description: 'description',
            checked: true,
          },
          {
            id: '2',
            title: 'do this #2',
            description: 'description',
            checked: false,
          },
          {
            id: '3',
            title: 'do this #3',
            description: 'description',
            checked: false,
          },
        ],
      },
      {
        id: '3',
        title: 'Sample title',
        startDate: 'November 1 23',
        dueDate: 'November 1 203221',
        description: 'sdsdsd',
        status: 'INP',
        childPlans: [
          {
            id: '3',
            title: 'do this #1',
            description: 'description',
            checked: true,
          },
          {
            id: '2',
            title: 'do this #2',
            description: 'description',
            checked: false,
          },
          {
            id: '1',
            title: 'do this #3',
            description: 'description',
            checked: false,
          },
        ],
      },
    ],
    childPlan: null,
  };
  const [state, dispatch] = useReducer(roadmapReducer, initialState);

  // const setLoading = () => {
  //   dispatch({
  //     /// SET LOADING ROADMAP
  //   });
  // };

  const addPlan = (plan) => {
    dispatch({
      type: ADD_PLAN,
      payload: plan,
    });
  };

  return (
    <roadmapContext.Provider
      value={{
        plans: state.plans,
        childPlan: state.childPlan,
        addPlan,
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
      }}
    >
      {props.children}
    </roadmapContext.Provider>
  );
};

export default RoadmapState;
