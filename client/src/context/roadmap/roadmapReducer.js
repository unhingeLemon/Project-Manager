import { ADD_PLAN, ADD_CHILD_PLAN, GET_PLANS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_PLAN:
      return {
        ...state,
        plans: state.plans
          ? [...state.plans, action.payload]
          : [action.payload],
      };
    case ADD_CHILD_PLAN:
      return {
        ...state,
        childPlan: state.childPlan
          ? [...state.childPlan, action.payload]
          : [action.payload],
      };

    case GET_PLANS:
      return {
        ...state,
        plans: action.payload,
      };
    default:
      return state;
  }
};
