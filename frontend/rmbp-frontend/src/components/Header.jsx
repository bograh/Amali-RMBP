import { Menu, Settings, X } from 'lucide-react';
import rmbpLogo from '../assets/logo.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

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
      <div className="flex items-center justify-between p-4">
        {/* Menu Button */}
        <Menu className="w-6 h-6 text-white cursor-pointer" onClick={toggleSidebar} />
        
        {/* Logo Button */}
        <img
          src={rmbpLogo}
          alt="RMBP AI Logo"
          className="h-12 cursor-pointer"
          onClick={refreshPage}
        />
        
        {/* Settings Button */}
        <Settings className="w-6 h-6 text-white cursor-pointer" onClick={goToSettings} />
      </div>

      {/* Bottom line effect */}
      <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-white opacity-40 blur-sm"></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-gray-800 shadow-lg transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-white text-lg">Sidebar</h2>
          <X className="w-6 h-6 text-white cursor-pointer" onClick={toggleSidebar} />
        </div>
        <div className="p-4">
          <p className="text-white">Sidebar content goes here.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
