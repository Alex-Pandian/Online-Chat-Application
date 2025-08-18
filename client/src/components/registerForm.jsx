import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const RegisterForm = () => {

    const [ firstName, setFirstName ] = useState('');
    const [ fullName, setFullName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        
        if (!firstName.trim()) {
            newErrors.firstName = 'First name is required';
          } else if (!/^[A-Za-z ]{4,10}$/.test(firstName)) {
            newErrors.firstName = 'First name is invalid';
        }

        if (!fullName.trim()) {
            newErrors.fullName = 'Full name is required';
          } else if (!/^[A-Za-z ]{4,20}$/.test(fullName)) {
            newErrors.fullName = 'Full name is invalid';
        }

        if (!email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = 'Email is invalid';
        }
    
        if (!password.trim()) {
          newErrors.password = 'Password is required';
        } else if (password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        }

        if( !confirmPassword.trim()){
            newErrors.confirmPassword = 'Confirm password is required';
        } else if(password !== confirmPassword){
            newErrors.confirmPassword = 'Password and confirm password must be same';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validate()){
            return;
        }

        try{
            const res = await register(firstName, fullName, email, password);
            alert("Successfully registerd");
            console.log(res);
            navigate('/login');
        }
        catch(error){
            console.error("Error registering : ",error);
        }

    };

    return (
      <div className="inline-flex flex-col bg-amber-50 text-black p-4 rounded-md shadow-2xl items-center shadow-gray-950">
        <div className="flex flex-row justify-around gap-3">
            <svg width="50" height="50" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="20" r="8" stroke="black" strokeWidth="4" />
                <path d="M16 48c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="black" strokeWidth="4" strokeLinecap="round" />
                <line x1="48" y1="20" x2="48" y2="32" stroke="black" strokeWidth="4" strokeLinecap="round"/>
                <line x1="42" y1="26" x2="54" y2="26" stroke="black" strokeWidth="4" strokeLinecap="round"/>
            </svg>

            <h1 className="text-3xl font-semibold mb-4 mt-2 text-blue-950">Register</h1>
        </div>
        <form className="text-[18px] space-y-1 font-light inline-flex flex-col justify-center" onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between gap-3 p-3">
                    <label className="p-2">First Name</label>
                    <input
                    type="text"
                    value={firstName}
                    onChange={(e) => (setFirstName(e.target.value))}
                    placeholder="first name"
                    className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="pr-5 text-[15px] text-red-700 flex flex-row justify-end">
                    {errors.firstName && <span>*{errors.firstName}</span>}
                </div>
            </div>
            
            <div>
                <div className="flex flex-row justify-between gap-3 p-3">
                    <label className="p-2">Full Name</label>
                    <input
                    type="text"
                    value={fullName}
                    onChange={(e) => (setFullName(e.target.value))}
                    placeholder="full name"
                    className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="pr-5 text-[15px] text-red-700 flex flex-row justify-end">{errors.fullName && <span>{errors.fullName}</span>}</div>
            </div>
            <div>
                <div className="flex flex-row justify-between gap-3 p-3">
                    <label className="p-2">Email</label>
                    <input
                    type="text"
                    value={email}
                    onChange={(e) => (setEmail(e.target.value))}
                    placeholder="email"
                    className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="pr-5 text-[15px] text-red-700 flex flex-row justify-end">{errors.email && <span>{errors.email}</span>}</div>
            </div>
            <div>
                <div className="flex flex-row justify-between gap-3 p-3">
                    <label className="p-2">Password</label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => (setPassword(e.target.value))}
                    placeholder="password "
                    className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="pr-5 text-[15px] text-red-700 flex flex-row justify-end">{errors.password && <span>{errors.password}</span>}</div>
            </div>
            <div>
                <div className="flex flex-row justify-between gap-3 p-3">
                    <label className="p-2">Confirm Password</label>
                    <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => (setConfirmPassword(e.target.value))}
                    placeholder="confirm password "
                    className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="pr-5 text-[15px] text-red-700 flex flex-row justify-end">{errors.confirmPassword && <span>{errors.confirmPassword}</span>}</div>
            </div>
            <button
                type="submit"
                className="bg-blue-950 px-3 py-2 rounded-2xl text-white hover:bg-blue-700"
            >
                Register
            </button>
            <span className="font-extralight text-gray-600 p-3">already have an account ? <Link to="/login" className="font-light text-black">login</Link></span>
        </form>
      </div>
    );
  };
  
  export default RegisterForm;
  