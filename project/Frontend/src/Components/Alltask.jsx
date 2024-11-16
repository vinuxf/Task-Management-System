import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Alltask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/dashboard/view_tasks')
      .then(result => {
        setTasks(result.data.data);
      })
      .catch(err => {
        console.error('Error fetching tasks:', err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4 text-center">User Tasks Dashboard</h1>
        <div className="border rounded shadow-sm bg-white">
          {tasks.length > 0 ? (
            <table className="w-full border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2 text-left">Task ID</th>
                  <th className="border px-4 py-2 text-left">Title</th>
                  <th className="border px-4 py-2 text-left">Description</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                  <th className="border px-4 py-2 text-left">Assigned To</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task.id || index} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{task.id}</td>
                    <td className="border px-4 py-2">{task.title}</td>
                    <td className="border px-4 py-2">{task.description}</td>
                    <td className="border px-4 py-2">{task.status || 'N/A'}</td>
                    <td className="border px-4 py-2">{task.assignedTo || 'Pending'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-4 text-center text-gray-600">No tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alltask;