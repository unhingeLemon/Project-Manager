import React, { useContext, Fragment } from 'react';
import BugItem from '../bugs/BugItem';
import BugContext from '../context/bugItem/bugContext';

const Cards = () => {
  const bugContext = useContext(BugContext);
  const { bugs } = bugContext;

  const todo = bugs.filter((bug) => bug.status === 'todo');
  const inprogress = bugs.filter((bug) => bug.status === 'in progress');
  const done = bugs.filter((bug) => bug.status === 'done');

  return (
    <Fragment>
      <div className='cards'>
        <div className='card todo'>
          <p>TO DO</p>
          {todo.map((bug) => (
            <BugItem key={bug.id} bug={bug} />
          ))}
        </div>
        <div className='card in-progress'>
          <p>IN PROGRESS</p>
          {inprogress.map((bug) => (
            <BugItem key={bug.id} bug={bug} />
          ))}
        </div>
        <div className='card done'>
          <p>DONE</p>
          {done.map((bug) => (
            <BugItem key={bug.id} bug={bug} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Cards;
