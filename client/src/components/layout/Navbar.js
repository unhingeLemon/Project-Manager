import React, { Fragment } from 'react';

const Navbar = () => {
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
              <a href='/#'>Projects</a>
            </li>
          </ul>
        </div>
        <div className='welcome'>
          <p>Welcome Mark</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
