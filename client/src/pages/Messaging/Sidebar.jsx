import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiSearchAlt2 } from 'react-icons/bi';

const Sidebar = ({ chats, activeChat, setActiveChat }) => {
    console.log(chats)
    return (
        <div className="fixed  h-screen sm:w-[20%] w-[30%] bg-white border-r border-gray-300 overflow-y-auto">
            <div className='sm:py-4 sm:px-4 py-4 px-1 flex justify-between'>
                <h2 className="font-bold text-[#0062FF]">Message</h2>
                <div className='flex'>
                    <AiOutlineEdit color='grey' size={25} className='rounded-full p-1 cursor-pointer bg-chat-select mr-1' />
                    <BiSearchAlt2 color='grey' size={25} className='rounded-full p-1 cursor-pointer bg-chat-select' />
                </div>
            </div>
            <div className="flex flex-col">
                {chats.map((chat, index) => (
                    <div
                    key={index}
                    className={`p-4 cursor-pointer ${activeChat === index ? 'bg-chat-select' : ''}`}
                    onClick={() => setActiveChat(index)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    src={chat.avatar}
                                    alt={chat.name}
                                    className="sm:w-8 sm:h-8 w-0 h-0 rounded-full mr-3"
                                />
                                <div>
                                    <div className="font-bold">{chat.name}</div>
                                    <div className="text-sm text-gray-500">{chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : 'No messages yet'}</div>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">{chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].time : ''}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
