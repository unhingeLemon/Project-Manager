import React, { useContext, useEffect } from 'react';
import ProjectContext from '../../context/project/projectContext';
import AuthContext from '../../context/auth/authContext';
import ProjectItem from './ProjectItem';
import CreateProject from './CreateProject';

const Projects = () => {
  const projectContext = useContext(ProjectContext);
  const authContext = useContext(AuthContext);
  const { getAllProjects, projects, project } = projectContext;

  useEffect(() => {
    authContext.loadUser();
    getAllProjects();
    console.log(projects);
    // eslint-disable-next-line
  }, [project]);

  return (
    <div>
      <h1>PROJECT ROUTE</h1>
      {projects &&
        projects.map((project) => (
          <ProjectItem project={project} key={project._id} />
        ))}
      <CreateProject />
    </div>
  );
};

export default Projects;
