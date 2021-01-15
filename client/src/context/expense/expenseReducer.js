import { GET_EXPENSES, ADD_EXPENSE, EXPENSE_ERROR, CLEAR_ALL } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
        loading: false,
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case EXPENSE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ALL:
      return {
        ...state,
        expenses: null,
        error: null,
      };
    default:
      return state;
  }
};
