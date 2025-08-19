import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import SideBar from '../components/sideBar';
import ChatSpace from '../components/chatSpace';

const Home = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [chatId, setChatId] = useState(null); // 🧠 track selected chat
  const [activeUserId, setActiveUserId] = useState(null);

  const handleSelectChat = (chatId, userId) => {
    setChatId(chatId);
    setActiveUserId(userId);
  };

  console.log(user);
  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate('/');
  };

  return (
    <div>
      <Header user={user} />
      <div className="flex flex-row w-full h-[calc(100vh-4rem)]">
        <SideBar onSelectChat={handleSelectChat} activeUserId={activeUserId} />
        {chatId ? <ChatSpace chatId={chatId} currentUser={user} /> : <div className="flex-1 bg-gray-600 text-white p-6">Select a user to start chatting</div>}
      </div>
    </div>
  );
};

export default Home;