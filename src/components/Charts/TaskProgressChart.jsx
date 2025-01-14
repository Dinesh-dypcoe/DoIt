import { useSelector } from 'react-redux';

function TaskProgressChart() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const today = new Date().toISOString().split('T')[0];

  // Get today's tasks
  const todaysTasks = tasks.filter(task => {
    const taskDate = task.dueDate || new Date().toISOString().split('T')[0];
    return taskDate === today;
  });

  const completedTasks = todaysTasks.filter(task => task.completed).length;
  const totalTasks = todaysTasks.length;
  const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  // Calculate the circle's circumference
  const radius = 45;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDasharray = `${(percentage * circumference) / 100} ${circumference}`;

  return (
    <div className="task-progress-chart">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={normalizedRadius}
          fill="none"
          stroke="#E8F5E9"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx="60"
          cy="60"
          r={normalizedRadius}
          fill="none"
          stroke="#4CAF50"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={circumference * 0.25}
          transform="rotate(-90 60 60)"
          className="progress-ring-circle"
          strokeLinecap="round"
        />
      </svg>
      <div className="progress-legend">
        <div className="legend-item">
          <span className="legend-dot pending"></span>
          <span>Pending</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot done"></span>
          <span>Done</span>
        </div>
      </div>
    </div>
  );
}

export default TaskProgressChart; 