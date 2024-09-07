import React, { useState } from "react";
import ChatScreen from "./ChatScreen";
import Sidebar from "./Sidebar";
import { useUser } from "../../context/UserContext";

function MainScreen({ socket }) {
  const [activeChat, setActiveChat] = useState(0);
  const { isUser } = useUser();

  if (!isUser || !isUser._id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        userID={isUser._id}
      />
      <ChatScreen
        socket={socket}
        activeChat={activeChat}
        userID={isUser._id}
      />
    </div>
  );
}

export default MainScreen;
