import React, { Fragment } from 'react';
import './App.css';
import './components/css java/css';
import Navbar from './components/layout/Navbar';
import CreateButton from './components/layout/CreateButton';
import Cards from './components/bugs/Cards';
import BugState from './components/context/bugItem/BugState';

const App = () => {
  return (
    <BugState>
      <Fragment>
        <Navbar />
        <CreateButton />
        <Cards />
      </Fragment>
    </BugState>
  );
};

export default App;
