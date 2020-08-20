import React, { useState, useEffect, useContext } from 'react';
import RoadmapContext from '../../context/roadmap/roadmapContext';

const ChildPlan = ({ childPlan }) => {
  const roadmapContext = useContext(RoadmapContext);
  const { updateChildPlan, deleteChildPlan } = roadmapContext;
  //eslint-disable-next-line

  useEffect(() => {}, [childPlan]);

  const [showChildPlanInfo, setshowChildPlanInfo] = useState(false);

  const [newchildPlan, setnewchildPlan] = useState(childPlan);
  const onChangeEdit = (e) => {
    setnewchildPlan({ ...newchildPlan, [e.target.name]: e.target.value });
  };
  const onClickChildPlan = (e) => {
    console.log(e.target.classList.contains('childplan-container'));
    if (e.target.classList.contains('childplan-container')) {
      showChildPlanInfo
        ? setshowChildPlanInfo(false)
        : setshowChildPlanInfo(true);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(newchildPlan);

    updateChildPlan(childPlan._id, newchildPlan);
    setshowChildPlanInfo(false);
  };

  const onDelete = () => {
    deleteChildPlan(childPlan._id);
    setshowChildPlanInfo(false);
  };
  return (
    <li onClick={onClickChildPlan} className='childplan-container'>
      <input
        className='checkmark'
        type='checkbox'
        defaultChecked={childPlan.checked}
        onChange={() => {
          console.log(childPlan.checked);
          if (childPlan.checked) {
            newchildPlan.checked = false;
            updateChildPlan(childPlan._id, newchildPlan);
          } else {
            newchildPlan.checked = true;
            updateChildPlan(childPlan._id, newchildPlan);
          }
        }}
      />

      {childPlan.title}
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
              onSubmit={onSubmit}
            >
              <p>EDIT THIS SUB-PLAN</p>
              <i className='fas fa-trash' onClick={onDelete}></i>
              <label>
                <div>TITLE</div>
                <input
                  type='text'
                  name='title'
                  onChange={onChangeEdit}
                  value={newchildPlan.title}
                  required
                />
              </label>
              <label>
                <div>DESCRIPTION</div>
                <textarea
                  value={newchildPlan.description}
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
