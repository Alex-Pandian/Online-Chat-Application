import logo from '../assets/logo.png';

const Header = ({user}) => {
    return (
        <div className="px-4 py-3 min-h-10 w-full h-16 shadow-md bg-gray-800 flex flex-row justify-between text-white">
            <div className='inline-flex'>
                <img src={logo} className='align-top' width={40}/>
                <span className="text-2xl">Chat Hello !</span>
            </div>
            
            <div className="pr-2 text-[20px]">
                <span>{user.name}</span>
            </div>
        </div>
    );
};

export default Header;