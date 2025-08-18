import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { login } from "../services/authService";

const LoginForm = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
	const [ errors, setErrors ] = useState([]);
	const navigate = useNavigate();
	const { setUser } = useAuth();

	const validate = () => {
        const newErrors = {};
        
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
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(!validate()){
			return;
		}

		try{
			const data = await login(email, password);
			setUser(data.user);
			navigate('/home');
		}
		catch(err){
			console.error("Error in login", err);
		}
	};

    return (
      	<div className="inline-flex flex-col bg-amber-50 text-black p-4 rounded-md shadow-2xl items-center shadow-gray-950">
			<div className="flex flex-row justify-around gap-3">
				<svg width="50" height="50" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M38 16a18 18 0 1 0 0 32" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M30 32h24" stroke="black" strokeWidth="4" strokeLinecap="round"/>
					<path d="M46 24l8 8-8 8" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
				<h1 className="text-3xl font-semibold mb-4 mt-2 text-blue-950">Login</h1>
			</div>
        <form className="text-[18px] space-y-2 font-light inline-flex flex-col justify-center" onSubmit={handleSubmit}>
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
			<div className="flex flex-row justify-between gap-3 p-3">
				<label className="p-2">Password</label>
				<input
				type="password"
				value={password}
				onChange={(e)=> (setPassword(e.target.value))}
				placeholder="password "
				className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<button
				type="submit"
				className="bg-blue-950 px-3 py-2 rounded-2xl text-white hover:bg-blue-700"
			>
				login
			</button>
			<span className="font-extralight text-gray-600 p-3">not have an account ? <Link to="/register" className="font-light text-black">register</Link></span>
        </form>
      </div>
    );
  };
  
  export default LoginForm;
  