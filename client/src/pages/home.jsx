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

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate('/');
  };
  console.log(user);

  return (
    <div>
      <Header user={user}/>
      <div className='flex flex-row w-full h-[calc(100vh-4rem)]'>
        <SideBar/>
        <ChatSpace/>
      </div>
    </div>
  );
};

export default Home;