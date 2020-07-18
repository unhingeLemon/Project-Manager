import React, { useState, Fragment, useEffect } from 'react';

const CreateButton = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Fragment>
      <div className='createBtn'>
        <button onClick={() => setOpen(true)} className='btn btn-primary'>
          CREATE
        </button>
      </div>
      {isOpen ? (
        <div className='modal-bg'>
          <div className='modal'>
            <p>Modal is open</p>
            <p className='closebtn' onClick={() => setOpen(false)}>
              x
            </p>
            <input type='text' />
            <input type='text' />
            <input type='text' />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default CreateButton;
