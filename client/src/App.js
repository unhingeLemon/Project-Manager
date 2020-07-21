import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';

import Home from './components/pages/Home';

import BugState from './context/bug/BugState';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthState from './context/auth/AuthState';

import ProjectIndex from './components/projects/index';

const App = () => {
  return (
    <AuthState>
      <BugState>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/projects' component={ProjectIndex} />
            <Route />
          </Switch>
        </Router>
      </BugState>
    </AuthState>
  );
};

export default App;
