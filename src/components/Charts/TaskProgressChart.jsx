import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell } from 'recharts';

function TaskProgressChart() {
  const tasks = useSelector((state) => state.tasks.tasks);
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const data = [
    { name: 'Completed', value: completedTasks },
    { name: 'Pending', value: pendingTasks }
  ];

  const COLORS = ['#4CAF50', '#E0E0E0'];

  return (
    <div className="progress-chart">
      <div className="chart-container">
        <PieChart width={160} height={160}>
          <Pie
            data={data}
            cx={80}
            cy={80}
            innerRadius={60}
            outerRadius={75}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
        <div className="completion-percentage">
          <span className="percentage">{completionPercentage}%</span>
          <span className="label">Complete</span>
        </div>
      </div>
      <div className="task-stats">
        <div className="stat-item">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{totalTasks}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Completed</span>
          <span className="stat-value completed">{completedTasks}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Pending</span>
          <span className="stat-value pending">{pendingTasks}</span>
        </div>
      </div>
    </div>
  );
}

export default TaskProgressChart; 