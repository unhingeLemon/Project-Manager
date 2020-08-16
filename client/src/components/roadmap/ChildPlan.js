import React, { useState, useEffect, useContext } from 'react';
import RoadmapContext from '../../context/roadmap/roadmapContext';

const ChildPlan = ({ childPlan, selected }) => {
  const { roadmapContext } = useContext(RoadmapContext);

  //eslint-disable-next-line
  const [childPlanS, setChildPlan] = useState(childPlan);
  console.log(childPlan);
  useEffect(() => {
    setChildPlan(childPlan);
  }, [childPlan]);
  const onClick = (e) => {
    if (e.target.classList.contains('childplan-container')) {
      console.log(childPlan._id);
    }
  };
  return (
    <li onClick={onClick} className='childplan-container'>
      {childPlan.title}
      <input
        type='checkbox'
        defaultChecked={childPlan.checked}
        onChange={() => {
          console.log(childPlan.checked);
          if (childPlan.checked) {
            childPlan.checked = false;
          } else {
            childPlan.checked = true;
          }
        }}
      />
    </li>
  );
};

export default ChildPlan;
