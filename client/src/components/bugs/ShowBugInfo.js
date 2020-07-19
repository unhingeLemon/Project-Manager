import React from 'react';
import Moment from 'react-moment';

const ShowBugInfo = ({ bug, openBugInfo }) => {
  return (
    <div>
      <div className='modal-bg'>
        <div className='modal info-modal'>
          <i
            onClick={() => openBugInfo(false)}
            className='fa fa-times-circle closebtn'
            aria-hidden='true'
          ></i>

          <div className='info-project-container'>
            <div className='info-project-name'>{bug.projectName}</div>
            <p>BUG-{bug.id}</p>
          </div>
          <div className='info-title'>
            <div>{bug.title}</div>
            <div>{bug.status.toUpperCase()}</div>
          </div>
          <div className='info-desc'>{bug.description}</div>
          <div>
            <div className='circle'>0</div>
            <div>{bug.priority}</div>
          </div>
          <div>
            <Moment format='MM-DD-YYYY hh:mm'>{bug.date}</Moment>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBugInfo;
