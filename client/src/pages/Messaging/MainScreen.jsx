import React, { useState, useEffect } from 'react';
import ChatScreen from './ChatScreen';
import Sidebar from './Sidebar';
import { notification } from 'antd'; // Ant Design for notifications

const image = "https://th.bing.com/th/id/R.8b167af653c2399dd93b952a48740620?rik=%2fIwzk0n3LnH7dA&pid=ImgRaw&r=0";

function MainScreen({ socket }) {
  const initialChats = [
    {
      name: 'Chat 1',
      avatar: image,
      messages: [
        { text: 'Hello', isSent: true, time: '10:00' },
        { text: 'Hi', isSent: false, time: '10:01' },
      ],
    },
    {
      name: 'Chat 2',
      avatar: image,
      messages: [
        { text: 'Hey', isSent: true, time: '11:30' },
        { text: 'Hey there!', isSent: false, time: '11:32' },
        { text: 'How are you?', isSent: true, time: '11:34' },
        { text: 'I am good, thanks!', isSent: false, time: '11:35' },
      ],
    },
  ];

  const [chats, setChats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(0);
  const [isChatScreenActive, setIsChatScreenActive] = useState(true);

  useEffect(() => {
    if (socket) {
      // Join the active chat room
      socket.emit('joinRoom', { chatID: activeChat });

      // Listen for incoming messages
      socket.on('receiveMessage', (message) => {
        if (isChatScreenActive) {
          // Update chat messages if user is on the chat screen
          const updatedChats = [...chats];
          updatedChats[activeChat].messages.push(message);
          setChats(updatedChats);
        } else {
          // Show notification if user is not on the chat screen
          notification.info({
            message: `New message from ${message.senderID}`,
            description: message.message,
            placement: 'topRight',
          });
        }
      });

      // Clean up the socket listener when component unmounts
      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [socket, activeChat, isChatScreenActive, chats]);

  // Track if user is on the chat screen
  useEffect(() => {
    const handleFocus = () => setIsChatScreenActive(true);
    const handleBlur = () => setIsChatScreenActive(false);

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar chats={chats} activeChat={activeChat} setActiveChat={setActiveChat} />
      <ChatScreen chat={chats[activeChat]} socket={socket} />
    </div>
  );
}

export default MainScreen;
