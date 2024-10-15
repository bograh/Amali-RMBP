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
    <div className="flex flex-col items-center bg-olive justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center mb-8">
        <img src={rmbpLogo} alt="rmbpLogo" className="h-16" />
        <p className="text-[#fff] text-center mt-2">Access to generative AI in your local language</p>
      </div>
      
      <div className="w-[350px] bg-[#fff] rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold py-3 shadow shadow-olive text-center text-olive mb-6">SIGN UP</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full p-3">
          <div>
            <label htmlFor="username" className="block text-md font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
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
              className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
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
              className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
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
              className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              placeholder="Confirm password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full outline-none text-md flex justify-center p-2 py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-[#fff] bg-olive hover:bg-[#fff] hover:text-[#000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
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