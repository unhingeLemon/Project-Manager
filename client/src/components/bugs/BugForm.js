import React, { useState, Fragment, useContext, useEffect } from 'react';
import BugContext from '../../context/bug/bugContext';

const BugForm = () => {
  const [isOpen, setOpen] = useState(false);
  const bugContext = useContext(BugContext);

  const { addBug, getBugs } = bugContext;

  const [bug, setBug] = useState({
    title: '',
    priority: 'Low',
    projectName: '',
    description: '',
    status: 'todo',
    date: Date.now(),
  });

  useEffect(() => {
    setBug({
      title: '',
      priority: 'Low',
      projectName: '',
      description: '',
      status: 'todo',
      date: Date.now(),
    });
  }, [bugContext]);

  const { title, description, projectName, priority } = bug;

  const onChange = (e) => setBug({ ...bug, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    bugContext.loading = true;
    addBug(bug);
    setOpen(false);
    getBugs();
  };

  return (
    <Fragment>
      <div className='btn-container'>
        <button onClick={() => setOpen(true)} className='btn btn-primary'>
          CREATE
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
              <p>CREATE AN ISSUE</p>
              <label>
                <div> Project</div>
                <input
                  type='text'
                  name='projectName'
                  onChange={onChange}
                  value={projectName}
                  required
                />
              </label>
              <label>
                <div>Bug Title</div>
                <input
                  type='text'
                  name='title'
                  onChange={onChange}
                  value={title}
                  required
                />
              </label>
              <label>
                <div>Bug Description</div>
                <textarea
                  value={description}
                  onChange={onChange}
                  name='description'
                  maxLength='500'
                  required
                />
              </label>
              <div className='priority'>
                <div>Priority:</div>
                <div className='radios-container '>
                  <div className='radio-container'>
                    <input
                      type='radio'
                      name='priority'
                      id=''
                      value='Low'
                      checked={priority === 'Low'}
                      onChange={onChange}
                    />{' '}
                    Low
                  </div>
                  <div className='radio-container'>
                    <input
                      type='radio'
                      name='priority'
                      id=''
                      value='Medium'
                      checked={priority === 'Medium'}
                      onChange={onChange}
                    />
                    Medium
                  </div>
                  <div className='radio-container'>
                    <input
                      type='radio'
                      name='priority'
                      id=''
                      value='High'
                      checked={priority === 'High'}
                      onChange={onChange}
                    />
                    High
                  </div>
                </div>
              </div>
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

export default BugForm;
