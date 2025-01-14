import { useState } from 'react';
import { Close } from '@mui/icons-material';

function TaskInput({ onAddTask, onCancel }) {
  const [taskData, setTaskData] = useState({
    text: '',
    type: 'indoor',
    priority: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskData.text.trim()) {
      onAddTask(taskData);
      setTaskData({
        text: '',
        type: 'indoor',
        priority: 'medium'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="task-input-form">
      <input
        type="text"
        name="text"
        value={taskData.text}
        onChange={handleChange}
        placeholder="Add a new task..."
        autoFocus
      />
      <div className="task-input-options">
        <select 
          name="type" 
          value={taskData.type}
          onChange={handleChange}
          className="task-type-select"
        >
          <option value="indoor">Indoor Task</option>
          <option value="outdoor">Outdoor Task</option>
        </select>
        <select 
          name="priority" 
          value={taskData.priority}
          onChange={handleChange}
          className="priority-select"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>
      <div className="task-input-buttons">
        <button type="submit" className="add-button">
          Add Task
        </button>
        <button type="button" onClick={onCancel} className="cancel-button">
          <Close />
        </button>
      </div>
    </form>
  );
}

export default TaskInput; 