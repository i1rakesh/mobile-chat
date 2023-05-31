import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import back from '../assests/Back.png';
import edit from '../assests/edit-05.png';
import dots from '../assests/dots-vertical.png';
import clip from '../assests/paperclip.png';
import send from '../assests/send.png';
import Group from '../assests/Group 5.png';
import Popup from './PopUp';

const ChatScreen = () => {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    loadChats();
    const divElement = divRef.current;
    divElement.scrollTop = divElement.scrollHeight;
  }, []);
  
  const handleButtonClick = () => {
    setShowPopup(prevState => !prevState);
  };

  const loadChats = async () => {
    try {
      const response = await axios.get(`http://3.111.128.67/assignment/chat?page=0`)
      setChats(response.data.chats);
      setUser(response.data);
    
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div  className="chat-screen" >
        <div>
            <div className="top-bar">
            <img src={back} alt="" />
            <h1>{user.name}</h1>
            <img src={edit} alt="" />
            </div>
            <div className='chat-info'>
            <img src={Group} alt="" />
                <div className='about'>
                  
            <h3>
                <span> From</span> {user.from}
            </h3>
            <h3>
               <span> To</span> {user.to}
            </h3>
            </div>
            <img src={dots} alt="" />
            </div>
        </div>
        <div ref={divRef} className='chats'>
      {chats.map(chat => (
        <div  key={chat.id} className="chat-item" >
          <div className="chat-img" style={{ display: chat.sender.self ? 'none' : 'block' }}><img src={chat.sender.image} alt="" /></div>
          <div className="chat-content" style={{ backgroundColor: chat.sender.self ? '#1C63D5' : '#FFFFFF', color: chat.sender.self ? '#FAF9F4' : '#141E0D' }}>{chat.message}</div>
        </div>
      ))}
      {showPopup && <Popup onClose={handleButtonClick} />}
      </div>
      
      <div className='chat-input'>
      <form action="">
        <input type="text"
            name="message"
            placeholder="Enter your message... " />
            <div className='buttons'>
            
            <img onClick={handleButtonClick} src={clip} alt="" />
        <button><img src={send} alt="" /></button>
        </div>
      </form>
    
      </div>
    </div>
  );
};

export default ChatScreen;