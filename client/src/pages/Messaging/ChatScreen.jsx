import React, { useEffect, useState, useRef } from "react";
import { Avatar, List, Input, message } from "antd";
import { BsSend } from "react-icons/bs";
import axios from "axios";
import { useCookies } from "react-cookie";

const ChatScreen = ({ socket, activeChat, userID }) => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [cookies] = useCookies(["x-auth-token"]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchChats();
  }, [userID]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (message) => {
        setMessages((prevMessages) => {
          // Check if the message is already in the list (to avoid duplicates)
          const messageExists = prevMessages.some(
            (msg) => msg.time === message.time && msg.message === message.message
          );
          if (!messageExists) {
            return [...prevMessages, message];
          }
          return prevMessages;
        });
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (chats.length > 0 && activeChat < chats.length) {
      fetchMessages(chats[activeChat].chatID);
    }
  }, [chats, activeChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChats = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/test-series/chat/${userID}`,
        {
          headers: {
            "x-auth-token": cookies["x-auth-token"],
          },
        }
      );
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
      message.error("Failed to load chats. Please try again later.");
    }
  };

  const fetchMessages = async (chatID) => {
    try {
      const [user1, user2] = chatID.split('-');
      const response = await axios.get(
        `http://localhost:5000/api/test-series/chat/${user1}/${user2}`,
        {
          headers: {
            "x-auth-token": cookies["x-auth-token"],
          },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      message.error("Failed to load messages. Please try again later.");
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const currentChat = chats[activeChat];
    if (!currentChat) return;

    const newMessage = {
      message: inputMessage,
      time: new Date().toISOString(),
      senderID: userID,
    };

    // Optimistically update the UI
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Send message to server
    socket.emit("sendMessage", {
      userID: userID,
      teacherID: currentChat.otherUser._id,
      message: inputMessage,
    }, (acknowledgement) => {
      if (acknowledgement.status !== 'ok') {
        // If there's an error, remove the optimistically added message
        setMessages((prevMessages) => prevMessages.filter(msg => msg !== newMessage));
        message.error("Failed to send message. Please try again.");
      }
    });

    setInputMessage("");
  };

  if (chats.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        No chats available
      </div>
    );
  }

  const currentChat = chats[activeChat];

  return (
    <div className="fixed right-0 h-screen sm:w-[63.1%] w-[70%] bg-gray-100 flex flex-col">
      <div className="bg-white p-4 flex items-center">
        <Avatar src={currentChat.avatar} />
        <h2 className="ml-2">
          {currentChat.otherUser?.name || "Unknown User"}
        </h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <List
          dataSource={messages}
          renderItem={(item) => (
            <List.Item
              className={`flex ${
                item.senderID === userID ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  item.senderID === userID ? "bg-blue-300" : "bg-white"
                } shadow-md`}
              >
                {item.message}
                <div className="text-xs text-gray-500">
                  {new Date(item.time).toLocaleTimeString()}
                </div>
              </div>
            </List.Item>
          )}
        />
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 sm:bottom-0 bottom-4 fixed sm:w-[63.1%] w-[70%] bg-gray-100">
        <Input
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onPressEnter={handleSendMessage}
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
