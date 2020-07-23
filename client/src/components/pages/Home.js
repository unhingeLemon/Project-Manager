import React from 'react';
import BugForm from '../bugs/BugForm';
import Bugs from '../bugs/Bugs';

const Home = () => {
  return (
    <div className='underNav'>
      <BugForm />
      <Bugs />
    </div>
  );
};

export default Home;
