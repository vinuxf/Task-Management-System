import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const AddTaskForm = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creatorName, setCreatorName] = useState(user.username || ''); 
  const [usernames, setUsernames] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting task:', {
      taskTitle,
      description,
      creatorName,
      assignedTo: selectedUser,
    });

    try {
      const response = await axios.post('http://localhost:3000/auth/dashboard/add_tasks', {
        taskTitle,
        description,
        creatorName,
        assignedTo: selectedUser,
      });
      alert('Task Added Successfully');
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.data) {
        console.error('Error response:', err.response.data);
        alert(`Failed to add the task: ${err.response.data.message || 'Internal server error'}`);
      } else {
        console.error('Error:', err.message);
        alert('Failed to add the task. Please try again later.');
      }
    }
  };

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsernames(data);
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };

    fetchUsernames();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 transform transition duration-500 hover:scale-105">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="text-gray-600 font-medium">Task Title</label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              placeholder="Enter task title"
              required
            />
          </div>
          <div className="relative">
            <label className="text-gray-600 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              rows="4"
              placeholder="Enter task description"
              required
            />
          </div>
          <div className="relative">
            <label className="text-gray-600 font-medium">Creator's Name</label>
            <input
              type="text"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              placeholder="Creator's Name"
              required
            />
          </div>
          <div className="relative">
            <label className="text-gray-600 font-medium">Assign To</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              required
            >
              <option value="">Select a user</option>
              {usernames.map((username, index) => (
                <option key={index} value={username}>
                  {username}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
