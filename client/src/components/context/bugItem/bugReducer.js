import { ADD_BUG, DELETE_BUG } from '../types';

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
        bugs: state.bugs.filter((bug) => action.payload.id !== bug.id),
      };

    default:
      return state;
  }
};
