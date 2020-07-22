import React, { Fragment, useContext, useEffect } from 'react';
import Ripple from './Ripple.svg';
import AuthContext from '../../context/auth/authContext';

const Loading = () => {
  const authContext = useContext(AuthContext);

  const { loading } = authContext;
  useEffect(() => {}, [loading]);

  return (
    <Fragment>
      <img
        className='ripple'
        src={Ripple}
        alt='...'
        draggable='false'
        style={{ display: `${loading ? 'block' : 'none'}` }}
      />
    </Fragment>
  );
};

export default Loading;
