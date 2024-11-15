
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Signup = () => {
  const usernameref = useRef();
  const fullnameref = useRef();
  const passwordref = useRef();
  const [error, seterror] = useState('');
  const navigate = useNavigate(); 
  const handleSignup = async (e) => {
    e.preventDefault(); 
    const username = usernameref.current.value;
    const fullname = fullnameref.current.value;
    const password = passwordref.current.value;
    const data = { fullname, username, password };
    try {
      const response = await axios.post('http://localhost:5000/user/signup', data, {
        headers: {
          'Content-Type': 'application/json', 
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        navigate('/');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Signup failed, please try again.';
      seterror(errorMessage);
    }
  };
  return (
    <div className="border-8 border-blue-400 rounded-lg shadow-lg p-8 max-w-md mx-auto my-20 bg-white">
      {error && <h1 className="text-red-500 text-center">{error}</h1>} {/* Display error message */}
      <h1 className="text-blue-600 text-center my-2">SIGNUP PAGE</h1>
      <form onSubmit={handleSignup} method="POST" className="space-y-4">
        <input
          ref={fullnameref}
          type="text"
          placeholder="Full Name"
          className="border border-slate-300 rounded-md text-center w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
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
          Create Account
        </button>
        <div className="text-center">
          <Link to="/login" className="text-blue-500 hover:underline mt-4 block">
            Login if you already have an account
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Signup;