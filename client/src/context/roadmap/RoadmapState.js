import React, { useReducer } from 'react';
import roadmapContext from './roadmapContext';
import axios from 'axios';
import roadmapReducer from './roadmapReducer';
import {
  ADD_PLAN,
  GET_PLANS,
  SET_LOADING_RM,
  DELETE_PLAN,
  UPDATE_PLAN,
  RESET_ROADMAP,
} from '../types';

const RoadmapState = (props) => {
  const initialState = {
    plans: null,
    loading: false,
  };
  const [state, dispatch] = useReducer(roadmapReducer, initialState);

  const setLoadingRM = () => {
    dispatch({
      type: SET_LOADING_RM,
    });
  };

  const getPlans = async (project) => {
    setLoadingRM();
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
    setLoadingRM();
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

  const updatePlan = async (id, data) => {
    setLoadingRM();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/roadmaps/${id}`, data, config);

      dispatch({
        type: UPDATE_PLAN,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const resetRoadmap = () => {
    setLoadingRM();
    dispatch({
      type: RESET_ROADMAP,
    });
  };

  const deletePlan = async (id) => {
    setLoadingRM();
    try {
      await axios.delete(`/api/roadmaps/${id}`);
      dispatch({
        type: DELETE_PLAN,
        payload: id,
      });
    } catch (err) {
      console.log(err.response.data.msg);
      console.log(err);
    }
  };

  const updateChildPlan = async (id, data) => {
    setLoadingRM();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/roadmaps/childPlan/${id}`,
        data,
        config
      );

      dispatch({
        type: UPDATE_PLAN,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteChildPlan = async (id) => {
    setLoadingRM();
    try {
      let res = await axios.delete(`/api/roadmaps/childPlan/${id}`);
      dispatch({
        type: UPDATE_PLAN,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <roadmapContext.Provider
      value={{
        plans: state.plans,
        loading: state.loading,
        addPlan,
        getPlans,
        updatePlan,
        deletePlan,
        updateChildPlan,
        deleteChildPlan,
        resetRoadmap,
      }}
    >
      {props.children}
    </roadmapContext.Provider>
  );
};

export default RoadmapState;
