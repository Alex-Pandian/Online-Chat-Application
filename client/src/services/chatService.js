import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true, // Important for httpOnly cookies
});

export const getOrCreateChat = async (recipientId) => {
    const res = await api.post('/chat', { recipientId });
    return res.data;
  };

export const getUsers = async () => {
    const res = await api.get('/getUsers');
    console.log('received');
    return res.data;
}

export const sendMessage = async (chatId, content) => {
    const res = await api.post('/message', { chatId, content });
    return res.data;
  };
  
  // Optional: if you're using this too
  export const getMessages = async (chatId) => {
    const res = await api.get(`/message/${chatId}`);
    return res.data;
  };
  