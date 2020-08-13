import React, { useState, useEffect } from 'react';

const ChildPlan = ({ childPlan }) => {
  const [childPlanS, setChildPlan] = useState(childPlan);

  useEffect(() => {
    setChildPlan(childPlan);
  }, [childPlan]);

  return (
    <li>
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
