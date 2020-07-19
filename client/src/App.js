import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import BugForm from './components/bugs/BugForm';
import Cards from './components/bugs/Cards';
import BugState from './components/context/bugItem/BugState';

const App = () => {
  return (
    <BugState>
      <Fragment>
        <Navbar />
        <BugForm />
        <Cards />
      </Fragment>
    </BugState>
  );
};

export default App;
