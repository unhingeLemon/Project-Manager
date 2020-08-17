import React, { useState, useEffect, useContext } from 'react';
import RoadmapContext from '../../context/roadmap/roadmapContext';

const ChildPlan = ({ childPlan }) => {
  const { roadmapContext } = useContext(RoadmapContext);

  //eslint-disable-next-line

  console.log(childPlan);
  useEffect(() => {}, [childPlan]);

  const [showChildPlanInfo, setshowChildPlanInfo] = useState(false);

  const [newchildPlan, setnewchildPlan] = useState(childPlan);
  const onChangeEdit = (e) => {
    setnewchildPlan({ ...childPlan, [e.target.name]: e.target.value });
  };
  const onClickChildPlan = (e) => {
    console.log(e.target.classList.contains('childplan-container'));
    if (e.target.classList.contains('childplan-container')) {
      showChildPlanInfo
        ? setshowChildPlanInfo(false)
        : setshowChildPlanInfo(true);
    }
  };
  return (
    <li onClick={onClickChildPlan} className='childplan-container'>
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
      {/* MODAL SHOW INFO OF A CHILD PLAN */}
      {showChildPlanInfo && (
        <div className='modal-bg'>
          <div className='modal'>
            <i
              onClick={() => setshowChildPlanInfo(false)}
              className='fa fa-times-circle closebtn'
              aria-hidden='true'
            ></i>
            <form
              className='create-form update-project-form'
              onSubmit={() => console.log('submited')}
            >
              <p>EDIT THIS SUB-PLAN</p>
              <i
                className='fas fa-trash'
                onClick={() => console.log('deleted!')}
              ></i>
              <label>
                <div>TITLE</div>
                <input
                  type='text'
                  name='title'
                  onChange={onChangeEdit}
                  value={childPlan.title}
                  required
                />
              </label>
              <label>
                <div>DESCRIPTION</div>
                <textarea
                  value={childPlan.description}
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
    </li>
  );
};

export default ChildPlan;
