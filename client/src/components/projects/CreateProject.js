import React, { Fragment, useEffect, useState, useContext } from 'react';
import ProjectContext from '../../context/project/projectContext';
import AuthContext from '../../context/auth/authContext';

const CreateProject = () => {
  const projectContext = useContext(ProjectContext);
  const authContext = useContext(AuthContext);
  const { addProject } = projectContext;
  const { user, updateUser } = authContext;
  const [isOpen, setOpen] = useState(false);

  const [project, setProject] = useState({
    title: '',
    description: '',
    date: Date.now(),
  });

  useEffect(() => {
    setProject({
      title: '',
      description: '',
      date: Date.now(),
    });
  }, [isOpen]);
  var tempUser;

  useEffect(() => {
    if (projectContext.project) {
      // eslint-disable-next-line
      tempUser = user;
      tempUser.projectId = projectContext.project._id;
      updateUser(user._id, tempUser);
    }

    // console.log(projectContext.project);
  }, [projectContext.project]);

  const { title, description } = project;

  const onChange = (e) =>
    setProject({ ...project, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    addProject(project);

    setOpen(false);
    e.preventDefault();
  };

  return (
    <Fragment>
      <div className='btn-container'>
        <button
          onClick={() => setOpen(true)}
          className='btn btn-primary create-project-btn'
        >
          Create
        </button>
      </div>

      {isOpen ? (
        <div className='modal-bg'>
          <div className='modal create-project-modal'>
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
              <div className='btn-container2 btn-cproject'>
                <button className='btn btn-primary'>SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default CreateProject;
