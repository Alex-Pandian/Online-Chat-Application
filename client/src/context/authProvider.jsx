import React, { createContext, useState, useEffect } from 'react';
import { checkAuth } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await checkAuth();
        setUser(res.user);
      } catch (err) {
        console.log('Session invalid or expired');
        setUser(null); // or redirect to login
      }
      finally{
        setLoading(false);
      }
    };
  
    fetchUser();
  }, []);
  
  if (loading) return <div>Loading...</div>; // ⬅️ Prevent redirect until done

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};