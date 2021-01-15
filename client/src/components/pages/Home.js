import React, { useContext, useEffect } from 'react';
import Balance from '../expenses/Balance';
import ExpensesList from '../expenses/ExpensesList';

import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container p-20px">
      <Balance />
      <ExpensesList />
    </div>
  );
};

export default Home;
