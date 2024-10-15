<<<<<<< HEAD
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rmbpLogo from '../assets/logo.svg';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

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
      const response = await fetch('http://16.171.19.134:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, password_confirm: passwordConfirm }),
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center mb-8">
        <img src={rmbpLogo} alt="rmbpLogo" className="h-16" />
        <p className="text-gray-600 text-center mt-2">Access to generative AI in your local language</p>
      </div>
      
      <div className="w-full max-w-md bg-teal-100 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-teal-800 mb-6">SIGN UP</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              placeholder="Enter email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              placeholder="Enter password"
              required
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              placeholder="Confirm password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="font-medium text-teal-600 hover:text-teal-500">Log in</a>
        </p>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-teal-100 text-gray-500">OR</span>
            </div>
          </div>
          <button
            onClick={handleGoogleSignUp}
            className="mt-4 w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <img src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google logo" className="w-5 h-5 mr-2" />
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
=======
/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirm, setPasswordConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };
  
    const validateEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email) && !/^\s*$/.test(email); // Check for spaces only
    };
  
    const validatePassword = (password) => {
      return password.length >= 6 && !/^\s*$/.test(password); // Check password length and for spaces only
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      console.log("clicked")  
      try {
        const response = await fetch(
          "http://16.171.19.134:8000/api/signup/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username,email, password,password_confirm})
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Login Failed");
        } 
        
      } catch (err) {
        console.error(err.message || "Login was not successful");
        setLoginError(true);
      } finally {
        setLoading(false);
      }
    };
  
   
  
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  

  return (
    <div>
        <form className="" onSubmit={handleSubmit}>

          <h1>SIGNUP</h1>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <input type="password" value={password_confirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder='Confirm Password' />
            <button type="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? "Loading..." : "Sign Up"}
            </button>
        </form>
    </div>
  )
}

export default Signup
>>>>>>> dfde2d2f9c7b4a2066849b79435b2c0ead4318d4
