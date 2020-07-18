import React, { Fragment } from 'react';

const BugItem = ({ bug }) => {
  const { id, title, projectName, priority, status } = bug;

  let color;
  if (bug.priority === 'Low') {
    color = 'green';
  } else if (bug.priority === 'Medium') {
    color = 'yellow';
  } else if (bug.priority === 'Deffered') {
    color = 'gray';
  }

  return (
    <Fragment>
      <div className='bug-item-container'>
        <div className='title'>{title}</div>
        <div> </div>
        <div>
          <div className='projectname'>{projectName}</div>
        </div>

        <div className='status'>
          <div
            className='circle '
            style={{ backgroundColor: `${color}` }}
          ></div>
          <div>{priority}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default BugItem;
