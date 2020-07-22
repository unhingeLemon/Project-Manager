import { ADD_BUG, DELETE_BUG, GET_BUGS, UPDATE_BUG } from '../types';

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
        bugs: state.bugs.filter((bug) => action.payload !== bug._id),
      };
    case UPDATE_BUG:
      return {
        ...state,
        bugs: state.bugs.map((bug) =>
          bug._id === action.payload._id ? action.payload : bug
        ),
      };
    case GET_BUGS:
      return {
        bugs: action.payload,
      };
    default:
      return state;
  }
};
