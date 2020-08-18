import React, { Fragment, useContext } from 'react';
import Ripple from './Ripple.svg';
import AuthContext from '../../context/auth/authContext';
import BugContext from '../../context/bug/bugContext';
import ProjectContext from '../../context/project/projectContext';
import RoadmapContext from '../../context/roadmap/roadmapContext';
const Loading = () => {
  const authContext = useContext(AuthContext);
  const bugContext = useContext(BugContext);
  const projectContext = useContext(ProjectContext);
  const roadmapContext = useContext(RoadmapContext);

  const { loading } = authContext;

  return (
    <Fragment>
      <img
        className='ripple'
        src={Ripple}
        alt='...'
        draggable='false'
        style={{
          display: `${
            loading ||
            bugContext.loading ||
            projectContext.loading ||
            roadmapContext.loading
              ? 'block'
              : 'none'
          }`,
        }}
      />
    </Fragment>
  );
};

export default Loading;
