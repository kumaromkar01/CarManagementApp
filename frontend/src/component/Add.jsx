// AddCar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
const Add = () => {
  const [tittle, setTittle] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleAddCar = async (e) => {
    e.preventDefault();
    // Get token from cookies
    const token = Cookies.get('token');
    if (!token) {
      setError('You must be logged in to add a car');
      navigate('/login');
      return;
    }
    try {
      // Sending data to backend
      const response = await axios.post(
        'http://localhost:5000/cars/create',
        { tittle, desc: description, images: imageLink },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // to include cookies in the request
        }
      );
      if (response.status === 200) {
        navigate('/'); // Redirect to cars list after adding
      }
    } catch (err) {
      // Handling error based on the response from the backend
      if (err.response) {
        setError(`Failed to add car: ${err.response.data || err.message}`);
      } else {
        setError('An unknown error occurred');
      }
    }
  };
  return (
    <div className="border-8 border-blue-400 rounded-lg shadow-lg p-8 max-w-md mx-auto my-20 bg-white">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Add a New Car</h2>
      <form onSubmit={handleAddCar} className="space-y-4">
        <input
          type="text"
          value={tittle}
          onChange={(e) => setTittle(e.target.value)}
          placeholder="Car Title"
          className="border border-slate-300 rounded-md text-center w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border border-slate-300 rounded-md text-center w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <input
          type="text"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
          placeholder="Image Link"
          className="border border-slate-300 rounded-md text-center w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};
export default Add;