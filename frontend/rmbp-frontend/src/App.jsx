import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/Chat';
import Settings from './pages/Settings';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Notfound from './pages/Notfound';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={<ChatPage/>} />
        <Route path='/settings' element={<Settings/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}; 
export default App