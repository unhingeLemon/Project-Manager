import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../layout/Sidebar';
import PlanItems from './PlanItems';
import RoadmapContext from '../../context/roadmap/roadmapContext';
import ProjectContext from '../../context/project/projectContext';

const Roadmap = () => {
  const roadmapContext = useContext(RoadmapContext);
  const projectContext = useContext(ProjectContext);
  const { plans, addPlan } = roadmapContext;
  const { project } = projectContext;

  console.log(project._id); // CURRENT ID BIND IT TO ROADMAP

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
      addPlan(newPlan);
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
