import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, List, Avatar, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Chat = ({ socket, testId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', { chatID: testId });

      socket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off('receiveMessage');
        socket.emit('leaveRoom', { chatID: testId });
      };
    }
  }, [socket, testId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() && socket) {
      socket.emit('sendMessage', { chatID: testId, message: inputMessage });
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <List
        className="flex-grow overflow-auto mb-4"
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.senderID}`} />}
              title={<Text strong>{item.senderID}</Text>}
              description={item.message}
            />
            <div>{new Date(item.time).toLocaleTimeString()}</div>
          </List.Item>
        )}
      />
      <div ref={messagesEndRef} />
      <div className="flex mt-auto">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onPressEnter={handleSendMessage}
          placeholder="Type a message..."
        />
        <Button type="primary" onClick={handleSendMessage} icon={<SendOutlined />}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;