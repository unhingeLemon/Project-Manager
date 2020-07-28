import React, { Fragment } from 'react';

const UpdateProject = () => {
  return (
    <Fragment>
      <div className='btn-container'>
        <button onClick={() => setOpen(true)} className='btn btn-primary'>
          Create Project
        </button>
      </div>

      {isOpen ? (
        <div className='modal-bg'>
          <div className='modal'>
            <i
              onClick={() => setOpen(false)}
              className='fa fa-times-circle closebtn'
              aria-hidden='true'
            ></i>

            <form className='create-form' onSubmit={onSubmit}>
              <p>CREATE A PROJECT</p>

              <label>
                <div>Project Title</div>
                <input
                  type='text'
                  name='title'
                  onChange={onChange}
                  value={title}
                  required
                />
              </label>
              <label>
                <div>Description</div>
                <textarea
                  value={description}
                  onChange={onChange}
                  name='description'
                  maxLength='500'
                  required
                />
              </label>
              <div className='btn-container2'>
                <button className='btn btn-primary'>SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default UpdateProject;
