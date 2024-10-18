import errorImage from '../assets/404-error.png';
import rmbpLogo from '../assets/logo.svg'

const NotFound = () => {
  return (
    <div className="flex flex-col h-screen bg-olive text-center text-[#fff]">
      <header className="relative">
      <div className="flex items-center justify-between p-4">        
        <img
          src={rmbpLogo}
          alt="RMBP AI Logo"
          className="h-12"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#fff] opacity-40 blur-sm"></div>
    </header>
      <div className="flex-grow flex flex-col justify-center items-center p-4">
        <img 
          src={errorImage} 
          alt="404 Error" 
          className="w-[80%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        />
      </div>
    </div>
  );
};

export default NotFound;
