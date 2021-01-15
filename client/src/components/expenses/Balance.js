import React, { useContext, useEffect, useState } from 'react';
import ExpenseContext from '../../context/expense/expenseContext';

const Balance = () => {
  const [total, setTotal] = useState(0);
  const expenseContext = useContext(ExpenseContext);

  const { getExpenses, expenses } = expenseContext;

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (expenses !== null && expenses.length > 0) {
      setTotal(
        expenses
          .map((expense) => {
            if (expense.type === 'buy') {
              return -expense.total;
            } else {
              return +expense.total;
            }
          })
          .reduce((acc, val) => acc + val)
      );
    }
  }, [expenses]);

  return (
    <div>
      <h5 className="center-align">Total balance:</h5>

      <h3 className="center-align">
        {total > 0 ? (
          <strong>{total}€</strong>
        ) : total === 0 ? (
          <strong>{total}€</strong>
        ) : (
          <strong className="red-text" style={{ fontSize: '80px' }}>
            {total}€
          </strong>
        )}
      </h3>
    </div>
  );
};

export default Balance;
