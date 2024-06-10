import React from 'react';
import './front.css'

export default function Front() {
  return (
    <div className='front'>
      <div className='advertisement'>
        <img src="./bg.png" alt="background" />
        <p>Pocket Notes</p>
        <div className='intro'>
            <p>Send and receive messages without keeping your phone online.</p>
            <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
        </div>
      </div>

      <footer>
        <img src="./encryption.png" alt="encryption" />
        <span>end-to-end encrypted</span>
      </footer>
    </div>
  );
}