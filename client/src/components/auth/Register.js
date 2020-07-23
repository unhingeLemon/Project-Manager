import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = (props) => {
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
  };

  return (
    <div className='auth'>
      <div className='banner-container'>
        <div className='brand-container'>
          <i className='fas fa-bug main-icon' />
          <div className='brand-name'>BUG TRACKER</div>
        </div>

        <div className='quote-container'>
          <div className='quote'>
            It's not a bug — it's an undocumented feature.
          </div>
          <div className='quote-author'>- Anonymous</div>
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
