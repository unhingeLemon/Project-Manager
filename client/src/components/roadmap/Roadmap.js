import React from 'react';
import Sidebar from '../layout/Sidebar';
import PlanItems from './PlanItems';

const Roadmap = () => {
  const roadmaps = [
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
  ];

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

            {roadmaps.map((roadmap) => (
              <PlanItems roadmap={roadmap} key={roadmap.id} />
            ))}

            <div className='creater-roadmap'>+ Create a plan</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
