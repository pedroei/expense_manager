import React from 'react';

import { typeBuyColor } from '../../helpers/helpers';

const ExpenseItem = ({ expense }) => {
  return (
    <li className="collection-item avatar valign-wrapper">
      <i
        className={
          'material-icons circle ' + (expense.type === 'buy' ? 'red' : 'green')
        }
      >
        euro_symbol
      </i>
      <span className="title">
        {expense.type === 'buy' ? (
          <span>
            {expense.title} -{' '}
            <span className={typeBuyColor(expense.typeBuy)}>
              {' '}
              {expense.typeBuy.charAt(0).toUpperCase() +
                expense.typeBuy.slice(1)}
            </span>
          </span>
        ) : (
          expense.title
        )}
      </span>

      <p
        className={
          'secondary-content ' +
          (expense.type === 'buy' ? 'red-text' : 'green-text')
        }
      >
        {expense.type === 'buy'
          ? '-' + expense.total + '€'
          : '+' + expense.total + '€'}
      </p>
    </li>
  );
};

export default ExpenseItem;
