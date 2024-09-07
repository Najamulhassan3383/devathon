import React, { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { message } from 'antd';

const Sidebar = ({ activeChat, setActiveChat, userID }) => {
  const [chats, setChats] = useState([]);
  const [cookies] = useCookies(['x-auth-token']);

  useEffect(() => {
    fetchChats();
  }, [userID]);

  const fetchChats = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/test-series/chat/${userID}`,
        {
          headers: {
            'x-auth-token': cookies['x-auth-token'],
          },
        }
      );
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
      message.error('Failed to load chats. Please try again later.');
    }
  };

  return (
    <div className="fixed h-screen sm:w-[20%] w-[30%] bg-white border-r border-gray-300 overflow-y-auto">
      <div className="sm:py-4 sm:px-4 py-4 px-1 flex justify-between">
        <h2 className="font-bold text-[#0062FF]">Messages</h2>
        <div className="flex">
          <AiOutlineEdit
            color="grey"
            size={25}
            className="rounded-full p-1 cursor-pointer bg-chat-select mr-1"
          />
          <BiSearchAlt2
            color="grey"
            size={25}
            className="rounded-full p-1 cursor-pointer bg-chat-select"
          />
        </div>
      </div>
      <div className="flex flex-col">
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`p-4 cursor-pointer ${
              activeChat === index ? "bg-chat-select" : ""
            }`}
            onClick={() => setActiveChat(index)}
          >
            <div className="flex items-center">
              <img
                src={chat.avatar || "https://via.placeholder.com/40"}
                alt={chat.otherUser?.name || "User"}
                className="sm:w-8 sm:h-8 rounded-full mr-3"
              />
              <div className="text-gray-700">
                <div className="font-bold">{chat.otherUser?.name || "Unknown User"}</div>
                <div className="text-sm text-gray-500">
                  {chat.lastMessage?.message || "No messages yet"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
