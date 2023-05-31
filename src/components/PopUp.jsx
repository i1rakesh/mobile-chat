import React from 'react';
import document from '../assests/Document.png';
import icon from '../assests/Icon.png';
import video from '../assests/video.png';
const Popup = ({ onClose }) => {
  return (
    <div className='fixed'>
    <div className="popup">
      <div className="popup-content">
        <img src={document} alt="" />
        <img src={icon} alt="" />
        <img src={video} alt="" />
      </div>
    </div>
    </div>
  );
};

export default Popup;