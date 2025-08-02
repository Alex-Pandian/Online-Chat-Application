import { Link } from "react-router-dom";

const RegisterForm = () => {
    return (
      <div className="inline-flex flex-col bg-amber-50 text-black p-4 rounded-md shadow-2xl items-center shadow-gray-950 ">
        <div className="flex flex-row justify-around gap-3">
            <svg width="50" height="50" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="20" r="8" stroke="black" stroke-width="4" />
                <path d="M16 48c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="black" stroke-width="4" stroke-linecap="round" />
                <line x1="48" y1="20" x2="48" y2="32" stroke="black" stroke-width="4" stroke-linecap="round"/>
                <line x1="42" y1="26" x2="54" y2="26" stroke="black" stroke-width="4" stroke-linecap="round"/>
            </svg>

            <h1 className="text-3xl font-semibold mb-4 mt-2 text-blue-950">Register</h1>
        </div>
        <form className="text-[18px] space-y-1 font-light inline-flex flex-col justify-center">
            <div className="flex flex-row justify-between gap-3 p-3">
                <label className="p-2">First Name</label>
                <input
                type="text"
                placeholder="first name"
                className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-row justify-between gap-3 p-3">
                <label className="p-2">Full Name</label>
                <input
                type="text"
                placeholder="full name"
                className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-row justify-between gap-3 p-3">
                <label className="p-2">Email</label>
                <input
                type="text"
                placeholder="email"
                className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-row justify-between gap-3 p-3">
                <label className="p-2">Password</label>
                <input
                type="password"
                placeholder="password "
                className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-row justify-between gap-3 p-3">
                <label className="p-2">Confirm Password</label>
                <input
                type="password"
                placeholder="confirm password "
                className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
  