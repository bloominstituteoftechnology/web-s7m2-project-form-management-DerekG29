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

  const getMember = id => {
    return { ...teamMembers.find(member => member.id === id) };
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    const { fnameInput, lnameInput, bioInput } = formValues;
    if (editing !== false) {
      const memberList = [...teamMembers];
      memberList.forEach(member => {
        if (member.id === editing) {
          member.fname = fnameInput;
          member.lname = lnameInput;
          member.bio = bioInput
        }
        setTeamMembers([...memberList]);
      })
      setEditing(false);
    } else {
      setTeamMembers(teamMembers.concat([{
        id: createID(),
        fname: fnameInput,
        lname: lnameInput,
        bio: bioInput
      }]))
    }
    setFormValues(initialValues);
  }

  const edit = id => {
    setEditing(id);
    const selectedMember = getMember(id);
    const { fname, lname, bio } = selectedMember;
    setFormValues({ fnameInput: fname, lnameInput: lname, bioInput: bio });
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
        <h2>{editing !== false ? "Edit" : "Add"} a Team Member</h2>
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
              required
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
              required
            />
          </div>
          <div>
            <label htmlFor='bioInput'>Bio</label>
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

