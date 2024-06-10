import React, { useState, useEffect } from 'react'
import './App.css'
import List from './components/list/List'
import Notes from './components/notes/Notes'
import Front from './components/front/Front';

function App() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupNotes, setGroupNotes] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('groupNotes'));

    if (savedNotes) {
      setGroupNotes(savedNotes);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateGroupNotes = (groupName, notes) => {
    const updatedNotes = { ...groupNotes, [groupName]: notes };
    setGroupNotes(updatedNotes);
    localStorage.setItem('groupNotes', JSON.stringify(updatedNotes));
  };

  return (
    <div className='container'>
      {isMobile ? (
        <>
          {!selectedGroup && <List setSelectedGroup={setSelectedGroup} selectedGroup={selectedGroup} />}
          {selectedGroup ? (
            <Notes
              selectedGroup={selectedGroup}
              groupNotes={groupNotes[selectedGroup.groupName] || []}
              updateGroupNotes={updateGroupNotes}
              onBackClick={() => setSelectedGroup(null)}
            />
          ) : (
            !isMobile && <Front />
          )}
        </>
      ) : (
        <>
          <List setSelectedGroup={setSelectedGroup} selectedGroup={selectedGroup} />
          {selectedGroup ? (
            <Notes
              selectedGroup={selectedGroup}
              groupNotes={groupNotes[selectedGroup.groupName] || []}
              updateGroupNotes={updateGroupNotes}
            />
          ) : (
            <Front />
          )}
        </>
      )}
    </div>
  )
}

export default App

