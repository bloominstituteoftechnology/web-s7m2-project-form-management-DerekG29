import React, { useState } from 'react';

const initialTeam = [
  { fname: 'Alice', lname: 'Smith', bio: 'Passionate about front-end development and user experience. I love creating intuitive and visually appealing web interfaces.' },
  { fname: 'Bob', lname: 'Johnson', bio: 'Aspiring web developer with a background in graphic design. I enjoy bringing creativity and aesthetics to the digital world.' }
]

const initialValues = { fname: '', lname: '', bio: '' };

export default function App() {
  const [formValues, setFormValues] = useState(initialValues);
  const [teamMembers, setTeamMembers] = useState(initialTeam);
  const [editing, setEditing] = useState(false);

  return (
    <div>
      <div id='membersList'>
        <h2>Team Members</h2>
        <div>
          {teamMembers.map((member, idx) => {
            return (
              <div key={idx} className='member'>
                <div>
                  <h4>{member.fname} {member.lname}</h4>
                  <p>{member.bio}</p>
                </div>
                <button>Edit</button>
              </div>
            );
          })}
        </div>
      </div>
      <div id='membersForm'>
        <h2>{editing ? "Edit" : "Add"} a Team Member</h2>
        <form>
          <div>
            <label htmlFor='fnameInput'>First Name</label>
            <input 
              id='fnameInput'
              type='text'
              placeholder='Type First Name'
            />
          </div>

          <div>
            <label htmlFor='lnameInput'>Last Name</label>
            <input 
              id='lnameInput'
              type='text'
              placeholder='Type Last Name'
            />
          </div>

          <div>
            <label htmlFor='bioInput'>Type Bio</label>
            <textarea
              id='bioInput'
              type='text'
              placeholder='Type Bio'
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

