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
  var selected;

  const [childActive, setChildActive] = useState(false);
  const [date, setDate] = useState(null);
  const [date2, setDate2] = useState(null);

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
        console.log('0');
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

  const onChangeDate = (e) => {
    console.log(e.target.value);
    setDate(e.target.value);
    if (date && date2) {
      if (moment(e.target.value).isSameOrAfter(date)) {
        setDate2(e.target.value);
      }
    }
  };
  const onChangeDate2 = (e) => {
    console.log(e.target.value);
    setDate2(e.target.value);
  };

  const onClickPlan = (e) => {
    console.log(e.target.classList.contains('Dsqwe'));
    if (e.target.classList.contains('Dsqwe')) {
      showPlanInfo ? setshowPlanInfo(false) : setshowPlanInfo(true);
    }
  };

  const [newRoadmap, setNewRoadmap] = useState(roadmap);
  const onChangeEdit = (e) => {
    setNewRoadmap({ ...newRoadmap, [e.target.name]: e.target.value });
    let array = roadmap.childPlans;
    let index = array.indexOf({ title: 'wew!ddzvqddd' });
    console.log(array);
    console.log(index);
  };

  const onUpdatePlan = async (e) => {
    e.preventDefault();
    console.log('submitted');
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
          {roadmap.title} <i className='fas fa-th-list' onClick={handleClick} />
        </div>

        {childActive && (
          <ol>
            {roadmap.childPlans &&
              roadmap.childPlans.map((childPlan) => (
                <ChildPlan
                  childPlan={childPlan}
                  key={childPlan._id}
                  selected={selected}
                />
              ))}

            <div className='rd-btn addChild' onClick={onClick}>
              <i className='fas fa-plus'></i> Add
            </div>
            {addChild && (
              <form className='rm-form' onSubmit={onSubmitChild}>
                <input
                  className='rm-form'
                  type='text'
                  onChange={onChangeChild}
                  value={child.title}
                  placeholder='What needs to be done?'
                />
                <button className='rd-btn rm-submit'>
                  <i class='fas fa-chevron-right'></i>
                </button>
              </form>
            )}
          </ol>
        )}
      </div>
      <div className='rm-date'>
        {date && <Moment format='MMMM Do YYYY'>{date}</Moment>}

        <input type='date' onChange={onChangeDate} required='required' />
      </div>
      <div className='rm-date'>
        {date2 && <Moment format='MMMM Do YYYY'>{date2}</Moment>}

        {date && (
          <input
            type='date'
            onChange={onChangeDate2}
            required='required'
            min={date}
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
