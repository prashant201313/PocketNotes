import React from 'react';
import './groupList.css'

export default function GroupList({ groups, setSelectedGroup, selectedGroup }) {
    return (
        <div className='groupList'>
            {groups.map((group, index) => (
                <div 
                    key={index} 
                    className={`item ${selectedGroup && selectedGroup.groupName === group.groupName ? 'selected' : ''}`} 
                    onClick={() => setSelectedGroup(group)}
                >
                    <div style={{ backgroundColor: group.color }}>{group.initials}</div>
                    <p>{group.groupName}</p>
                </div>
            ))}
        </div>
    );
}