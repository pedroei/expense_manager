import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import ExpenseContext from '../../context/expense/expenseContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const expenseContext = useContext(ExpenseContext);

  const { isAuthenticated, logout } = authContext;
  const { clearAll } = expenseContext;

  const onLogout = () => {
    clearAll();
    logout();
  };

  const authLinks = (
    <Fragment>
      <li>
        <Link to="/add" className="btn transparent">
          <i className="material-icons right">add</i>
          <span>Add expense</span>
        </Link>
      </li>
      <li>
        <a onClick={onLogout} href="#!" className="btn transparent">
          <i className="material-icons right">exit_to_app</i>
          <span>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/login" className="btn transparent">
          <i className="material-icons right">person</i>
          <span>Login</span>
        </Link>
      </li>
      <li>
        <Link to="/register" className="btn transparent">
          <i className="material-icons right">person_add</i>
          <span>Register</span>
        </Link>
      </li>
    </Fragment>
  );

  const authLinksSidenav = (
    <Fragment>
      <li>
        <Link to="/add">
          <i className="material-icons left">add</i>
          <span>Add expense</span>
        </Link>
      </li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="material-icons left">exit_to_app</i>
          <span>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinksSidenav = (
    <Fragment>
      <li>
        <Link to="/login">
          <i className="material-icons left">person</i>
          <span>Login</span>
        </Link>
      </li>
      <li>
        <Link to="/register">
          <i className="material-icons left">person_add</i>
          <span>Register</span>
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className="nav-wrapper indigo darken-1">
      <div className="container">
        <Link to="/" className="brand-logo">
          ExpenseManager
        </Link>
        <a href="#!" className="sidenav-trigger" data-target="mobile-menu">
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
        <ul className="sidenav grey lighten-2" id="mobile-menu">
          <h5 className="center-align black-text mb-20px">Expense Manager</h5>
          <hr />
          {isAuthenticated ? authLinksSidenav : guestLinksSidenav}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
