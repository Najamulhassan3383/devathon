import React, { useEffect, useState } from 'react';
import { Avatar, List, Input } from 'antd';
import { BsSend } from 'react-icons/bs';

const ChatScreen = ({ chat, socket, userID }) => {
  const [messages, setMessages] = useState(chat.chat || []);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      message: inputMessage,
      time: new Date().toLocaleTimeString(),
      senderID: userID,
    };

    // Emit the new message via Socket.IO
    socket.emit('sendMessage', {
      userID: chat.userID,
      message: inputMessage,
      teacherID: chat.teacherID,
    });

    setMessages([...messages, newMessage]);

    // Update the local state
    setInputMessage('');
  };

  useEffect(() => {
    setMessages(chat.chat);
  }, [chat.chat]);

  return (
    <div className="fixed right-0 h-screen sm:w-[63.1%] w-[70%] bg-gray-100 flex flex-col">
      <div className="bg-white p-4 flex items-center">
        <Avatar src={chat.avatar} />
        <h2 className="ml-2">{chat.name}</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <List
          dataSource={messages}
          renderItem={(item) => (
            <List.Item className={`flex ${item.senderID === userID ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-2 rounded-lg ${item.senderID === userID ? 'bg-blue-300' : 'bg-white'} shadow-md`}>
                {item.message}
                <div className="text-xs text-gray-500">{item.time}</div>
              </div>
            </List.Item>
          )}
        />
      </div>
      <div className="p-4 sm:bottom-0 bottom-4 fixed sm:w-[63.1%] w-[70%] bg-gray-100">
        <Input
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          addonAfter={
            <button type="button" onClick={handleSendMessage}>
              <BsSend />
            </button>
          }
        />
      </div>
    </div>
  );
};

export default ChatScreen;
