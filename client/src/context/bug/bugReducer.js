import {
  ADD_BUG,
  DELETE_BUG,
  GET_BUGS,
  UPDATE_BUG,
  RESET_BUGS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_BUG:
      return {
        ...state,
        bugs: [...state.bugs, action.payload],
        loading: false,
      };

    case DELETE_BUG:
      return {
        ...state,
        bugs: state.bugs.filter((bug) => action.payload !== bug._id),
        loading: false,
      };

    case UPDATE_BUG:
      return {
        ...state,
        bugs: state.bugs.map((bug) =>
          bug._id === action.payload._id ? action.payload : bug
        ),
        loading: false,
      };
    case GET_BUGS:
      return {
        ...state,
        bugs: action.payload,
        loading: false,
      };
    case RESET_BUGS:
      return {
        ...state,
        bugs: [],
        loading: false,
      };
    default:
      return state;
  }
};
