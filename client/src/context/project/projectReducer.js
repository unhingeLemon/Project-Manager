import {
  GET_ALL_PROJECT,
  GET_CURRENT_PROJECT,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_INVITED_PROJECT,
  REQUESTED_USER,
  SET_LOADING_PROJ,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case GET_INVITED_PROJECT:
      return {
        ...state,
        invProjects: action.payload,
        loading: false,
      };
    case GET_CURRENT_PROJECT:
      return {
        ...state,
        project: action.payload,
        loading: false,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        project: action.payload,
        loading: false,
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        project: action.payload,
        loading: false,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        project: null,
        loading: false,
      };
    case REQUESTED_USER: {
      return {
        ...state,
        reqUser: action.payload,
        loading: false,
      };
    }
    case SET_LOADING_PROJ: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};
