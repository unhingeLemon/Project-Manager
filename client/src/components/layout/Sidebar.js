import React, { Fragment, useContext, useEffect } from 'react';
import ProjectContext from '../../context/project/projectContext';
import AuthContext from '../../context/auth/authContext';
import UpdateProject from '../projects/UpdateProject';
import AddPeople from '../projects/AddPeople';
import DeleteProject from '../projects/DeleteProject';

const Sidebar = () => {
  const projectContext = useContext(ProjectContext);
  const authContext = useContext(AuthContext);
  const { project, loadCurProject, deleteUsers } = projectContext;
  const { user, loading } = authContext;

  const deleteUser = (user) => {
    // This will delete the specific
    // element in an array
    const array = project.users;
    const index = array.indexOf(user);
    if (index > -1) {
      array.splice(index, 1);
    }

    console.log(array);

    deleteUsers(project._id, { users: array });
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      loadCurProject(user.projectId);
    }
    // eslint-disable-next-line
  }, [loading]);

  return (
    <Fragment>
      <div className='sidebar-container'>
        <div>{project && project.title}</div>
        <div>{project && project.description}</div>
        <ul>
          <li>Roadmap</li>
          <li>Dashboard</li>
        </ul>

        {user && user._id === project.user && (
          <div>
            <UpdateProject />
            <AddPeople />
            <DeleteProject />
          </div>
        )}
        <ul>
          {project.users &&
            project.users.map((user) => (
              <li>
                {user}
                <i className='fas fa-trash' onClick={() => deleteUser(user)} />
              </li>
            ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default Sidebar;
