import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Loading from './components/layout/Loading';

import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';

import BugState from './context/bug/BugState';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthState from './context/auth/AuthState';

import ProjectIndex from './components/projects/index';

const App = () => {
  return (
    <AuthState>
      <BugState>
        <Loading />
        <Router>
          <Navbar />

          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/projects' component={ProjectIndex} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </Router>
      </BugState>
    </AuthState>
  );
};

export default App;
