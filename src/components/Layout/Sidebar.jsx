import { useSelector, useDispatch } from 'react-redux';
import { 
  ListAlt, 
  Today, 
  Star, 
  Schedule,
  AssignmentInd,
  Add,
  InfoOutlined
} from '@mui/icons-material';
import profileImage from '../../assets/profileimg.jpg';
import TaskProgressChart from '../Charts/TaskProgressChart';
import { setActiveNav } from '../../store/slices/taskSlice';

function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const tasks = useSelector((state) => state.tasks.tasks);
  const activeNav = useSelector((state) => state.tasks.activeNav);
  const today = new Date().toISOString().split('T')[0];

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
  };

  return (
    <div className="sidebar">
      <div className="user-profile">
        <img 
          src={profileImage}
          alt="Profile" 
          className="profile-image"
        />
        <h3>Hey, {user?.name || 'User'}</h3>
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
              <IconComponent /> {item.label}
            </button>
          );
        })}
      </nav>

      <button className="add-list-button">
        <Add /> Add list
      </button>

      <div className="tasks-summary">
        <h4>
          Today Tasks
          <InfoOutlined fontSize="small" />
        </h4>
        <div className="task-count">{todaysTasks}</div>
        <TaskProgressChart />
      </div>
    </div>
  );
}

export default Sidebar; 