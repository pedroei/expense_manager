import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'red', 3000);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="container">
      <div className="container">
        <form onSubmit={onSubmit}>
          <div
            className="container borders"
            style={{ padding: '30px 50px 50px 50px' }}
          >
            <h2 className="center-align mb-20px" style={{ marginTop: '20px' }}>
              Login
            </h2>
            <div className="input-field">
              <i className="material-icons prefix">email</i>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field mt-20px">
              <i className="material-icons prefix">vpn_key</i>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                autoComplete="off"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="center-align">
              <button
                className="btn waves-effect waves-dark indigo darken-1"
                style={{ marginTop: '20px' }}
              >
                Login
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
