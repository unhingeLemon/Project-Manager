import React, { useState, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import PlanItems from './PlanItems';

const Roadmap = () => {
  const [plans, setPlans] = useState([
    {
      id: '1',
      title: 'Sample title',
      startDate: 'November 1 2021',
      dueDate: 'November 1 2021',
      description: 'sdsdsd',
      status: 'INP',
      childPlans: [
        {
          id: '3',
          title: 'do this #1',
          description: 'description',
          checked: true,
        },
        {
          id: '2',
          title: 'do this #2',
          description: 'description',
          checked: false,
        },
        {
          id: '1',
          title: 'do this #3',
          description: 'description',
          checked: false,
        },
      ],
    },
    {
      id: '2',
      title: 'Sample title',
      startDate: 'No23er 1 2021121',
      dueDate: 'Nov23er 1 202331',
      description: 'sdsdsd',
      status: 'INP',
      childPlans: [
        {
          id: '1',
          title: 'do this #1',
          description: 'description',
          checked: true,
        },
        {
          id: '2',
          title: 'do this #2',
          description: 'description',
          checked: false,
        },
        {
          id: '3',
          title: 'do this #3',
          description: 'description',
          checked: false,
        },
      ],
    },
    {
      id: '3',
      title: 'Sample title',
      startDate: 'November 1 23',
      dueDate: 'November 1 203221',
      description: 'sdsdsd',
      status: 'INP',
      childPlans: [
        {
          id: '3',
          title: 'do this #1',
          description: 'description',
          checked: true,
        },
        {
          id: '2',
          title: 'do this #2',
          description: 'description',
          checked: false,
        },
        {
          id: '1',
          title: 'do this #3',
          description: 'description',
          checked: false,
        },
      ],
    },
  ]);

  const [addPlanActive, SetAddPlanActive] = useState(false);
  const [newPlan, setNewPlan] = useState({
    title: '',
    checked: false,
  });

  const addPlanClick = () => {
    addPlanActive ? SetAddPlanActive(false) : SetAddPlanActive(true);
  };

  const addPlanSubmit = (e) => {
    e.preventDefault();

    if (newPlan.title !== '') {
      if (plans.length > 0) {
        console.log(plans);
        console.log(newPlan);
        setPlans([...plans, newPlan]);
        console.log(plans);
      } else {
        setPlans([newPlan]);
      }
    }

    SetAddPlanActive(false);
    setNewPlan({
      title: '',
      checked: false,
    });
  };

  useEffect(() => {
    setNewPlan({
      title: '',
      checked: false,
    });
  }, [addPlanActive]);

  const onChange = (e) => {
    setNewPlan({ ...newPlan, title: e.target.value });
  };

  return (
    <div className='underNav'>
      <Sidebar />

      <div className='roadmap-container'>
        <div>Roadmap for: PROJECT NAME LOL</div>
        <div className='roadmap-board'>
          <div>
            <div className='roadmap-header'>
              <div>Plan</div>
              <div>Start Date</div>
              <div>Due Date</div>
            </div>
            {plans.map((plan) => (
              <PlanItems roadmap={plan} key={plan.id} />
            ))}{' '}
            <div className='creater-roadmap' onClick={addPlanClick}>
              + Create a plan
            </div>
            {addPlanActive && (
              <form onSubmit={addPlanSubmit}>
                <input
                  type='text'
                  placeholder='What needs to be done?'
                  value={newPlan.title}
                  onChange={onChange}
                />
                <button>wew</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
