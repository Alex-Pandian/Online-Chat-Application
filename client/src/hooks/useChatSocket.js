import { useEffect } from 'react';
import { socket } from '../services/socket';

export const useChatSocket = (chatId, onNewMessage) => {
  useEffect(() => {
    if (!chatId) return;

    socket.emit('joinChat', chatId);

    socket.on('newMessage', (msg) => {
      if (msg.chatId === chatId) {
        onNewMessage(msg);
      }
    });

    return () => {
      socket.off('newMessage');
    };
  }, [chatId, onNewMessage]);
};