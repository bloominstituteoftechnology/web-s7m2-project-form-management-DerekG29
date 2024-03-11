import React, { useState } from 'react';

let id = 0;
const createID = () => id++;

const initialTeam = [
  { id: createID(), fname: 'Alice', lname: 'Smith', bio: 'Passionate about front-end development and user experience. I love creating intuitive and visually appealing web interfaces.' },
  { id: createID(), fname: 'Bob', lname: 'Johnson', bio: 'Aspiring web developer with a background in graphic design. I enjoy bringing creativity and aesthetics to the digital world.' }
]

const initialValues = { fnameInput: '', lnameInput: '', bioInput: '' };

export default function App() {
  const [formValues, setFormValues] = useState(initialValues);
  const [teamMembers, setTeamMembers] = useState(initialTeam);
  const [editing, setEditing] = useState(false);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    setTeamMembers(teamMembers.concat([{
      id: createID(), 
      fname: formValues.fnameInput,
      lname: formValues.lnameInput,
      bio: formValues.bioInput
     }]))
    setFormValues(initialValues);
    setEditing(false);
  }

  const enableEdit = (id) => {
    if (!editing) setEditing(true);
  }

  return (
    <div>
      <div id='membersList'>
        <h2>Team Members</h2>
        <div>
          {teamMembers.map(member => {
            return (
              <div key={member.id} className='member'>
                <div>
                  <h4>{member.fname} {member.lname}</h4>
                  <p>{member.bio}</p>
                </div>
                <button onClick={() => enableEdit(member.id)}>Edit</button>
              </div>
            );
          })}
        </div>
      </div>
      <div id='membersForm'>
        <h2>{editing ? "Edit" : "Add"} a Team Member</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='fnameInput'>First Name</label>
            <input 
              id='fnameInput'
              name='fnameInput'
              type='text'
              placeholder='Type First Name'
              value={formValues.fnameInput}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor='lnameInput'>Last Name</label>
            <input 
              id='lnameInput'
              name='lnameInput'
              type='text'
              placeholder='Type Last Name'
              value={formValues.lnameInput}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor='bioInput'>Type Bio</label>
            <textarea
              id='bioInput'
              name='bioInput'
              type='text'
              placeholder='Type Bio'
              value={formValues.bioInput}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <input type='submit' />
          </div>

        </form>
      </div>
    </div>
  );
}

