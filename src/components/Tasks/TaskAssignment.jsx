import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignTask } from '../../store/slices/taskSlice';
import { Person, Add } from '@mui/icons-material';

function TaskAssignment({ taskId }) {
  const [showAssignMenu, setShowAssignMenu] = useState(false);
  const dispatch = useDispatch();
  const task = useSelector(state => 
    state.tasks.tasks.find(t => t.id === taskId)
  );

  // Mock users list - in a real app, this would come from your backend
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' }
  ];

  const handleAssign = (userId, userName) => {
    dispatch(assignTask({ taskId, userId, userName }));
    setShowAssignMenu(false);
  };

  return (
    <div className="task-assignment">
      {task?.assignedTo ? (
        <div className="assigned-user">
          <Person />
          <span>{task.assignedTo.name}</span>
        </div>
      ) : (
        <button 
          className="assign-button"
          onClick={() => setShowAssignMenu(!showAssignMenu)}
        >
          <Add />
          <span>Assign</span>
        </button>
      )}

      {showAssignMenu && (
        <div className="assign-menu">
          {users.map(user => (
            <button
              key={user.id}
              className="user-option"
              onClick={() => handleAssign(user.id, user.name)}
            >
              <Person />
              <span>{user.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskAssignment; 