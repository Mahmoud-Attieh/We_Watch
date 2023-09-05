import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import PageHeader from '../page-header/PageHeader';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = io.connect('http://localhost:8000'); // Replace with your server URL

  useEffect(() => {
    // Listen for incoming chat messages
    socket.on('chatMessage', (message) => {
      setMessages([...messages, message]);
    });
    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const handleSendMessage = () => {
    // if (message.trim() !== '') {
      socket.emit('chatMessage', message);
      setMessage('');
    // }
  };

  return (
    <div>
    <PageHeader>
        Login
    </PageHeader>
    <div className='login-page'>

        <div className='left'>
            <div className='logo'>
            <div>
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li style={{color: 'black'}} key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
        style={{backgroundColor: 'white'}}
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
            </div>
        </div>
            </div>
        </div>
);
};

export default Chat;
