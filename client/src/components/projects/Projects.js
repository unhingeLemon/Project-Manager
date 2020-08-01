import React, { useContext, useEffect } from 'react';
import ProjectContext from '../../context/project/projectContext';
import AuthContext from '../../context/auth/authContext';
import ProjectItem from './ProjectItem';
import CreateProject from './CreateProject';

const Projects = () => {
  const projectContext = useContext(ProjectContext);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const {
    projects,
    invProjects,
    project,
    getInvProjects,
    getAllProjects,
  } = projectContext;

  useEffect(() => {
    authContext.loadUser();
    getAllProjects();
    getInvProjects(user.email);
    console.log(invProjects);
    // eslint-disable-next-line
  }, [project]);

  return (
    <div>
      <h1>PROJECT ROUTE</h1>
      <div>
        <CreateProject />
        Created Project
        {projects &&
          projects.map((project) => (
            <ProjectItem project={project} key={project._id} />
          ))}
      </div>
      <div>Added Project Collaborator</div>
      <div>
        {invProjects &&
          invProjects.map((invProject) => (
            <ProjectItem project={invProject} key={invProject._id} />
          ))}
      </div>
    </div>
  );
};

export default Projects;
