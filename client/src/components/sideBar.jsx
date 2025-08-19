import { useEffect, useState } from 'react';
import { getUsers, getOrCreateChat } from '../services/chatService';
import userAvatar from '../assets/default.png';
import { useAuth } from '../hooks/useAuth';

const SideBar = ({ onSelectChat, activeUserId }) => {

  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        const filtered = data.filter(u => String(u._id) !== String(user._id));
        setUsers(filtered);
      } catch (err) {
        console.error('Error fetching users: ', err);
      }
    };
    fetchUsers();
  }, []);

  const handleUserClick = async (recipientId) => {
    try {
      const chat = await getOrCreateChat(recipientId);
      onSelectChat(chat._id, recipientId); // 🧠 pass both chatId and userId
    } catch (err) {
      console.error('Chat error:', err);
    }
  };


  return (
    <div className="basis-[20%] bg-gray-700 text-white shadow-lg">
      <ul>
        {users.map((u) => {
          const isActive = String(u._id) === String(activeUserId);
          return (
            <li
              key={u._id}
              className={`p-2 shadow-xs shadow-gray-400 rounded-md flex flex-row gap-3 cursor-pointer hover:bg-gray-600 ${
                isActive ? 'bg-gray-600 font-semibold border-l-4 border-green-400' : ''
              }`}
              onClick={() => handleUserClick(u._id)}
            >
              <img src={userAvatar} width={40} />
              <span className="py-2">{u.firstName}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};


export default SideBar;