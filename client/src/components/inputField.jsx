import React, { useState } from 'react';
import { sendMessage } from '../services/chatService';
import { useAuth } from '../hooks/useAuth';
import { socket } from '../services/socket';
import EmojiPicker from 'emoji-picker-react';

const InputField = ({ chatId }) => {
  const [content, setContent] = useState('');
  const [showEmoji, setShowEmoji] = useState(false); // 👈 for emoji popup
  const { user } = useAuth();

  const handleSend = async () => {
    if (!content.trim()) return;
    setShowEmoji(false);

    try {
      const message = await sendMessage(chatId, content);
      socket.emit('sendMessage', message);
      setContent('');
    } catch (err) {
      console.error('Send failed:', err);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setContent((prev) => prev + emojiData.emoji); // 👈 add emoji to text
  };

  return (
    <div className="w-full flex flex-col p-2">
      {/* Input row */}
      <div className="flex items-center gap-2 mt-2">
        {/* Emoji toggle button */}
        <button
          onClick={() => setShowEmoji(!showEmoji)}
          className="text-2xl px-2"
        >
          😊
        </button>

        {/* Message input */}
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="rounded-full h-12 flex-1 border border-gray-700 p-4 bg-gray-800 text-white focus:outline-none focus:border-gray-500"
          placeholder="Type a message..."
        />

        {/* Send button */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-#9C27B0-500 cursor-pointer hover:text-#9C27B0-400"
          fill="currentColor"
          viewBox="0 0 24 24"
          onClick={handleSend}
        >
          <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
        </svg>
      </div>

      {/* Emoji Picker (popup below input) */}
      {showEmoji && (
        <div className="absolute bottom-16 left-4 bg-white rounded-lg shadow-lg z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default InputField;