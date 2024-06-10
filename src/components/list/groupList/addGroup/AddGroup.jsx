import React, { useState } from 'react';
import './addGroup.css';

export default function AddGroup({ addGroup }) {
    const [groupName, setGroupName] = useState('');
    const [color, setColor] = useState('#000000');

    const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

    function getInitials(name) {
        const words = name.split(' ');

        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase();
        } else if (words.length >= 2) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const initials = getInitials(groupName);
        addGroup({ groupName, color, initials });
        setGroupName('');
        setColor('#000000');
    };

    return (
        <div className='addGroup'>
            <p>Create New Notes Group</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Group Name
                    <input 
                        type="text" 
                        placeholder='Enter your group name....' 
                        value={groupName} 
                        onChange={(e) => setGroupName(e.target.value)} 
                        required 
                    />
                </label>

                <div className="color-palette">
                    <p>Choose Color</p>
                    {colors.map((paletteColor) => (
                        <div 
                            key={paletteColor} 
                            className="color-circle" 
                            style={{ backgroundColor: paletteColor }} 
                            onClick={() => setColor(paletteColor)}
                        ></div>
                    ))}
                </div>

                <button type="submit">Create</button>
            </form>     
        </div>
    );
}