import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const [error, setError] = useState('');
  const usernameref = useRef();
  const passwordref = useRef();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = usernameref.current.value;
    const password = passwordref.current.value;
    try {
      const response = await axios.post(
        'http://localhost:5000/user/login',
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,  // Make sure cookies are sent/received
        }
      );
      if (response.status === 200) {
        console.log('You are logged in');
        navigate('/'); 
      } else {
        setError(`Invalid username or password. ${response.data}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed, please try again.');
    }
  };
  return (
    <div className="border-8 border-blue-400 rounded-lg shadow-lg p-8 max-w-md mx-auto my-20 bg-white">
      {error && <h1 className="text-red-500 text-center">{error}</h1>}
      <form onSubmit={handleLogin} method="POST" className="space-y-4">
        <input
          ref={usernameref}
          type="text"
          placeholder="Username"
          className="border border-slate-300 rounded-md text-center w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <input
          ref={passwordref}
          type="password"
          placeholder="Password"
          className="border border-slate-300 rounded-md text-center w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Login
        </button>
        <div className="text-center">
          <Link to="/signup" className="text-blue-500 hover:underline block text-sm">
            Don't have an account? Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;