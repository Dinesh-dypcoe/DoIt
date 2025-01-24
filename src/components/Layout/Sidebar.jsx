import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ListAlt, 
  Today, 
  Star, 
  Schedule,
  AssignmentInd,
  Add,
  InfoOutlined,
  FormatListBulleted,
  Delete,
  Logout
} from '@mui/icons-material';
import profileImage from '../../assets/profileimg.jpg';
import TaskProgressChart from '../Charts/TaskProgressChart';
import { setActiveNav } from '../../store/slices/taskSlice';
import { addList, removeList } from '../../store/slices/listSlice';
import { logout } from '../../store/slices/authSlice';
import ListInput from '../Lists/ListInput';

function Sidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const tasks = useSelector((state) => state.tasks.tasks);
  const lists = useSelector((state) => state.lists.lists);
  const activeNav = useSelector((state) => state.tasks.activeNav);
  const [showListInput, setShowListInput] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (user?.username) {
      // Use a more reliable avatar URL format
      const username = user.username.replace(/[^a-zA-Z0-9]/g, ''); // Remove special characters
      const url = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      setAvatarUrl(url);
    }
  }, [user?.username]);

  // Get count of today's tasks
  const todaysTasks = tasks.filter(task => {
    const taskDate = task.dueDate || new Date().toISOString().split('T')[0];
    return taskDate === today;
  }).length;

  const navItems = [
    { id: 'all', label: 'All Tasks', icon: ListAlt },
    { id: 'today', label: 'Today', icon: Today },
    { id: 'important', label: 'Important', icon: Star },
    { id: 'planned', label: 'Planned', icon: Schedule },
    { id: 'assigned', label: 'Assigned to me', icon: AssignmentInd }
  ];

  const handleNavClick = (navId) => {
    dispatch(setActiveNav(navId));
    // Close sidebar on mobile when nav item is clicked
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  const handleAddList = (newList) => {
    dispatch(addList(newList));
    setShowListInput(false);
    // Close sidebar on mobile when new list is added
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  const handleDeleteList = (e, listId) => {
    e.stopPropagation();
    dispatch(removeList(listId));
    if (activeNav === `list-${listId}`) {
      dispatch(setActiveNav('all'));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="user-profile">
        <img 
          src={avatarUrl || 'https://avatar.iran.liara.run/public/boy'}
          alt="Profile" 
          className="profile-image"
          onError={(e) => {
            // Use a more reliable fallback
            e.target.src = 'https://avatar.iran.liara.run/public/boy';
            // Prevent infinite error loop
            e.target.onerror = null;
          }}
        />
        <h3>Hey, {user?.username || 'User'}</h3>
        <button className="logout-button" onClick={handleLogout}>
          <Logout />
          <span>Logout</span>
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <IconComponent />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {showListInput ? (
        <ListInput 
          onAdd={handleAddList}
          onCancel={() => setShowListInput(false)}
        />
      ) : (
        <button className="add-list-button" onClick={() => setShowListInput(true)}>
          <Add />
          <span>Add list</span>
        </button>
      )}

      <div className="tasks-summary">
        <h4>Task Progress</h4>
        <TaskProgressChart />
      </div>
    </div>
  );
}

export default Sidebar; 