import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/Chat';
import Settings from './pages/Settings';
import Signup from './pages/Signup';
import Login from './pages/login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={<ChatPage/>} />
        <Route path='/settings' element={<Settings/>} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}; 
export default App