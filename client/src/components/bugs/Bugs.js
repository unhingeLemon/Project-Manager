import React, { useContext, Fragment, useState, useEffect } from 'react';
import BugItem from './BugItem';
import BugContext from '../context/bugItem/bugContext';

const Bugs = () => {
  const bugContext = useContext(BugContext);
  const { bugs, getBugs } = bugContext;
  const [update, setUpdate] = useState(false);

  let todo = bugs.filter((bug) => bug.status === 'todo');
  let inprogress = bugs.filter((bug) => bug.status === 'in progress');
  let done = bugs.filter((bug) => bug.status === 'done');

  useEffect(() => {
    getBugs();
    // eslint-disable-next-line
  }, []);

  const onDragOver = (e) => {
    e.preventDefault();
    console.log('over');
  };

  let tempBug;

  const getDragBug = (bug) => {
    tempBug = bug;
    console.log(tempBug);
  };

  const updating = () => {
    if (update === false) {
      setUpdate(true);
    } else {
      setUpdate(false);
    }
  };

  const dropIn = (s) => {
    tempBug.status = s;
    bugs.filter((bug) => {
      // eslint-disable-next-line
      bug._id === tempBug._id ? (bug.status = s) : (bug._id = bug._id);
    });
    updating();
  };

  return (
    <Fragment>
      <div className='scrolly'>
        <div className='cards'>
          <div
            className='card todo'
            onDragOver={onDragOver}
            onDrop={() => dropIn('todo')}
          >
            <p>TO DO</p>
            {todo.map((bug) => (
              <BugItem key={bug._id} bug={bug} getDragBug={getDragBug} />
            ))}
          </div>
          <div
            className='card in-progress'
            onDragOver={onDragOver}
            onDrop={() => dropIn('in progress')}
          >
            <p>IN PROGRESS</p>
            {inprogress.map((bug) => (
              <BugItem key={bug._id} bug={bug} getDragBug={getDragBug} />
            ))}
          </div>
          <div
            className='card done'
            onDragOver={onDragOver}
            onDrop={() => dropIn('done')}
          >
            <p>DONE</p>
            {done.map((bug) => (
              <BugItem key={bug._id} bug={bug} getDragBug={getDragBug} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Bugs;
