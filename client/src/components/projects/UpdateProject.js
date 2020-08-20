import React, { Fragment, useState, useEffect, useContext } from 'react';
import ProjectContext from '../../context/project/projectContext';

const UpdateProject = () => {
  const [isOpen, setOpen] = useState(false);
  const projectContext = useContext(ProjectContext);
  const { updateProject } = projectContext;
  useEffect(() => {
    if (projectContext.project) {
      setProject({
        title: projectContext.project.title,
        description: projectContext.project.description,
      });
    }

    // eslint-disable-next-line
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
      <button className='sidebar-option-item' onClick={() => setOpen(true)}>
        Edit
      </button>

      {isOpen ? (
        <div className='modal-bg'>
          <div className='modal update-project'>
            <i
              onClick={() => setOpen(false)}
              className='fa fa-times-circle closebtn'
              aria-hidden='true'
            ></i>

            <form
              className='create-form update-project-form'
              onSubmit={onSubmit}
            >
              <p>EDIT THIS PROJECT</p>

              <label>
                <div>TITLE</div>
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
                  maxLength='500'
                  required
                />
              </label>
              <div className='btn-container2 update-btn'>
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
