import React, { useState ,useEffect, useRef } from 'react';
import './notes.css';

export default function Notes({ selectedGroup, groupNotes, updateGroupNotes, onBackClick }) {
  const endRef = useRef(null)

  const [notes, setNotes] = useState(groupNotes);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    setNotes(groupNotes);
  }, [groupNotes]);

  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
  
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
  
    return `${day} ${month} ${year}`;
  };

  const getCurrentTime = () => {
    const date = new Date();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'Pm' : 'Am';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const strTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    return strTime;
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const newNote = {
        text: inputText,
        time: getCurrentTime(),
        date: getCurrentDate()
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      updateGroupNotes(selectedGroup.groupName, updatedNotes);

      setInputText(""); // Clear the textarea after adding the note
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: "smooth"})
  }, [notes])

  return (
    <div className='notes'>
      <div className="top">
        <img src="./backArrow.png" className="back-arrow" alt="back" onClick={onBackClick} />
        <div style={{ backgroundColor: selectedGroup.color }}>{selectedGroup.initials}</div>
        <p>{selectedGroup.groupName}</p>
      </div>

      <div className="center">
      {notes.map((note, index) => (
          <div key={index} className='note-section'>
            <div className='time-date'>
              <p>{note.time}</p>
              <p>{note.date}</p>
            </div>

            <div className='main-note'>
              <p>{note.text}</p>
            </div>
          </div>
        ))}

        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <textarea 
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)} 
          onKeyPress={(e) => e.key === "Enter" && handleSend()} 
          placeholder='Enter your text here.............' 
          name="notes" 
          id="notes" 
          rows={7}
        ></textarea>
        <img src="./send.png" alt="send" onClick={handleSend} />
      </div>
    </div>
  );
}