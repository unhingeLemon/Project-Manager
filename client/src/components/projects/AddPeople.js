import React, { Fragment, useState, useEffect, useContext } from 'react';
import ProjectContext from '../../context/project/projectContext';

const AddPeople = () => {
  const [isOpen, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  const projectContext = useContext(ProjectContext);
  const { updateProject, project } = projectContext;

  useEffect(() => {
    setEmail('');
  }, [isOpen]);

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = (e) => {
    updateProject(project._id, { users: [...project.users, email] });

    setOpen(false);
    e.preventDefault();
  };

  return (
    <Fragment>
      <div className='btn-container'>
        <button onClick={() => setOpen(true)} className='btn btn-primary'>
          ADD PEOPLE
        </button>
      </div>

      {isOpen ? (
        <div className='modal-bg'>
          <div className='modal'>
            <i
              onClick={() => setOpen(false)}
              className='fa fa-times-circle closebtn'
              aria-hidden='true'
            ></i>

            <form className='create-form' onSubmit={onSubmit}>
              <p>ADD PEOPLE</p>

              <label>
                <div>Email</div>
                <input
                  type='email'
                  name='email'
                  onChange={onChange}
                  value={email}
                  required
                />
              </label>

              <div className='btn-container2'>
                <button className='btn btn-primary'>SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default AddPeople;
