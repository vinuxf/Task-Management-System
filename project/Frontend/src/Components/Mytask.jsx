import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext'; 
import axios from 'axios'; 

const MyTasks = () => {
  const { user } = useContext(UserContext); 
  const [tasks, setTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({}); 

  useEffect(() => {
    const fetchMyTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/dashboard/view_tasks'); 
        const data = await response.json();
        
        if (data.Status) {
          const myTasks = data.data.filter(task => task.assignedTo === user.username);
          setTasks(myTasks);
        } else {
          console.error('Failed to fetch tasks:', data.Error);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchMyTasks();
  }, [user.username]);

  const handleStatusChange = (taskId, newStatus) => {
    setSelectedStatus(prevStatus => ({
      ...prevStatus,
      [taskId]: newStatus
    }));
  };

  const handleSubmitStatus = async (taskId) => {
    const newStatus = selectedStatus[taskId];
    try {
      const response = await axios.put('http://localhost:3000/auth/dashboard/update_task_status', {
        taskId: taskId,
        status: newStatus
      });

      if (response.status === 200) {
        alert('Status updated successfully');
        const updatedTasks = tasks.map(task => 
          task.id === taskId ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
      } else {
        console.error('Failed to update status:', response.data);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">My Tasks</h1>
      {tasks.length > 0 ? (
        <table className="w-full border border-gray-300 bg-white rounded shadow-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Task Title</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Assigned To</th>
              <th className="py-2 px-4 border">Creator Name</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{task.title}</td>
                <td className="py-2 px-4 border">{task.description}</td>
                <td className="py-2 px-4 border">{task.assignedTo}</td>
                <td className="py-2 px-4 border">{task.CreaterName}</td>
                <td className="py-2 px-4 border">
                  <select
                    value={selectedStatus[task.id] || task.status} // Initialize with the task's current status
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">in-progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleSubmitStatus(task.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks assigned.</p>
      )}
    </div>
  );
};

export default MyTasks;
