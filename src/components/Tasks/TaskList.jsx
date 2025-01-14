import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Star, Add, Delete } from '@mui/icons-material';
import { addTask, removeTask, toggleTaskImportant, toggleTaskCompleted } from '../../store/slices/taskSlice';
import TaskInput from './TaskInput';
import WeatherInfo from '../Weather/WeatherInfo';
import TaskFilters from './TaskFilters';
import TaskAssignment from './TaskAssignment';
import TaskDetails from './TaskDetails';
import TaskSearch from './TaskSearch';

function TaskList() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  const activeNav = useSelector((state) => state.tasks.activeNav);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddTask = (taskData) => {
    dispatch(addTask({
      id: Date.now(),
      text: taskData.text,
      type: taskData.type,
      priority: taskData.priority,
      completed: false,
      important: false,
      assignedTo: [],
      dueDate: null
    }));
    setShowInput(false);
  };

  const handleToggleImportant = (e, taskId) => {
    e.stopPropagation();
    dispatch(toggleTaskImportant(taskId));
  };

  const handleDeleteTask = (e, taskId) => {
    e.stopPropagation();
    dispatch(removeTask(taskId));
  };

  const handleTaskCheckbox = (e, taskId) => {
    e.stopPropagation();
    dispatch(toggleTaskCompleted(taskId));
  };

  const sortByPriority = (tasks) => {
    const priorityOrder = {
      'high': 1,
      'medium': 2,
      'low': 3
    };

    return [...tasks].sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  const filterTasks = (tasks) => {
    const today = new Date().toISOString().split('T')[0];
    let filteredTasks;
    
    switch (activeNav) {
      case 'today':
        filteredTasks = tasks.filter(task => {
          const taskDate = task.dueDate || new Date().toISOString().split('T')[0];
          return taskDate === today;
        });
        break;
      case 'important':
        filteredTasks = tasks.filter(task => Boolean(task.important) === true);
        break;
      case 'planned':
        filteredTasks = tasks.filter(task => task.dueDate);
        break;
      case 'assigned':
        filteredTasks = tasks.filter(task => task.assignedTo && task.assignedTo.id);
        break;
      default:
        filteredTasks = tasks;
    }

    // Sort the filtered tasks by priority
    return sortByPriority(filteredTasks);
  };

  const getHeaderTitle = () => {
    switch (activeNav) {
      case 'today':
        return 'Today\'s Tasks ✨';
      case 'important':
        return 'Important Tasks ⭐';
      case 'planned':
        return 'Planned Tasks 📅';
      case 'assigned':
        return 'Assigned Tasks 👥';
      default:
        return 'All Tasks ✨';
    }
  };

  const renderTask = (task) => (
    <div 
      key={task.id} 
      className={`task-item priority-${task.priority}`}
      onClick={() => setSelectedTask(task)}
    >
      <div className="task-checkbox" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => handleTaskCheckbox(e, task.id)}
        />
      </div>
      <div className="task-content">
        <span className="task-text">{task.text}</span>
        {task.type === 'outdoor' && <WeatherInfo />}
      </div>
      <div className="task-actions" onClick={(e) => e.stopPropagation()}>
        <TaskAssignment taskId={task.id} />
        <button 
          className={`star-button ${task.important ? 'important' : ''}`}
          onClick={(e) => handleToggleImportant(e, task.id)}
        >
          <Star />
        </button>
        <button 
          className="delete-button"
          onClick={(e) => handleDeleteTask(e, task.id)}
        >
          <Delete />
        </button>
      </div>
    </div>
  );

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const getFilteredTasks = (tasks) => {
    let filtered = filterTasks(tasks);
    
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.text.toLowerCase().includes(searchTerm)
      );
    }
    
    return filtered;
  };

  console.log('Tasks:', tasks.map(t => ({ id: t.id, text: t.text, important: t.important })));
  console.log('Filtered Tasks:', getFilteredTasks(tasks).map(t => ({ id: t.id, text: t.text, important: t.important })));

  const getEmptyStateMessage = () => {
    switch (activeNav) {
      case 'today':
        return 'No tasks scheduled for today 📅';
      case 'important':
        return 'No important tasks marked ⭐';
      case 'planned':
        return 'No planned tasks yet 📋';
      case 'assigned':
        return 'No tasks assigned to you 👤';
      default:
        return 'No tasks added yet ✨';
    }
  };

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>{getHeaderTitle()}</h2>
      </div>

      <TaskFilters />

      <TaskSearch onSearch={handleSearch} />

      {showInput ? (
        <TaskInput onAddTask={handleAddTask} onCancel={() => setShowInput(false)} />
      ) : (
        <button className="add-task-button" onClick={() => setShowInput(true)}>
          <Add /> Add A Task
        </button>
      )}

      <div className="tasks-section">
        {getFilteredTasks(tasks).length === 0 ? (
          <div className="empty-state">
            <p>{getEmptyStateMessage()}</p>
          </div>
        ) : (
          <>
            <div className="tasks-group">
              <h3>Tasks</h3>
              {sortByPriority(getFilteredTasks(tasks).filter(task => !task.completed)).map(renderTask)}
            </div>

            <div className="tasks-group">
              <h3>Completed</h3>
              {sortByPriority(getFilteredTasks(tasks).filter(task => task.completed)).map(renderTask)}
            </div>
          </>
        )}
      </div>

      {selectedTask && (
        <div className="task-details-overlay">
          <TaskDetails 
            task={selectedTask} 
            onClose={() => setSelectedTask(null)} 
          />
        </div>
      )}
    </div>
  );
}

export default TaskList; 