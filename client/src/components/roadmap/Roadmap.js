import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../layout/Sidebar';
import PlanItems from './PlanItems';
import RoadmapContext from '../../context/roadmap/roadmapContext';
import ProjectContext from '../../context/project/projectContext';

const Roadmap = () => {
  const roadmapContext = useContext(RoadmapContext);
  const projectContext = useContext(ProjectContext);
  const { plans, addPlan, getPlans } = roadmapContext;
  const { project } = projectContext;

  const [addPlanActive, SetAddPlanActive] = useState(false);
  const [newPlan, setNewPlan] = useState({
    project: project._id,
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
      project: project._id,
      title: '',
      checked: false,
    });
  };

  useEffect(() => {
    setNewPlan({
      project: project._id,
      title: '',
      checked: false,
    });
    getPlans(project._id);
  }, [addPlanActive]);

  const onChange = (e) => {
    setNewPlan({ ...newPlan, title: e.target.value });
  };

  return (
    <div className='underNav'>
      <Sidebar />

      <div className='roadmap-container'>
        <div>/ Roadmap</div>
        <div className='roadmap-board'>
          <div>
            <div className='roadmap-header'>
              <div>Plan</div>
              <div>Start Date</div>
              <div>Due Date</div>
            </div>
            {plans &&
              plans.map((plan) => (
                <PlanItems roadmap={plan} key={plan._id} />
              ))}{' '}
            <i
              className='fas fa-plus rm-btn create-plan'
              onClick={addPlanClick}
              style={{ display: `${addPlanActive ? 'none' : 'block'}` }}
            ></i>
            {addPlanActive && (
              <form className='rm-form roadmap-add' onSubmit={addPlanSubmit}>
                <input
                  type='text'
                  placeholder='What needs to be done?'
                  value={newPlan.title}
                  onChange={onChange}
                />
                <button className='rm-submit '>
                  <i className='fas fa-chevron-right'></i>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
