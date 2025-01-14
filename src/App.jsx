import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Auth/Login';
import Sidebar from './components/Layout/Sidebar';
import TaskList from './components/Tasks/TaskList';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="app">
      {isAuthenticated && <Sidebar />}
      <main className="main-content">
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
