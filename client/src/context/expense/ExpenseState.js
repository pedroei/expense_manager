import React, { useReducer } from "react";
import axios from "axios";
import ExpenseContext from "./expenseContext";
import expenseReducer from "./expenseReducer";
import { GET_EXPENSES, ADD_EXPENSE, EXPENSE_ERROR, CLEAR_ALL } from "../types";

const ExpenseState = (props) => {
  const initialState = {
    expenses: null,
    error: null,
  };

  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // GET EXPENSES
  const getExpenses = async () => {
    try {
      const res = await axios.get("api/transactions");
      console.log(res.data);
      dispatch({ type: GET_EXPENSES, payload: res.data });
    } catch (err) {
      dispatch({ type: EXPENSE_ERROR, payload: err.response.msg });
    }
  };

  // ADD TRANSACTION
  const addExpense = async (expense) => {
    if (expense.type === "deposit") {
      expense.typeBuy = "";
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/transactions", expense, config);

      dispatch({
        type: ADD_EXPENSE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: EXPENSE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // CLEAR ALL
  const clearAll = () => {
    dispatch({
      type: CLEAR_ALL,
    });
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses: state.expenses,
        error: state.error,
        addExpense,
        getExpenses,
        clearAll,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseState;
