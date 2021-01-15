import React, { useState, useContext } from 'react';

import ExpenseContext from '../../context/expense/expenseContext';
import AlertContext from '../../context/alert/alertContext';

const ExpenseForm = (props) => {
  const expenseContext = useContext(ExpenseContext);
  const alertContext = useContext(AlertContext);

  const { addExpense } = expenseContext;
  const { setAlert } = alertContext;

  const [expense, setExpense] = useState({
    title: '',
    type: '',
    typeBuy: '',
    total: '',
  });

  const { title, type, typeBuy, total } = expense;

  const onChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (title === '' || total === '') {
      /* return console.log('Please add a title and a total'); */
      setAlert('Please add a title and a total', 'red', 3000);
    } else {
      if (type === '') {
        /* return console.log('Please choose a type'); */
        setAlert('Please choose a type', 'red', 3000);
      } else {
        if (type === 'buy' && typeBuy === '') {
          /* return console.log('Please add the type of your buy'); */
          setAlert('Please add the type of your buy', 'red', 3000);
        } else {
          //console.log(expense);
          addExpense(expense);
          setExpense({
            title: '',
            type: '',
            typeBuy: '',
            total: '',
          });
          props.history.push('/');
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="container borders">
        <h3 className="center-align mb-50px">New Expense</h3>
        <form onSubmit={onSubmit}>
          <div className="container">
            <div className="input-field">
              <i className="material-icons prefix">create</i>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={onChange}
              />
              <label htmlFor="title">Title of Expense</label>
            </div>
            <div className="input-field mt-20px">
              <i className="material-icons prefix">euro</i>
              <input
                type="number"
                min="0"
                id="total"
                name="total"
                value={total}
                onChange={onChange}
              />
              <label htmlFor="title">Total €</label>
            </div>
            <div className="row">
              <div className="col s12 l5">
                <h5 className="mb-30px">Type of Expense</h5>
                <p>
                  <label>
                    <input
                      type="radio"
                      name="group"
                      name="type"
                      value="deposit"
                      onChange={onChange}
                    />
                    <span>Deposit</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input
                      type="radio"
                      name="group"
                      name="type"
                      value="buy"
                      onChange={onChange}
                    />
                    <span>Buy</span>
                  </label>
                </p>
              </div>
              <div className="col s12 l5 offset-l2">
                <h5 className="mb-30px">Type of Buy</h5>
                <p>
                  <label>
                    <input
                      type="radio"
                      name="group2"
                      disabled={type === 'buy' ? '' : 'disabled'}
                      name="typeBuy"
                      value="tech"
                      onChange={onChange}
                    />
                    <span>Tech</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input
                      type="radio"
                      name="group2"
                      disabled={type === 'buy' ? '' : 'disabled'}
                      name="typeBuy"
                      value="clothes"
                      onChange={onChange}
                    />
                    <span>Clothes</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input
                      type="radio"
                      name="group2"
                      disabled={type === 'buy' ? '' : 'disabled'}
                      name="typeBuy"
                      value="food"
                      onChange={onChange}
                    />
                    <span>Food</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input
                      type="radio"
                      name="group2"
                      disabled={type === 'buy' ? '' : 'disabled'}
                      name="typeBuy"
                      value="car"
                      onChange={onChange}
                    />
                    <span>Car</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input
                      type="radio"
                      name="group2"
                      disabled={type === 'buy' ? '' : 'disabled'}
                      name="typeBuy"
                      value="house"
                      onChange={onChange}
                    />
                    <span>House</span>
                  </label>
                </p>
              </div>
            </div>
            <div className="center-align mb-30px">
              <button
                className="btn waves-effect waves-light indigo darken-1"
                type="submit"
              >
                Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
