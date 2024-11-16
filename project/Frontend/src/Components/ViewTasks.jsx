import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/dashboard/view_tasks')
      .then(result => {
        setTasks(result.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="max-w-7xl mx-auto px-6 py-8 bg-white bg-opacity-80 rounded-lg shadow-xl">
               

                 
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">
          View All Tasks
        </h1>

       
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Task Id</th>
                <th className="px-6 py-4 text-left font-semibold">Title</th>
                <th className="px-6 py-4 text-left font-semibold">Description</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Assigned To</th>
                <th className="px-6 py-4 text-left font-semibold">Created By</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id || index} className="hover:bg-gray-100 transition duration-200">
                  <td className="border px-4 py-2 text-gray-700">{task.id}</td>
                  <td className="border px-4 py-2 text-gray-700">{task.title}</td>
                  <td className="border px-4 py-2 text-gray-700">{task.description}</td>
                  <td className="border px-4 py-2 text-gray-700">{task.status || "N/A"}</td>
                  <td className="border px-4 py-2 text-gray-700">{task.assignedTo || "Pending"}</td>
                  <td className="border px-4 py-2 text-gray-700">{task.CreaterName || "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div className="mt-6 text-center">
          <Link to="/dashboard" className="text-white bg-blue-600 hover:bg-blue-700 font-medium py-2 px-6 rounded shadow-md transition duration-300">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewTasks;
