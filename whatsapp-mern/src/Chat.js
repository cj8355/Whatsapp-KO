import React from 'react';
import "./Chat.css";
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import { Avatar, IconButton } from '@mui/material';
import axios from "./axios";

function Chat({ messages }) {
    const [input, setInput] = useState("");
    
    const sendMessage = (e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            "message": input,
            "name": "Demo",
            "timestamp": "timestamp work pls",
            "received":false,
        });

        setInput("");
    };

  return (
  <div className="chat">
      <div className="chat__header">
          <Avatar />

          <div className="chat__headerInfo">
              <h3>Room name</h3>
              <p>Last seen at...</p>
          </div>

          <div className="chat__headerRight">
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

      <div className="chat__body">
          {messages.map((message) => (
          <p 
            className={`chat__message ${message.received && "chat_receiver"}`}>
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp"> {message.timestamp} </span>
            </p>
          ))}
        </div>

      <div className="chat__footer">
        <EmojiEmotionsIcon />
        <form>
            <input value={input} onChange={e => setInput(e.target.value)}
            placeholder="Type a message" type="text" />
            <button onClick={sendMessage} type="submit">
                Send a message
            </button>
        </form>
        <MicIcon />
      </div>
  </div>
  );
}

export default Chat;
