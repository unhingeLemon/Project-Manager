import React, { Fragment, useState, useEffect, useContext } from 'react';
import ProjectContext from '../../context/project/projectContext';

const DeleteProject = (props) => {
  const [isOpen, setOpen] = useState(false);

  const projectContext = useContext(ProjectContext);
  const { project, deleteProject } = projectContext;
  const [title, setTitle] = useState('');
  const onChange = (e) => setTitle(e.target.value);

  useEffect(() => {
    setTitle('');
  }, [isOpen]);
  const { history } = props;
  const onSubmit = (e) => {
    if (project.title === title) {
      deleteProject(project._id);
      history.push('/projects');
    }

    setOpen(false);
    e.preventDefault();
  };

  return (
    <Fragment>
      <div className='btn-container'>
        <button
          onClick={() => setOpen(true)}
          className='btn btn-primary'
          style={{ background: 'red' }}
        >
          DELETE
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
              <div>
                <p>
                  Are you sure you want to delete this project? This can't be
                  undone.
                </p>
              </div>

              <label>
                <div>Please type the title</div>
                <input
                  type='text'
                  name='title'
                  onChange={onChange}
                  value={title}
                  required
                />
              </label>
              <div className='btn-container2'>
                <button className='btn btn-primary'>Delete</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default DeleteProject;
