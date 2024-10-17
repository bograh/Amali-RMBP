import { Settings, X, LogOut } from 'lucide-react';
import rmbpLogo from '../assets/logo.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem("token");
    navigate("/");
}

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to refresh the page
  const refreshPage = () => {
    window.location.reload();
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



      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-[#6f93a8] shadow-lg transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-white mb-[-80px] text-lg">Chats</h2>
          <X className="w-6 h-6 text-white cursor-pointer" onClick={toggleSidebar} />
        </div>
        <div className="p-4">
          <p className="text-white mt-[50px]">Sidebar content goes here.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
