import React, { useState, useEffect, useContext } from 'react';
import ChildPlan from './ChildPlan';
import Moment from 'react-moment';
import moment from 'moment';
import RoadmapContext from '../../context/roadmap/roadmapContext';

import ProjectContext from '../../context/project/projectContext';

const PlanItems = ({ roadmap }) => {
  const roadmapContext = useContext(RoadmapContext);
  const projectContext = useContext(ProjectContext);
  const { updatePlan, getPlans, deletePlan } = roadmapContext;
  const { project } = projectContext;
  const [newRoadmap, setNewRoadmap] = useState(roadmap);
  const onChangeEdit = (e) => {
    setNewRoadmap({ ...newRoadmap, [e.target.name]: e.target.value });
  };

  const [childActive, setChildActive] = useState(false);
  // const [date, setDate] = useState(null);
  // const [date2, setDate2] = useState(null);

  const handleClick = () => {
    if (childActive) {
      setChildActive(false);
    } else {
      setChildActive(true);
    }
  };
  // FOR PLANS Childs
  // addChild is the form input | couldn't think of a name
  const [addChild, setAddChild] = useState(false);
  const [showPlanInfo, setshowPlanInfo] = useState(false);

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
      if (roadmap.childPlans.length === 0) {
        updatePlan(roadmap._id, { childPlans: [child] });
        getPlans(project._id);
      } else {
        updatePlan(roadmap._id, { childPlans: [...roadmap.childPlans, child] });
        getPlans(project._id);
      }
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

  const onChangeStartDate = (e) => {
    setNewRoadmap(roadmap);
    let temp = roadmap;
    temp.startDate = e.target.value;
    setNewRoadmap(temp);
    updatePlan(roadmap._id, temp);
    if (temp.startDate && temp.dueDate) {
      if (moment(e.target.value).isSameOrAfter(temp.dueDate)) {
        temp.dueDate = e.target.value;
        setNewRoadmap(temp);
        updatePlan(roadmap._id, temp);
      }
    }
  };
  const onChangeDueDate = (e) => {
    let temp = newRoadmap;
    if (moment(e.target.value).isBefore(temp.startDate)) {
      console.log('its before');
    } else {
      temp.dueDate = e.target.value;
      setNewRoadmap(temp);
      updatePlan(roadmap._id, newRoadmap);
    }
  };

  const onClickPlan = (e) => {
    if (e.target.classList.contains('Dsqwe')) {
      showPlanInfo ? setshowPlanInfo(false) : setshowPlanInfo(true);
    }
  };

  const onUpdatePlan = async (e) => {
    e.preventDefault();

    updatePlan(roadmap._id, newRoadmap);
    setshowPlanInfo(false);
  };

  const onDelete = () => {
    deletePlan(roadmap._id);
  };

  return (
    <div className='rd-items'>
      <div className='rm-title Dsqwe' onClick={onClickPlan}>
        {/* Im just using a unique jibirish 
        name to access 2 divs */}

        <div className='Dsqwe'>
          <i className='fas fa-th-list' onClick={handleClick} /> {roadmap.title}
        </div>

        {childActive && (
          <ul>
            {roadmap.childPlans &&
              roadmap.childPlans.map((childPlan) => (
                <ChildPlan childPlan={childPlan} key={childPlan._id} />
              ))}

            <div className='add-child-cont'>
              <i
                className='fas fa-plus rm-btn add-child'
                onClick={onClick}
                style={{ display: `${addChild ? 'none' : 'inline'}` }}
              ></i>
            </div>

            {addChild && (
              <form className='rm-form' onSubmit={onSubmitChild}>
                <input
                  type='text'
                  onChange={onChangeChild}
                  value={child.title}
                  placeholder='What needs to be done?'
                />
                <button className='rm-submit plan-add'>
                  <i className='fas fa-chevron-right'></i>
                </button>
              </form>
            )}
          </ul>
        )}
      </div>
      <div className='rm-date'>
        {newRoadmap.startDate && (
          <Moment format='MMMM Do YYYY'>{newRoadmap.startDate}</Moment>
        )}

        <input
          type='date'
          onChange={onChangeStartDate}
          required='required'
          name='startDate'
        />
      </div>
      <div className='rm-date'>
        {newRoadmap.dueDate && (
          <Moment format='MMMM Do YYYY'>{newRoadmap.dueDate}</Moment>
        )}

        {newRoadmap.startDate && (
          <input
            type='date'
            name='dueDate'
            onChange={onChangeDueDate}
            required='required'
            min={newRoadmap.startDate}
          />
        )}
      </div>

      {/* MODAL SHOW INFO OF A PLAN */}

      {showPlanInfo && (
        <div className='modal-bg'>
          <div className='modal'>
            <i
              onClick={() => setshowPlanInfo(false)}
              className='fa fa-times-circle closebtn'
              aria-hidden='true'
            ></i>
            <form
              className='create-form update-project-form'
              onSubmit={onUpdatePlan}
            >
              <p>EDIT THIS PLAN</p>
              <i className='fas fa-trash' onClick={onDelete}></i>
              <label>
                <div>TITLE</div>
                <input
                  type='text'
                  name='title'
                  onChange={onChangeEdit}
                  value={newRoadmap.title}
                  required
                />
              </label>
              <label>
                <div>DESCRIPTION</div>
                <textarea
                  value={newRoadmap.description}
                  onChange={onChangeEdit}
                  name='description'
                  maxLength='500'
                />
              </label>
              <div className='btn-container2 update-btn'>
                <button className='btn btn-primary'>SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanItems;
