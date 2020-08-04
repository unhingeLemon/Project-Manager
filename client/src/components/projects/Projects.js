import React, { useContext, useEffect, useState } from 'react';
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

    // eslint-disable-next-line
  }, [project]);

  return (
    <div>
      <CreateProject />

      {projects && <div className='project-header'>Your Projects</div>}

      <div className='cards-projects-container'>
        {projects &&
          projects.map((project) => (
            <ProjectItem project={project} key={project._id} />
          ))}
      </div>

      {invProjects && <div className='project-header'>Shared to you</div>}
      <div className='cards-projects-container'>
        {invProjects &&
          invProjects.map((invProject) => (
            <ProjectItem project={invProject} key={invProject._id} />
          ))}
      </div>
    </div>
  );
};

export default Projects;
