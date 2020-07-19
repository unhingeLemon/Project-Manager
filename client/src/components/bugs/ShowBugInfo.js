import React from 'react';

const ShowBugInfo = ({ bug, openBugInfo }) => {
  return (
    <div>
      <div className='modal-bg'>
        <div className='modal'>
          <i
            onClick={() => openBugInfo(false)}
            className='fa fa-times-circle closebtn'
            aria-hidden='true'
          ></i>
        </div>
      </div>
    </div>
  );
};

export default ShowBugInfo;
