import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import BugContext from '../../context/bug/bugContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const bugContext = useContext(BugContext);
  const { logout, user, isAuthenticated } = authContext;
  const { resetBugs } = bugContext;

  const onLogout = () => {
    logout();
    resetBugs();
  };

  return (
    <Fragment>
      <div
        className='nav'
        style={{ display: `${isAuthenticated ? 'flex' : 'none'}` }}
      >
        <div className='nav-links'>
          <i className='fas fa-bug' />
          <p>Bug Tracker</p>
          <ul>
            <li>
              <a href='/#'>Your works</a>
            </li>
            <li>
              <a href='/#'>People</a>
            </li>
            <li>
              <Link to='/projects'>Projects</Link>
            </li>
          </ul>
        </div>
        <div className='welcome'>
          {user === null ? (
            <div>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </div>
          ) : (
            <div className='right-items'>
              <p>Welcome {user.name}</p>
              <a onClick={onLogout} href='/login'>
                <i className='fas fa-sign-out-alt  ' aria-hidden='true' />
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
