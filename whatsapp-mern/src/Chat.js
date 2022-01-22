import React from 'react';
import "./Chat.css";
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import { Avatar, IconButton } from '@mui/material';

function Chat() {
  return (
  <div className='chat'>
      <div className='chat__header'>
          <Avatar />

          <div className='chat__headerInfo'>
              <h3>Room name</h3>
              <p>Last seen at...</p>
          </div>

          <div className='chat__headerRight'>
              <IconButton>
                    <SearchIcon />
              </IconButton>
              <IconButton>
                    <AttachFileIcon />
              </IconButton>
              <IconButton>
                  <MoreVertIcon />
              </IconButton>
          </div>
      </div>

      <div className='chat__body'>
          <p className='chat__message'>
              <span className='chat__name'>Charles</span>
              
              This is a msg
              
              <span className='chat__timestamp'> {new Date().toUTCString()} </span>
              </p>
              <p className='chat__message chat__receiver'>
              <span className='chat__name'>Charles</span>
              
              nooooo
              
              <span className='chat__timestamp'> {new Date().toUTCString()} </span>
              </p>
              <p className='chat__message'>
              <span className='chat__name'>Charles</span>
              
              This is a msg
              
              <span className='chat__timestamp'> {new Date().toUTCString()} </span>
              </p>

      </div>
      <div className='chat__footer'>
        <EmojiEmotionsIcon />
        <form>
            <input  placeholder='Type a message' type="text"/>
            <button 
            type='submit'>
                Send a message
            </button>
        </form>
        <MicIcon />
      </div>
  </div>
  );
}

export default Chat;
