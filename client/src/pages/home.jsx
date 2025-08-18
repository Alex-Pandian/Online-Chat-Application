import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome{user?.email ? `, ${user.email}` : 'no email'}</h1>
      <button onClick={handleLogout}>Logout</button>
      {/* Chat UI goes here */}
    </div>
  );
};

export default Home;