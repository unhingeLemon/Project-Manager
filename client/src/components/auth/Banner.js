import React from 'react';

const Banner = () => {
  return (
    <div className='banner-container'>
      <div className='brand-container'>
        <i className='fas fa-bug main-icon' />
        <div className='brand-name'>Project Manager</div>
      </div>

      <div className='quote-container'>
        <div className='quote'>
          A place where you can keep track of your projects and work with other
          people with it.
        </div>
        <div className='quote-author'>- me</div>
      </div>
    </div>
  );
};

export default Banner;
