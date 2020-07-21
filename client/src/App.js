import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import BugForm from './components/bugs/BugForm';
import Bugs from './components/bugs/Bugs';
import BugState from './context/bug/BugState';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ProjectIndex from './components/projects/index';

const App = () => {
  return (
    <BugState>
      <Router>
        <Navbar />
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <Fragment>
                <BugForm />
                <Bugs />
              </Fragment>
            )}
          />
          <Route exact path='/projects' component={ProjectIndex} />
          <Route />
        </Switch>
      </Router>
    </BugState>
  );
};

export default App;
