import Login from './Components/Login';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Dashboarduser from './Components/Dashboarduser';
import ViewTasks from './Components/ViewTasks';
import AddTask from './Components/AddTask';
import { UserProvider } from './Components/UserContext'; // Import the UserProvider
import Alltask from './Components/Alltask';
import Mytask from './Components/Mytask';

function App() {
  return (
    <BrowserRouter>
      <UserProvider> {/* Use UserProvider here */}
        <Routes>
          <Route path="/" element={<Navigate to="/adminlogin" replace />} />
          <Route path="/adminlogin" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboarduser" element={<Dashboarduser />} />
          <Route path="/dashboard/view_tasks" element={<ViewTasks />} />
          <Route path="/dashboard/add_tasks" element={<AddTask />} />
          <Route path="/alltasks" element={<Alltask />} />
          <Route path="/mytasks" element={<Mytask />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
