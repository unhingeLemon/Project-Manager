import React, { Fragment, useState, useEffect, useContext } from 'react';
import ProjectContext from '../../context/project/projectContext';

const UpdateProject = () => {
  const [isOpen, setOpen] = useState(false);
  const projectContext = useContext(ProjectContext);
  const { updateProject } = projectContext;
  useEffect(() => {
    setProject({
      title: projectContext.project.title,
      description: projectContext.project.description,
    });
  }, [isOpen]);

  const [project, setProject] = useState({
    title: '',
    description: '',
    date: Date.now(),
  });
  const { title, description } = project;

  const onChange = (e) =>
    setProject({ ...project, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    updateProject(projectContext.project._id, project);
    setOpen(false);
    e.preventDefault();
  };

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
              <p>UPDATE THIS PROJECT</p>

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
