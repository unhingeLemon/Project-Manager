import React, { useState, Fragment, useContext, useEffect } from 'react';
import BugContext from '../../context/bug/bugContext';
import ProjectContext from '../../context/project/projectContext';
import AuthContext from '../../context/auth/authContext';
const BugForm = () => {
  const authContext = useContext(AuthContext);
  const [isOpen, setOpen] = useState(false);
  const bugContext = useContext(BugContext);
  const projectContext = useContext(ProjectContext);
  const { project } = projectContext;
  const { addBug, getBugs } = bugContext;
  const { user } = authContext;

  const [bug, setBug] = useState({
    title: '',
    priority: 'Low',
    projectName: '',
    description: '',
    status: 'todo',
    date: Date.now(),
  });

  useEffect(() => {
    if (user) {
      setBug({
        title: '',
        priority: 'Low',
        projectName: '',
        description: '',
        status: 'todo',
        createdBy: user.name,
        date: Date.now(),
      });
    }
    //eslint-disable-next-line
  }, [isOpen]);

  const { title, description, priority } = bug;

  const onChange = (e) => setBug({ ...bug, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    addBug(bug, project._id);

    setOpen(false);
    getBugs(project._id);
  };

  return (
    <Fragment>
      <div className='btn-container'>
        <button onClick={() => setOpen(true)} className='btn btn-primary'>
          Create
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
                <div>ISSUE TITLE</div>
                <input
                  type='text'
                  name='title'
                  onChange={onChange}
                  value={title}
                  required
                />
              </label>
              <label>
                <div>DESCRIPTION</div>
                <textarea
                  value={description}
                  onChange={onChange}
                  name='description'
                  maxLength='600'
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
