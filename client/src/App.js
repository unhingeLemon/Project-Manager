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
import ProjectState from './context/project/ProjectState';

import Projects from './components/projects/Projects';

const App = () => {
  return (
    <AuthState>
      <ProjectState>
        <BugState>
          <Loading />
          <Router>
            <Navbar />

            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <PrivateRoute exact path='/projects' component={Projects} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </Router>
        </BugState>
      </ProjectState>
    </AuthState>
  );
};

export default App;
