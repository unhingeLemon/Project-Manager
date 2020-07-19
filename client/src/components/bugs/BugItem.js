import React, { Fragment, useState } from 'react';
import ShowBugInfo from './ShowBugInfo';

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
  let [bugInfo, openBugInfo] = useState(false);
  const onClick = () => {
    openBugInfo(true);
  };

  return (
    <Fragment>
      <div onClick={onClick} className='bug-item-container'>
        <div className='title'>{title} </div>
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

      {bugInfo ? <ShowBugInfo openBugInfo={openBugInfo} bug={bug} /> : null}
    </Fragment>
  );
};

export default BugItem;
