import { BrowserRouter, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import Login from './pages/Login';
import ChatPage from './pages/Chat';
import Settings from './pages/Settings';
import Signup from './pages/Signup';
=======
import Signup from './pages/Signup';
import LoginComponent from './components/LoginComponent';
import './App.css';
>>>>>>> dfde2d2f9c7b4a2066849b79435b2c0ead4318d4

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={<ChatPage/>} />
        <Route path='/settings' element={<Settings/>} />
=======
        <Route path='/' element={<LoginComponent />} />
>>>>>>> dfde2d2f9c7b4a2066849b79435b2c0ead4318d4
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}; 
export default App