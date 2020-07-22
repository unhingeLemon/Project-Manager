import React, { Fragment,useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext'


const Navbar = () => {
  const authContext = useContext(AuthContext)
  const {logout} = authContext


  const onLogout =()=>{
    logout();
  }

  return (
    <Fragment>
      <div className='nav'>
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
          <p>Welcome Mark</p>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
          <a onClick={onLogout} href='#!'>
    
          <span className='hide-sm'>Logout</span>
        </a>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
