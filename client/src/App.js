import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Loading from './components/layout/Loading';

import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import Roadmap from './components/roadmap/Roadmap';

import BugState from './context/bug/BugState';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthState from './context/auth/AuthState';
import ProjectState from './context/project/ProjectState';
import RoadmapState from './context/roadmap/RoadmapState';

import Projects from './components/projects/Projects';

const App = () => {
  return (
    <AuthState>
      <ProjectState>
        <BugState>
          <RoadmapState>
            <Loading />
            <Router>
              <Navbar />

              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <PrivateRoute exact path='/projects' component={Projects} />
                <PrivateRoute exact path='/roadmap' component={Roadmap} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
              </Switch>
            </Router>
          </RoadmapState>
        </BugState>
      </ProjectState>
    </AuthState>
  );
};

export default App;
