import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // Import the UserContext

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Access setUser from the context

  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  
  const [error, setError] = useState(''); 

  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/auth/adminlogin', values)
      .then(result => {
        if (result.data.loginStatus) {
          // Store username in context
          setUser({ username: values.username });
          navigate(result.data.redirect); // Use navigate for redirection
        } else {
          setError('Your credentials are wrong'); 
        }
      })
      .catch(err => {
        setError('An error occurred. Please try again.');
        if (err.code === 'ERR_NETWORK') {
          setError('Network error. Please check if the backend server is running.');
        }
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/bgpic1.jpg')", 
      }}
    >
      <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200"
              id="username"
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setValues({ ...values, username: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200"
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              required
            />
          </div>
          {error && ( 
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
