import { ADD_PLAN } from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_PLAN:
      return {
        ...state,
        plans: [...state.plans, action.payload],
      };

    default:
      return state;
  }
};
