import React, { Fragment } from 'react';

const Sidebar = () => {
  return (
    <Fragment>
      <div className='sidebar-container'>
        <div>PROJECT NAME</div>
        <ul>
          <li>Roadmap</li>
          <li>Dashboard</li>
        </ul>
      </div>
    </Fragment>
  );
};

export default Sidebar;
