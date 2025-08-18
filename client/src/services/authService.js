import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true, // Important for httpOnly cookies
});

export const login = async (email, password) => {
    const res = await api.post('/login', { email, password });
    return res.data;
};

export const register = async (firstName, fullName, email, password) => {
    const res = await api.post('/register', { firstName, fullName, email, password });
    return res.data;
};

export const checkAuth = async () => {
    const res = await api.get('/getUser');
    return res.data;
};

export const logout = async () => {
    await api.post('/logout');
};