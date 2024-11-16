import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const Dashboarduser = () => {
  const navigate = useNavigate();

  const handleAllTasksClick = () => {
    navigate('/alltasks'); // Adjust the route based on your routing setup
  };

  const handleMyTasksClick = () => {
    navigate('/mytasks');
  }

  return (
    <div>
      <div>
        <div className="flex justify-start space-x-16 mt-16 ml-12">
        
      <button onClick={handleAllTasksClick} className="bg-blue-500 text-white py-2 px-4 rounded space-x-16">
        ALL TASKS
      </button>

      <button onClick={handleMyTasksClick} className="bg-blue-500 text-white py-2 px-4 rounded">
        My Tasks
      </button>
        </div>

        
      </div>

      
    </div>
  );
}

export default Dashboarduser;
