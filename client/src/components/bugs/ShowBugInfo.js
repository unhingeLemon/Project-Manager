import React, { useContext } from 'react';
import Moment from 'react-moment';
import BugContext from '../../context/bug/bugContext';

const ShowBugInfo = ({ bug, openBugInfo, getColor }) => {
  const getStatusColor = () => {
    if (bug.status === 'in progress') {
      return 'blue';
    } else if (bug.status === 'done') {
      return 'green';
    }
  };

  const bugContext = useContext(BugContext);
  const { deleteBug } = bugContext;

  const onDelete = () => {
    deleteBug(bug._id);
    openBugInfo(false);
  };

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
            <div>{bug.projectName}</div>
            <i className='fas fa-trash' onClick={onDelete}></i>
            <div>BUG</div>
          </div>
          <div className='info-title'>
            <div>{bug.title}</div>
            <div style={{ color: `${getStatusColor()}` }}>
              {bug.status.toUpperCase()}
            </div>
          </div>
          <div className='info-desc'>{bug.description}</div>

          <div className='info-footer'>
            <div className='status'>
              <div
                className='circle'
                style={{ backgroundColor: `${getColor()}` }}
              ></div>
              <div>{bug.priority}</div>
            </div>
            <Moment format='MMMM Do YYYY, h:mm a'>{bug.date}</Moment>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBugInfo;
