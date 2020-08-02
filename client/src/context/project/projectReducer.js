import {
  GET_ALL_PROJECT,
  GET_CURRENT_PROJECT,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_INVITED_PROJECT,
  REQUESTED_USER,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT:
      return {
        ...state,
        projects: action.payload,
      };
    case GET_INVITED_PROJECT:
      return {
        ...state,
        invProjects: action.payload,
      };
    case GET_CURRENT_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        project: action.payload,
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        project: '',
      };
    case REQUESTED_USER: {
      return {
        ...state,
        reqUser: action.payload,
      };
    }
    default:
      return state;
  }
};
