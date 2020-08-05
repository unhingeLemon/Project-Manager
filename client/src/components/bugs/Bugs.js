import React, { useContext, useState, useEffect } from 'react';
import BugItem from './BugItem';
import BugContext from '../../context/bug/bugContext';
import BugForm from './BugForm';
import ProjectContext from '../../context/project/projectContext';
import Loading from '../layout/Loading';

const Bugs = () => {
  const bugContext = useContext(BugContext);
  const projectContext = useContext(ProjectContext);

  const { bugs, getBugs, updateBug } = bugContext;
  const { project } = projectContext;
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (project) {
      getBugs(project._id);
    }

    // eslint-disable-next-line
  }, [project]);

  let todo = bugs.filter((bug) => bug.status === 'todo');
  let inprogress = bugs.filter((bug) => bug.status === 'in progress');
  let done = bugs.filter((bug) => bug.status === 'done');

  const onDragOver = (e) => {
    e.preventDefault();
    // console.log('over');
  };

  var tempBug;

  const getDragBug = (bug) => {
    tempBug = bug;
    // console.log(tempBug, 'sdsds');
  };

  const updating = () => {
    if (update === false) {
      setUpdate(true);
    } else {
      setUpdate(false);
    }
  };

  const dropIn = async (s) => {
    if (tempBug) {
      tempBug.status = s;
    }
    await updateBug(tempBug);
    updating();
  };

  return (
    <div className='scrolly'>
      {project && <BugForm />}
      <div className='cards'>
        <Loading />
        <div
          className='card todo'
          onDragOver={onDragOver}
          onDrop={() => dropIn('todo')}
        >
          <div className='card-header'>
            <p>TO DO</p> <i className='fas fa-clipboard-list'></i>
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
            <p>IN PROGRESS</p> <i className='fas fa-spinner'></i>
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
            <p>DONE</p> <i className='fas fa-clipboard-check'></i>
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
