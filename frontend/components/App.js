import React, { useState, useEffect } from 'react';

let id = 1;
const createID = () => id++;

const initialTeam = [
  { id: createID(), fname: 'Alice', lname: 'Smith', bio: 'Passionate about front-end development and user experience. I love creating intuitive and visually appealing web interfaces.' },
  { id: createID(), fname: 'Bob', lname: 'Johnson', bio: 'Aspiring web developer with a background in graphic design. I enjoy bringing creativity and aesthetics to the digital world.' }
]

const initialValues = { fname: '', lname: '', bio: '' };

export default function App() {
  const [formValues, setFormValues] = useState(initialValues);
  const [teamMembers, setTeamMembers] = useState(initialTeam);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (editing === null) {
      setFormValues(initialValues);
    } else {
      const { fname, lname, bio } = teamMembers.find(member => member.id === editing);
      setFormValues({ fname, lname, bio });
    }
  }, [editing])

  const handleChange = evt => {
    const { id, value } = evt.target;
    setFormValues({ ...formValues, [id]: value });
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    if (editing) {
      updateMember();
    } else {
      addMember();
    }
    setFormValues(initialValues);
    console.log(teamMembers);
  }

  const updateMember = () => {
    setTeamMembers(prevMembers => prevMembers.map(member => {
      if (member.id === editing) {
        return { ...member, ...formValues };
      }
      return member;
    })
    )
    setEditing(null);
  }

  const addMember = () => {
    const newMember = { id: createID(), ...formValues };
    setTeamMembers([...teamMembers, newMember]);
  }

  const edit = id => {
    setEditing(id);
  }

  return (
    <div className='container'>
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
                <button onClick={() => edit(member.id)}>Edit</button>
              </div>
            );
          })}
        </div>
      </div>
      <div id='membersForm'>
        <h2>{editing ? "Edit" : "Add"} a Team Member</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='fname'>First Name</label>
            <input
              id='fname'
              type='text'
              placeholder='Type First Name'
              value={formValues.fname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor='lname'>Last Name</label>
            <input
              id='lname'
              type='text'
              placeholder='Type Last Name'
              value={formValues.lname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor='bio'>Bio</label>
            <textarea
              id='bio'
              type='text'
              placeholder='Type Bio'
              value={formValues.bio}
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
