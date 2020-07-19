import React, { useReducer } from 'react';
import bugContext from './bugContext';
import bugReducer from './bugReducer';
import { ADD_BUG } from '../types';
import shortid from 'shortid';

const BugState = (props) => {
  const initialState = {
    bugs: [
      {
        id: 1,
        title: 'Bug #1',
        priority: 'Medium',
        projectName: 'projectName',
        description: 'wew',
        status: 'in progress',
        date: Date.now(),
      },

      {
        id: 2,
        title: 'Bug #2',
        priority: 'Deffered',
        projectName: 'projectName',
        description: 'wew',
        status: 'todo',
        date: Date.now(),
      },

      {
        id: 3,
        title: 'Bug #3',
        priority: 'High',
        projectName: 'projectName',
        description: 'wew',
        status: 'todo',
        date: Date.now(),
      },

      {
        id: 4,
        title: 'Bug #4',
        priority: 'Low',
        projectName: 'projectName',
        description: 'wew',
        status: 'in progress',
        date: Date.now(),
      },
      {
        id: 5,
        title: 'Bug #5',
        priority: 'High',
        projectName: 'projectName',
        description: 'wew',
        status: 'done',
        date: Date.now(),
      },
    ],
  };
  const [state, dispatch] = useReducer(bugReducer, initialState);

  const addBug = (bug) => {
    let idGen = shortid.generate();
    bug.id = idGen;
    dispatch({
      type: ADD_BUG,
      payload: bug,
    });
  };

  return (
    <bugContext.Provider
      value={{
        bugs: state.bugs,
        addBug,
      }}
    >
      {props.children}
    </bugContext.Provider>
  );
};

export default BugState;
