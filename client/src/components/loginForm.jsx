import { Link } from "react-router-dom";

const LoginForm = () => {
    return (
      <div className="inline-flex flex-col bg-amber-50 text-black p-4 rounded-md shadow-2xl items-center shadow-gray-950 ">
        <div className="flex flex-row justify-around gap-3">
            <svg width="50" height="50" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M38 16a18 18 0 1 0 0 32" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M30 32h24" stroke="black" stroke-width="4" stroke-linecap="round"/>
                <path d="M46 24l8 8-8 8" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h1 className="text-3xl font-semibold mb-4 mt-2 text-blue-950">Login</h1>
        </div>
        <form className="text-[18px] space-y-2 font-light inline-flex flex-col justify-center">
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
  