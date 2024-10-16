import errorImage from '../assets/404-error.png'

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-olive text-center p-4">
      <img 
        src={errorImage} 
        alt="404 Error" 
        className="w-[80%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      />
    </div>
  );
};

export default NotFound;
