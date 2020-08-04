import React, { useContext, useState } from 'react';
import Moment from 'react-moment';
import AuthContext from '../../context/auth/authContext';
import { Redirect } from 'react-router-dom';
import ProjectContext from '../../context/project/projectContext';
const ProjectItem = ({ project }) => {
  const authContext = useContext(AuthContext);
  const { user, updateUser } = authContext;
  const [redirect, setRedirect] = useState(false);
  const projectContext = useContext(ProjectContext);
  const { loadCurProject } = projectContext;

  var tempUser;

  const onClick = () => {
    tempUser = user;
    tempUser.projectId = project._id;
    updateUser(user._id, tempUser);
    if (user) {
      if (user.projectId !== undefined) {
        loadCurProject(user.projectId);
      }
    }
    setRedirect(true);
  };

  return (
    <div className='card-item'>
      <div> {project.title}</div>
      <div className='line-break'></div>
      <div className='card-description'> {project.description}</div>

      <div className='card-footer'>
        <div onClick={onClick} className='btn btn-primary'>
          SELECT
        </div>
        <div>
          <Moment key={project._id} format='MMMM Do YYYY'>
            {project.date}
          </Moment>
        </div>
      </div>

      {redirect && <Redirect to='/' />}
    </div>
  );
};

export default ProjectItem;
