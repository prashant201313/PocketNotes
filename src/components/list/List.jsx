import React, { useState, useEffect } from 'react';
import './list.css'
import GroupList from './groupList/GroupList';
import AddGroup from './groupList/addGroup/AddGroup';

export default function List({ setSelectedGroup, selectedGroup }) {
  const [addMode, setAddMode] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups'));
    if (storedGroups) {
      setGroups(storedGroups);
    }
  }, []);

  const addGroup = (group) => {
    const updatedGroups = [...groups, group];
    setGroups(updatedGroups);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    setAddMode(false);
  };

  return (
    <div className='list'>
      <h2>Pocket Notes</h2>
      <div className='addMore'>
        <img src={addMode ? "./minus.png" : "./plus.png"} alt="plus" onClick={() => setAddMode((prev) => !prev)} />
        <p>Create Notes Group</p>
      </div>

      <div>
        <GroupList 
          groups={groups} 
          setSelectedGroup={setSelectedGroup} 
          selectedGroup={selectedGroup} 
        />
        {addMode && <AddGroup addGroup={addGroup} />}
      </div>
    </div>
  );
}