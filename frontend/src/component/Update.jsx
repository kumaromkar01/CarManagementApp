import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
const Update = () => {
  const [tittle, setTittle] = useState('');
  const [desc, setDescription] = useState('');
  const [images, setImageLink] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Get the car ID from the URL
  useEffect(() => {
    if (!id) {
      setError('Car ID is not available');
      return;
    }
    const fetchCarDetails = async () => {
      const token = Cookies.get('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/cars/view/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Send token in headers for auth
          },
        });
        const { tittle, desc, images } = response.data;
        setTittle(tittle);
        setDescription(desc);
        setImageLink(images);
      } catch (err) {
        setError(`Failed to fetch car details: ${err.response ? err.response.data : err.message}`);
      }
    };
    fetchCarDetails();
  }, [id, navigate]);
  const handleUpdateCar = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5000/cars/update/${id}`,
        { tittle, desc, images },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Send token in headers for auth
          },
        }
      );
      if (response.status === 200) {
        navigate('/'); // Redirect to cars list after updating
      }
    } catch (err) {
      setError(`Failed to update car: ${err.response ? err.response.data : err.message}`);
    }
  };
  return (
    <div className="border-8 border-blue-400 rounded-lg shadow-lg p-8 max-w-md mx-auto my-20 bg-white">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Update Car Details</h2>
      <form onSubmit={handleUpdateCar} className="space-y-4">
        <input
          type="text"
          value={tittle}
          onChange={(e) => setTittle(e.target.value)}
          placeholder="Car Title"
          className="border border-slate-300 rounded-md text-center w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <textarea
          value={desc}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border border-slate-300 rounded-md text-center w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <input
          type="text"
          value={images}
          onChange={(e) => setImageLink(e.target.value)}
          placeholder="Image Link"
          className="border border-slate-300 rounded-md text-center w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Update Car
        </button>
      </form>
    </div>
  );
};
export default Update;