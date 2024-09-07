import React, { useEffect, useState } from 'react';
import { Avatar, List, Input } from 'antd';
import { BsSend } from 'react-icons/bs';

const ChatScreen = ({ chat }) => {
    const [messages, setMessages] = useState(chat.messages);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;
        setMessages([...messages, { text: inputMessage, isSent: true }]);
        setInputMessage('');
    };

    useEffect(() => {
        setMessages(chat.messages);
    }, [chat.messages]);

    return (
        <div className="fixed right-0 h-screen sm:w-[63.1%] w-[70%] bg-gray-100">
            <div className="bg-white p-4 flex items-center">
                <Avatar src={chat.avatar} />
                <h2 className="ml-2">{chat.name}</h2>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
                <List
                    dataSource={messages}
                    renderItem={(item) => (
                        <List.Item className={`flex items-start ${item.isSent ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`p-2 bg-white rounded-lg ${item.isSent ? 'bg-blue-300 ml-auto' : 'bg-white mr-auto'
                                    }`}
                            >
                                {item.text}
                                <div className="text-[10px] text-gray-500">{item.time}</div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
            <div className="p-4 sm:bottom-0 bottom-4 fixed sm:w-[63.1%] w-[70%]">
                <Input
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    addonAfter={
                        <button type="primary" onClick={handleSendMessage}>
                            <BsSend />
                        </button>
                    }
                />
            </div>
        </div>
    );
};

export default ChatScreen;
