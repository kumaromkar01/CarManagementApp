import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const List = () => {
    const [cars, setCars] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    // Fetch cars on component mount
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:5000/cars/list', {
                    withCredentials: true,
                });
                setCars(response.data);
            } catch (err) {
                setError('Please login to view cars.');
            }
        };
        fetchCars();
    }, []);
    const handleDelete = async (carId) => {
        try {
            await axios.get(`http://localhost:5000/cars/delete/${carId}`, {
                withCredentials: true,
            });
            setCars(cars.filter((car) => car._id !== carId)); // Update the list after deletion
        } catch (err) {
            setError('Failed to delete the car. Please try again.');
        }
    };
    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5000/user/logout', { withCredentials: true });
            navigate('/login'); // Redirect to login page after logging out
        } catch (err) {
            setError('Logout failed. Please try again.');
        }
    };
    return (
        <div className="car-list max-w-lg mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <Link to="/Add" className="text-blue-500 hover:underline font-semibold">
                    + Add a car
                </Link>
                <h2 className="text-2xl font-bold text-blue-600">Your Cars</h2>
                {!error && <button onClick={handleLogout} className="text-red-500 hover:underline font-semibold">
                    Logout
                </button>}
            </div>
            
            {error && (
                <div className="text-center mb-4">
                    <p className="text-red-500 mb-2">{error}</p>
                    <Link to="/login" className="text-blue-500 hover:underline font-semibold">
                        Go to Login
                    </Link>
                </div>
            )}
            <ul>
                {cars.length ? (
                    cars.map((car) => (
                        <li key={car._id} className="border border-gray-300 p-4 my-4 bg-white rounded-lg shadow-sm">
                            <p className="text-lg font-semibold text-gray-700">
                                <strong>Title:</strong> {car.tittle}
                            </p>
                            <div className="flex space-x-4 mt-2">
                                <Link to={`/update/${car._id}`} className="text-blue-500 hover:underline">
                                    Update
                                </Link>
                                <button onClick={() => handleDelete(car._id)} className="text-red-500 hover:underline">
                                    Delete
                                </button>
                                <Link to={`/view/${car._id}`} className="text-green-500 hover:underline">
                                    View
                                </Link>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No cars available.</p>
                )}
            </ul>
        </div>
    );
};
export default List;