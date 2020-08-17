import React, { useReducer } from 'react';
import roadmapContext from './roadmapContext';
import axios from 'axios';
import roadmapReducer from './roadmapReducer';
import { ADD_PLAN, ADD_CHILD_PLAN, GET_PLANS } from '../types';

const RoadmapState = (props) => {
  const initialState = {
    plans: null,
    childPlan: null,
  };
  const [state, dispatch] = useReducer(roadmapReducer, initialState);

  // const setLoading = () => {
  //   dispatch({
  //     /// SET LOADING ROADMAP
  //   });
  // };

  const getPlans = async (project) => {
    console.log('wew');
    try {
      const res = await axios.get(`/api/roadmaps/${project}`);
      dispatch({
        type: GET_PLANS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addPlan = async (formData) => {
    try {
      const res = await axios.post('/api/roadmaps', formData);
      dispatch({
        type: ADD_PLAN,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addChildPlan = (childPlan) => {
    dispatch({
      type: ADD_CHILD_PLAN,
      payload: childPlan,
    });
  };

  const updatePlan = async (id, data) => {
    console.log(data);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/roadmaps/${id}`, data, config);
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <roadmapContext.Provider
      value={{
        plans: state.plans,
        childPlan: state.childPlan,
        addPlan,
        addChildPlan,
        getPlans,
        updatePlan,
      }}
    >
      {props.children}
    </roadmapContext.Provider>
  );
};

export default RoadmapState;
