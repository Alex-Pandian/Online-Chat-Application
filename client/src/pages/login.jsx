import logo from '../assets/logo.png';
import LoginForm from '../components/loginForm';

const Login = () => {
    return <div className="text-white font-extrabold text-4xl bg-[url('./assets/loginBG.png')] bg-cover bg-center h-screen">
        <div className='flex flex-row justify-around h-screen'>
            <div className='flex flex-col justify-center items-center gap-5'>
                <img src={logo} className='align-top' width={100}/>
                <h1>Welcome to <br/>Chat Hello !</h1>
            </div>
            <div className='inline-flex flex-col justify-center'><LoginForm/></div>
        </div>
    </div>
}

export default Login;