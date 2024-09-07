import React, { useState, useEffect } from 'react';
import ChatScreen from './ChatScreen';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useUser } from "../../context/UserContext";

function MainScreen({ socket }) {
  const [chats, setChats] = useState([]); 
  const [activeChat, setActiveChat] = useState(0);
  const [cookies] = useCookies(['x-auth-token']);
  const token = cookies['x-auth-token']; // Use token for authentication
  const { isUser } = useUser(); // Fetch user context

  useEffect(() => {
    if (!isUser || !isUser._id) {
      // Return early if isUser is not defined yet
      return;
    }

    // Fetch all chats associated with the current user (whether they are a student or teacher)
    const fetchChats = async () => {
      try {
        const userId = isUser._id; 
        const response = await axios.get(`http://localhost:5000/api/test-series/chat/${userId}`, {
          headers: {
            'x-auth-token': token, 
          },
        });

        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();

    if (socket) {
      // Join the active chat room
      if (chats[activeChat]) {
        socket.emit('joinRoom', { chatID: chats[activeChat].chatID });
      }

      // Listen for incoming messages
      socket.on('receiveMessage', (message) => {
        setChats(prevChats => {
          const updatedChats = [...prevChats];
          updatedChats[activeChat].chat.push({
            message: message.message,
            senderID: message.senderID,
            time: new Date(message.time).toLocaleTimeString(),
          });
          return updatedChats;
        });
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [socket, activeChat, chats, token, isUser]);

  // Early return if isUser is not available yet
  if (!isUser || !isUser._id) {
    return <div>Loading...</div>; // or a loader/spinner component
  }

  return (
    <div className="flex h-screen">
      <Sidebar chats={chats} activeChat={activeChat} setActiveChat={setActiveChat} />
      {chats.length > 0 && <ChatScreen chat={chats[activeChat]} socket={socket} userID={isUser._id} />}
    </div>
  );
}

export default MainScreen;
