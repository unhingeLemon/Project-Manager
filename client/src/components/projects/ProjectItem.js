import React, { useContext, useState } from 'react';

import AuthContext from '../../context/auth/authContext';
import { Redirect } from 'react-router-dom';

const ProjectItem = ({ project }) => {
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
    <div
      onClick={onClick}
      style={{ border: '2px solid black', marginTop: '10px' }}
    >
      {project.title}
      {redirect && <Redirect to='/' />}
      <div style={{ padding: '4px 4px', background: 'black' }}></div>
    </div>
  );
};

export default ProjectItem;
