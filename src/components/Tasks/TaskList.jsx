import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, updateTaskPriority } from '../../store/slices/taskSlice';
import TaskInput from './TaskInput';
import Weather from '../Weather/Weather';

function TaskList() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleAddTask = (task) => {
    dispatch(addTask({
      id: Date.now(),
      text: task,
      priority: 'medium',
      completed: false
    }));
  };

  const handleRemoveTask = (taskId) => {
    dispatch(removeTask(taskId));
  };

  const handlePriorityChange = (taskId, priority) => {
    dispatch(updateTaskPriority({ id: taskId, priority }));
  };

  return (
    <div className="task-container">
      <div className="weather-section">
        <Weather />
      </div>
      <div className="task-list">
        <h2>My Tasks</h2>
        <TaskInput onAddTask={handleAddTask} />
        <div className="tasks">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="task-content">
                <span>{task.text}</span>
                <select
                  value={task.priority}
                  onChange={(e) => handlePriorityChange(task.id, e.target.value)}
                  className={`priority-${task.priority}`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <button onClick={() => handleRemoveTask(task.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskList; 