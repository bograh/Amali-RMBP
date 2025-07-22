/* eslint-disable no-unused-vars */
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import rmbpLogo from '../assets/logo.svg';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passworderror, setPasswordError] = useState(false);
  

  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem("token");
    navigate("/signup");
  }

  const getTokenExpiration = (token) => {
    if (!token) {
        return true; 
    }

    try {
        const decodedPayload = JSON.parse(atob(token.split(".")[1])); 
        if (!decodedPayload.exp) {
            return true;
        }

        const currentDate = Date.now();
        const expiryTime = decodedPayload.exp * 1000; // Convert to ms

        console.log("Current date: " + currentDate, "Expiry: " + expiryTime);

        return currentDate >= expiryTime; // Return true if token is expired
    } catch (error) {
        console.error("Error decoding token:", error);
        return true; // If there's an error, treat the token as expired
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== passwordConfirm) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username" : username, "email" : email, "password" : password, "password_confirm": passwordConfirm }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    console.log('Google Sign-Up clicked');
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token found:", token);

    if (!token || getTokenExpiration(token)) {
        console.log("No token or token expired, logging out...");
        signout();
    } else {
        console.log("Token is valid, setting loading to false.");
        setLoading(false);
        console.log("Loading:", loading);
    }
}, []); 

  return (
    <div className="flex flex-col items-center bg-olive justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center mb-8">
        <img src={rmbpLogo} alt="rmbpLogo" className="h-16" />
        <p className="text-[#fff] text-center mt-2">Access to generative AI in your local language</p>
      </div>
      
      <div className="w-[350px] bg-[#fff] rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold py-3 shadow shadow-sage text-center text-olive mb-6">SIGN UP</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full p-3">
          <div>
            <label htmlFor="username" className="block text-md font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-2 rounded-md outline-none shadow-sm focus:border-sage focus:border"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-md font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 rounded-md outline-none shadow-sm focus:border-sage focus:border"
              placeholder="Enter email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-md font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 rounded-md shadow-sm focus:border-sage focus:border outline-none"
              placeholder="Enter password"
              required
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm" className="block text-md font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-sage focus:border outline-none"
              placeholder="Confirm password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full outline-none text-md flex justify-center p-2 py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-[#fff] bg-sage hover:bg-[#fff] hover:text-olive focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        
        <p className=" text-center text-sm mb-6 text-gray-600">
          Already have an account? <a href="/login" className="underline font-medium text-teal-600 hover:text-teal-500">Log in</a>
        </p>

        <div className="mt-1">
          {/* <div className="relative">
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-teal-100 text-gray-500">OR</span>
            </div>
          </div>
          <button
            onClick={handleGoogleSignUp}
            className="mt-2 mb-4 mx-auto rounded-full px-4 flex justify-center items-center py-2 shadow-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none "
          >
            <img src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google logo" className="w-5 h-5 mr-2" />
            Sign up with Google
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
