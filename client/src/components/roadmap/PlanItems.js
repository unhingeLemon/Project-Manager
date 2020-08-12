import React, { useState } from 'react';

const PlanItems = ({ roadmap }) => {
  const [childActive, setChildActive] = useState(false);
  const handleClick = () => {
    if (childActive) {
      setChildActive(false);
    } else {
      setChildActive(true);
    }
  };

  return (
    <div className='rd-items'>
      <div className='rm-title'>
        <div>{roadmap.title}</div>
        <button onClick={handleClick}>btn</button>
        {childActive && (
          <ol>
            {roadmap.childPlans.map((childPlan) => (
              <li key={childPlan.id}>
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
            ))}
          </ol>
        )}
      </div>
      <div>{roadmap.startDate}</div>
      <div>{roadmap.dueDate}</div>
    </div>
  );
};

export default PlanItems;
