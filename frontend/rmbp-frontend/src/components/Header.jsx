import { Settings, LogOut } from 'lucide-react';
import rmbpLogo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem("token");
    navigate("/");
}

  // Function to refresh the page
  const refreshPage = () => {
    navigate('/chat');
  };

  const goToSettings = () => {
    navigate('/settings')
  }

  return (
    <header className="relative">
      <div className="flex bg-olive items-center justify-between p-4">
        
        {/* Logo Button */}
        <img
          src={rmbpLogo}
          alt="RMBP AI Logo"
          className="ml-8 h-12 cursor-pointer"
          onClick={refreshPage}
        />
        
        <span className='flex mr-4'>
        {/* Settings Button */}
        <Settings className="w-6 h-6 mr-4 text-white cursor-pointer" onClick={goToSettings} />

        {/*Sign out */}
        <LogOut className='text-[#fff] cursor-pointer  ' onClick={signout}/>
        </span>
      
      </div>


    </header>
  );
};

export default Header;
