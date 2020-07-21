import React, { Fragment, useState } from 'react';
import ShowBugInfo from './ShowBugInfo';

const BugItem = ({ bug, getDragBug }) => {
  const {  title, projectName, priority } = bug;


 

  const getColor = () => {
    if (bug.priority === 'Low') {
      return 'green';
    } else if (bug.priority === 'Medium') {
      return 'yellow';
    } else if (bug.priority === 'Deffered') {
      return 'gray';
    }
  };

  let [bugInfo, openBugInfo] = useState(false);
  const onClick = () => {
    openBugInfo(true);
  };

  return (
    <Fragment>
      <div
        onClick={onClick}
        className='bug-item-container'
        draggable='true'
        onDragStart={() => getDragBug(bug)}
      >
        <div className='title'>{title} </div>
        <div></div>
        <div>
          <div className='projectname'>{projectName}</div>
        </div>

        <div className='status'>
          <div
            className='circle '
            style={{ backgroundColor: `${getColor()}` }}
          ></div>
          <div>{priority}</div>
        </div>
      </div>

      {bugInfo ? (
        <ShowBugInfo key={bug._id} getColor={getColor} openBugInfo={openBugInfo} bug={bug} />
      ) : null}
    </Fragment>
  );
};

export default BugItem;
