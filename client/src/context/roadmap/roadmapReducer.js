import {
  ADD_PLAN,
  GET_PLANS,
  SET_LOADING_RM,
  DELETE_PLAN,
  UPDATE_PLAN,
  RESET_ROADMAP,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_PLANS:
      return {
        ...state,
        plans: action.payload,
        loading: false,
      };
    case ADD_PLAN:
      return {
        ...state,
        plans: state.plans
          ? [...state.plans, action.payload]
          : [action.payload],
        loading: false,
      };

    case SET_LOADING_RM:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PLAN:
      return {
        ...state,
        plans: state.plans.map((plan) =>
          plan._id === action.payload._id ? action.payload : plan
        ),
        loading: false,
      };
    case DELETE_PLAN:
      return {
        ...state,
        plans: state.plans.filter((plan) => action.payload !== plan._id),
        loading: false,
      };
    case RESET_ROADMAP:
      return {
        ...state,
        plans: null,
        loading: false,
      };
    default:
      return state;
  }
};
