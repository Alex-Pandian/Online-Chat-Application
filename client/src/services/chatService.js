import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true, // Important for httpOnly cookies
});

export const getChat = async () => {
    const res = await api.get('/chat');
    return res.data;
};

export const getUsers = async () => {
    const res = await api.get('/getUsers');
    console.log('received');
    return res.data;
}