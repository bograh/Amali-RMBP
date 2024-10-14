import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import LoginComponent from './components/LoginComponent';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginComponent />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}; 
export default App