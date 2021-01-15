import React, { useContext, useEffect } from 'react';
import ExpenseItem from './ExpenseItem';
import ExpenseContext from '../../context/expense/expenseContext';
import AuthContext from '../../context/auth/authContext';

const ExpensesList = () => {
  const expenseContext = useContext(ExpenseContext);
  const authContext = useContext(AuthContext);

  const { expenses, getExpenses } = expenseContext;
  const { user } = authContext;

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line
  }, []);

  if (expenses === null || expenses.length === 0) {
    return <h3 className="center-align">No expenses</h3>;
  }

  return (
    <div className="container">
      <ul className="collection">
        {expenses.map((expense) => (
          <ExpenseItem key={expense.title} expense={expense} />
        ))}
      </ul>
    </div>
  );
};

export default ExpensesList;
