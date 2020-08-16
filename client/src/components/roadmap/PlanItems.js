import React, { useState, useEffect, useContext } from 'react';
import ChildPlan from './ChildPlan';
import Moment from 'react-moment';
import moment from 'moment';
import RoadmapContext from '../../context/roadmap/roadmapContext';

const PlanItems = ({ roadmap }) => {
  const roadmapContext = useContext(RoadmapContext);
  const { addChildPlan } = roadmapContext;

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
      addChildPlan(child);

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

  return (
    <div className='rd-items'>
      <div className='rm-title'>
        <div>
          {roadmap.title} <i className='fas fa-th-list' onClick={handleClick} />
        </div>

        {childActive && (
          <ol>
            {roadmap.childPlans &&
              roadmap.childPlans.map((childPlan) => (
                <ChildPlan childPlan={childPlan} key={childPlan.id} />
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
    </div>
  );
};

export default PlanItems;
