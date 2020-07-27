import React from 'react';
import ProjectContext from '../../context/project/projectContext';

const ProjectItem = ({ project }) => {
  return <div>{project.title}</div>;
};

export default ProjectItem;
