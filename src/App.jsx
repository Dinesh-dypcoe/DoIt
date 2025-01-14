import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Auth/Login';
import Header from './components/Layout/Header';
import Container from './components/Layout/Container';
import TaskList from './components/Tasks/TaskList';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="app">
      <Header />
      <Container>
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
      </Container>
    </div>
  );
}

export default App;
