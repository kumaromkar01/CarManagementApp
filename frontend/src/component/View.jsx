import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
const CarView = () => {
  const { id } = useParams(); // Get car ID from URL parameters
  const [car, setCar] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cars/view/${id}`);
        setCar(response.data);
      } catch (err) {
        setError('Error fetching car details');
      }
    };
    fetchCarDetails();
  }, [id]);
  if (error) {
    return <p className="text-red-500 text-center my-4">{error}</p>;
  }
  if (!car) {
    return <p className="text-gray-500 text-center my-4">Loading car details...</p>;
  }
  return (
    <div className="max-w-md mx-auto my-10 p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Tittle : {car.tittle}</h2>
      <p><strong>Description:</strong> {car.desc}</p>
      <img src={car.images} alt="" />
      
      <div className="flex space-x-4 mt-6">
        <Link to={`/update/${id}`} className="text-blue-500 hover:underline">Edit Car</Link>
        <Link to="/" className="text-blue-500 hover:underline">Back to Car List</Link>
      </div>
    </div>
  );
};
export default CarView;