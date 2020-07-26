import React from 'react';

import Bugs from '../bugs/Bugs';
import Sidebar from '../layout/Sidebar';

const Home = () => {
  return (
    <div className='underNav'>
      <Sidebar />
      <Bugs />
    </div>
  );
};

export default Home;
