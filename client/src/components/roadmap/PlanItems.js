import React, { useState, useEffect } from 'react';
import ChildPlan from './ChildPlan';

const PlanItems = ({ roadmap }) => {
  const [childActive, setChildActive] = useState(false);
  const handleClick = () => {
    if (childActive) {
      setChildActive(false);
    } else {
      setChildActive(true);
    }
  };
  // FOR PLANS Childs
  const [addChild, setAddChild] = useState(false);
  const [child, setChild] = useState({
    title: '',
    checked: false,
  });

  const onClick = () => {
    if (addChild) {
      setAddChild(false);
    } else {
      setAddChild(true);
    }
  };
  // Adding child
  const onChangeChild = (e) => {
    setChild({
      title: e.target.value,
      checked: false,
    });
  };

  const onSubmitChild = (e) => {
    e.preventDefault();

    if (child.title !== '') {
      roadmap.childPlans.push(child);
      setAddChild(false);
    }
  };

  useEffect(() => {
    setChild({
      title: '',
      checked: false,
    });

    //eslint-disable-next-line
  }, [addChild]);

  return (
    <div className='rd-items'>
      <div className='rm-title'>
        <div>{roadmap.title}</div>
        <button onClick={handleClick}>btn</button>
        {childActive && (
          <ol>
            {roadmap.childPlans.map((childPlan) => (
              <ChildPlan childPlan={childPlan} key={childPlan.id} />
            ))}

            <div style={{ background: 'black' }} onClick={onClick}>
              + Add
            </div>
            {addChild && (
              <form onSubmit={onSubmitChild}>
                <input
                  type='text'
                  onChange={onChangeChild}
                  value={child.title}
                />
                <button>V</button>
              </form>
            )}
          </ol>
        )}
      </div>
      <div>{roadmap.startDate}</div>
      <div>{roadmap.dueDate}</div>
    </div>
  );
};

export default PlanItems;
