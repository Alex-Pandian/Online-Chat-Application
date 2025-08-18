import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from "./pages/login";
import Register from './pages/register';
import Home from './pages/home';
import ProtectedRoute from './components/protectedRoute';
import NotFound from './pages/notFound';
import useAxiosInterceptor from './hooks/useAxiosInterceptor';

const App = () => {
  useAxiosInterceptor();
  return <>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/home' element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        } />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
  </>
}

export default App;