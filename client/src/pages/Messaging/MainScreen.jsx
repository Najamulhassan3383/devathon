import React, { useState } from 'react';
import ChatScreen from './ChatScreen';
import Sidebar from './Sidebar';

const image = "https://th.bing.com/th/id/R.8b167af653c2399dd93b952a48740620?rik=%2fIwzk0n3LnH7dA&pid=ImgRaw&r=0"
function MainScreen() {
  // Replace this with your actual chat data
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
    // Add more chat objects here
  ];

  const [chats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(0);
  return (
    <div className="flex h-screen">
      <Sidebar chats={chats} activeChat={activeChat} setActiveChat={setActiveChat} />
      <ChatScreen chat={chats[activeChat]} />
    </div>
  );
}

export default MainScreen;
