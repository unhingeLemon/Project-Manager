import React, { useReducer } from 'react';
import bugContext from './bugContext';
import bugReducer from './bugReducer';

const BugState = (props) => {
  const initialState = {
    bugs: [
      {
        id: 1,
        title: 'Bug #1',
        priority: 'Medium',
        projectName: 'projectName',
        status: 'in progress',
      },

      {
        id: 2,
        title: 'Bug #2',
        priority: 'Deffered',
        projectName: 'projectName',
        status: 'todo',
      },

      {
        id: 3,
        title: 'Bug #3',
        priority: 'High',
        projectName: 'projectName',
        status: 'todo',
      },

      {
        id: 4,
        title: 'Bug #4',
        priority: 'Low',
        projectName: 'projectName',
        status: 'in progress',
      },
      {
        id: 5,
        title: 'Bug #5',
        priority: 'High',
        projectName: 'projectName',
        status: 'done',
      },
    ],
  };

  const [state, dispatch] = useReducer(bugReducer, initialState);
  return (
    <bugContext.Provider
      value={{
        bugs: state.bugs,
      }}
    >
      {props.children}
    </bugContext.Provider>
  );
};

export default BugState;
