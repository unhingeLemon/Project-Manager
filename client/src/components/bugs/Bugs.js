import React, { useContext, Fragment, useState, useEffect } from 'react';
import BugItem from './BugItem';
import BugContext from '../../context/bug/bugContext';
import BugForm from './BugForm';

const Bugs = () => {
  const bugContext = useContext(BugContext);
  const { bugs, getBugs, updateBug } = bugContext;
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    getBugs();
    // eslint-disable-next-line
  }, []);

  let todo = bugs.filter((bug) => bug.status === 'todo');
  let inprogress = bugs.filter((bug) => bug.status === 'in progress');
  let done = bugs.filter((bug) => bug.status === 'done');

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

    updateBug(tempBug);
    updating();
  };

  return (
    <div className='scrolly'>
      <BugForm />
      <div className='cards'>
        <div
          className='card todo'
          onDragOver={onDragOver}
          onDrop={() => dropIn('todo')}
        >
          <div className='card-header'>
            <p>TO DO</p> <i class='fas fa-clipboard-list'></i>
          </div>

          {todo.map((bug) => (
            <BugItem key={bug._id} bug={bug} getDragBug={getDragBug} />
          ))}
        </div>
        <div
          className='card in-progress'
          onDragOver={onDragOver}
          onDrop={() => dropIn('in progress')}
        >
          <div className='card-header'>
            <p>IN PROGRESS</p> <i class='fas fa-spinner'></i>
          </div>
          {inprogress.map((bug) => (
            <BugItem key={bug._id} bug={bug} getDragBug={getDragBug} />
          ))}
        </div>
        <div
          className='card done'
          onDragOver={onDragOver}
          onDrop={() => dropIn('done')}
        >
          <div className='card-header'>
            <p>DONE</p> <i class='fas fa-clipboard-check'></i>
          </div>
          {done.map((bug) => (
            <BugItem key={bug._id} bug={bug} getDragBug={getDragBug} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bugs;
