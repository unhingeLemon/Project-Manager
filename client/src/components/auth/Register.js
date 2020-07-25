import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const { register, isAuthenticated, loadUser, error } = authContext;
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === password2) {
      register({
        name,
        email,
        password,
      });
    } else {
      alert('Password does not match');
    }
  };

  useEffect(() => {
    // Once authenticated,redirect.
    // history is used to change url inside our app,
    // while not reloading the page
    if (isAuthenticated) {
      props.history.push('/');
      loadUser();
    }
    if (error) {
      alert(error);
    }

    // eslint-disable-next-line
  }, [isAuthenticated, props.history, error]);

  return (
    <div className='auth'>
      <div className='banner-container'>
        <div className='brand-container'>
          <i className='fas fa-bug main-icon' />
          <div className='brand-name'>PROJECT MANAGER</div>
        </div>

        <div className='quote-container'>
          <div className='quote'>
            A place where you can work with the same project with other people.
            Like social media? I still don't have a name for it tho.
          </div>
          <div className='quote-author'>- me</div>
        </div>
      </div>

      <div className='register-form-container'>
        <div className='auth-title'>Register</div>
        <div className='auth-sub'>Enter your details below</div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              type='text'
              name='name'
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              id='email'
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
              minLength='6'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password2'>Confirm Password</label>
            <input
              id='password2'
              type='password'
              name='password2'
              value={password2}
              onChange={onChange}
              required
              minLength='6'
            />
          </div>
          <input type='submit' value='Register' className='auth-submit' />
          <div className='register-prompt'>
            Already have an account?
            <div>
              <Link to='/login'>Login!</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
