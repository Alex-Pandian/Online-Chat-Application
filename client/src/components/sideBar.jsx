import { useEffect, useState } from "react";
import { getUsers } from "../services/chatService";
import userAvatar from "../assets/default.png";

const SideBar = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const data = await getUsers();
                setUsers(data);
            }
            catch(err){
                console.error('Error fetching users: ', err);
            }
        };
        fetchUsers();
    },[]);

    return (
        <div className="basis-[20%] bg-gray-700 text-white shadow-lg">
            <ul>
                {users.map((user)=> (
                    <li key={user._id} className="p-2 shadow-xs shadow-gray-400 rounded-md flex flex-row gap-3">
                        <img src={userAvatar} className='align-top' width={40}/>  
                        <span className="py-2">{user.firstName}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideBar;