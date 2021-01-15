import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import ExpenseForm from './components/pages/ExpenseForm';
import Alerts from './components/layout/Alerts';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './routing/PrivateRoute';

import ExpenseState from './context/expense/ExpenseState';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';

import './App.css';

function App() {
  return (
    <AuthState>
      <ExpenseState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <Alerts />
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/add" component={ExpenseForm} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </Fragment>
          </Router>
        </AlertState>
      </ExpenseState>
    </AuthState>
  );
}

export default App;
