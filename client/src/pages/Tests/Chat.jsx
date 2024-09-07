import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, List, Avatar, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useCookies } from "react-cookie"; // Import useCookies to retrieve the token

const { Text } = Typography;

const Chat = ({ socket, testId, teacherID, studentID }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [cookies] = useCookies(['x-auth-token']); // Retrieve the token from cookies
  const token = cookies['x-auth-token']; // Store the token

  useEffect(() => {
    // Fetch previous chat history
    const fetchPreviousChat = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/test-series/chat/${studentID}/${teacherID}`, {
          headers: {
            'x-auth-token': token, // Use token from cookies
          },
        });
        setMessages(response.data); // Set previous messages
      } catch (error) {
        console.error("Error fetching previous chat:", error);
      }
    };

    fetchPreviousChat();

    if (socket) {
      // Join the chat room for the specific test series
      socket.emit('joinRoom', { chatID: `${studentID}-${teacherID}` });

      // Listen for incoming messages
      socket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      // Cleanup on unmount or when the socket/testId changes
      return () => {
        socket.off('receiveMessage');
        socket.emit('leaveRoom', { chatID: `${studentID}-${teacherID}` });
      };
    }
  }, [socket, testId, teacherID, studentID]);

  useEffect(() => {
    // Scroll to the bottom when new messages are received
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() && socket) {
      // Send the message to the server
      socket.emit('sendMessage', { userID: studentID, teacherID, message: inputMessage });

      // Clear the input after sending
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <List
        className="flex-grow overflow-auto"
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={(item) => (
          <List.Item
            className={`${
              item.senderID === studentID
                ? 'text-right bg-blue-50 ml-auto' // Right align messages from the current user (student)
                : 'text-left bg-gray-200 mr-auto' // Left align messages from the other user
            } px-4 py-2 rounded-lg shadow-sm mb-2 max-w-xs`}
          >
            <List.Item.Meta
              avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.senderID}`} />}
              title={<Text strong>{item.senderID === studentID ? 'You' : 'User'}</Text>}
              description={item.message}
            />
            <div>{new Date(item.time).toLocaleTimeString()}</div>
          </List.Item>
        )}
      />
      <div ref={messagesEndRef} />
      <div className="flex items-center mt-4">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onPressEnter={handleSendMessage}
          placeholder="Type a message..."
          className="flex-grow"
        />
        <Button
          type="primary"
          onClick={handleSendMessage}
          icon={<SendOutlined />}
          className="ml-2"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
