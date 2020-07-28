import React, { useContext, useState } from 'react';
import ProjectContext from '../../context/project/projectContext';
import AuthContext from '../../context/auth/authContext';
import { Redirect } from 'react-router-dom';

const ProjectItem = ({ project }) => {
  const projectContext = useContext(ProjectContext);
  const authContext = useContext(AuthContext);
  const { user, updateUser } = authContext;
  const [redirect, setRedirect] = useState(false);
  var tempUser;

  const onClick = () => {
    tempUser = user;
    tempUser.projectId = project._id;
    updateUser(user._id, tempUser);
    setRedirect(true);
  };

  return (
    <div onClick={onClick} style={{ border: '4px solid black' }}>
      {project.title}
      {redirect && <Redirect to='/' />}
    </div>
  );
};

export default ProjectItem;
