import React from 'react';
import { Avatar } from '@mui/material';
import "./SidebarChat.css";

function SidebarChat() {
  return <div className='sidebarChat'>
      <Avatar />
      <div className='sidebarChat__info'>
          <h2>Room name</h2>
          <p>Lat message</p>
      </div>
  </div>;
}

export default SidebarChat;
