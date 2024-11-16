import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { UserContext } from './UserContext';

const Dashboard = () => {
  const { user } = useContext(UserContext); // Accessing the context
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/dashboard')
      .then(result => {
        setUsers(result.data.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-200 to-indigo-300 p-6">
      <div className="w-full p-4 bg-white shadow-lg rounded-lg">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome, {user.username}!</h1> {/* Displaying the username */}
          <h4 className="font-serif text-red-600">Admin Panel</h4>
        </header>

        <div className="flex mb-6">
          <nav className="w-64 bg-white shadow-lg rounded-lg p-4 mr-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Panel</h2>
            <Link 
              to="/dashboard/add_tasks" 
              className="block px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-200 mb-2"
            >
              Add Task
            </Link>
            <Link 
              to="/dashboard/view_tasks" 
              className="block px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
            >
              View Tasks
            </Link>
          </nav>

          <div className="flex-1 p-4">
            <table className="min-w-full border-collapse border border-gray-200 bg-white shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                  <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Task</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id || index} className="hover:bg-gray-50 transition duration-150">
                    <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.title || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.taskStatus || "Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
