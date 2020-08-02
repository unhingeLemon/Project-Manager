import React, { Fragment, useContext, useEffect } from 'react';
import ProjectContext from '../../context/project/projectContext';
import AuthContext from '../../context/auth/authContext';
import UpdateProject from '../projects/UpdateProject';
import AddPeople from '../projects/AddPeople';
import DeleteProject from '../projects/DeleteProject';

const Sidebar = () => {
  const projectContext = useContext(ProjectContext);
  const authContext = useContext(AuthContext);
  const {
    project,
    loadCurProject,
    deleteUsers,
    reqUser,
    getReqUser,
  } = projectContext;
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

    getReqUser(user);
  };

  useEffect(() => {
    if (user) {
      loadCurProject(user.projectId);
    }
    /// IF THE DELETED USER HOLD THE PROJECT
    /// REMOVE IT.
    if (reqUser) {
      if (reqUser.projectId === project._id) {
        authContext.updateDeletedUser(reqUser._id, { projectId: 'none' });
      }
    }

    console.log(reqUser);

    // eslint-disable-next-line
  }, [loading, reqUser]);

  return (
    <Fragment>
      <div className='sidebar-container'>
        <div>
          <i className='far fa-folder'></i>
          {project && project.title}
        </div>
        <div>{project && project.description}</div>
        {/* <ul>
          <li>Roadmap</li>
          <li>Dashboard</li>
        </ul> */}

        {user && user._id === project.user && (
          <div className='sidebarBtn'>
            <div>
              <AddPeople />
            </div>
            <div>
              <UpdateProject />
            </div>
          </div>
        )}
        <div className='users-sidebar'>
          <div>
            <i className='fas fa-users'></i>
            PEOPLE
          </div>
          <ul>
            {project.users &&
              user &&
              user._id === project.user &&
              project.users.map((user) => (
                <li key={user}>
                  <div>{user}</div>
                  <i
                    className='fas fa-trash'
                    onClick={() => deleteUser(user)}
                  ></i>
                </li>
              ))}

            {/* IF YOU DO NOT OWN THE PROJECT... */}

            {project.users &&
              user &&
              user._id !== project.user &&
              project.users.map((user) => (
                <li key={user}>
                  <div>{user}</div>
                </li>
              ))}
          </ul>
        </div>

        {user && user._id === project.user && (
          <div className='sidebarBtn'>
            <DeleteProject />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Sidebar;
