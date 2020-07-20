import { ADD_BUG, DELETE_BUG, GET_BUGS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_BUG:
      return {
        ...state,
        bugs: [...state.bugs, action.payload],
      };

    case DELETE_BUG:
      return {
        ...state,
        bugs: state.bugs.filter((bug) => action.payload._id !== bug._id),
      };
    case GET_BUGS:
      return {
        bugs: action.payload,
      };
    default:
      return state;
  }
};
