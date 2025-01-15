import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Login from './components/Auth/Login';
import Sidebar from './components/Layout/Sidebar';
import TaskList from './components/Tasks/TaskList';
import PrivateRoute from './components/Auth/PrivateRoute';
import Navbar from './components/Layout/Navbar';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app" data-theme={isDarkMode ? 'dark' : 'light'}>
      {isAuthenticated && <Navbar onMenuClick={toggleSidebar} />}
      {isAuthenticated && <Sidebar isOpen={isSidebarOpen} />}
      <main className={`main-content ${isAuthenticated && isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Routes>
          <Route path="/login" element={
            !isAuthenticated ? <Login /> : <Navigate to="/" />
          } />
          <Route path="/" element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
