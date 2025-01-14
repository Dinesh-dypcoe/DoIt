import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Close, 
  Add, 
  Notifications, 
  CalendarToday, 
  Repeat, 
  Notes 
} from '@mui/icons-material';
import { setTaskDueDate, setTaskReminder, setTaskRepeat } from '../../store/slices/taskSlice';

function TaskDetails({ task: initialTask, onClose }) {
  const dispatch = useDispatch();
  // Get the latest task data from Redux store
  const currentTask = useSelector(state => 
    state.tasks.tasks.find(t => t.id === initialTask.id)
  );
  
  const [note, setNote] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showRepeatOptions, setShowRepeatOptions] = useState(false);
  const [reminderTime, setReminderTime] = useState({ hour: '', minute: '' });

  // Use the latest task data from Redux
  const task = currentTask || initialTask;

  const handleAddStep = () => {
    // TODO: Implement add step functionality
  };

  const handleSetReminder = () => {
    setShowTimePicker(true);
  };

  const handleTimeChange = (type, value) => {
    setReminderTime(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSetReminderTime = () => {
    if (reminderTime.hour && reminderTime.minute) {
      const now = new Date();
      const reminderDate = new Date(now.setHours(
        parseInt(reminderTime.hour),
        parseInt(reminderTime.minute)
      ));
      
      dispatch(setTaskReminder({ 
        taskId: task.id, 
        reminder: reminderDate.toISOString() 
      }));
      setShowTimePicker(false);
      setReminderTime({ hour: '', minute: '' });
    }
  };

  const handleSetDueDate = () => {
    setShowDatePicker(true);
  };

  const handleDateSelect = (date) => {
    dispatch(setTaskDueDate({ 
      taskId: task.id, 
      dueDate: date 
    }));
    setShowDatePicker(false);
  };

  const handleSetRepeat = () => {
    setShowRepeatOptions(true);
  };

  const handleRepeatSelect = (repeatOption) => {
    dispatch(setTaskRepeat({ 
      taskId: task.id, 
      repeat: repeatOption 
    }));
    setShowRepeatOptions(false);
  };

  const repeatOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'custom', label: 'Custom' }
  ];

  // Close any open pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.time-picker') && !e.target.closest('.task-action-button')) {
        setShowTimePicker(false);
      }
      if (!e.target.closest('.date-picker') && !e.target.closest('.task-action-button')) {
        setShowDatePicker(false);
      }
      if (!e.target.closest('.repeat-options') && !e.target.closest('.task-action-button')) {
        setShowRepeatOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="task-details">
      <div className="task-details-header">
        <h3>{task.text}</h3>
        <button className="close-button" onClick={onClose}>
          <Close />
        </button>
      </div>

      <div className="task-details-content">
        <div className="task-steps">
          <button className="add-step-button" onClick={handleAddStep}>
            <Add /> Add Step
          </button>
        </div>

        <div className="task-actions-list">
          <button className="task-action-button" onClick={handleSetReminder}>
            <Notifications />
            <span>Set Reminder</span>
            {task.reminder && (
              <span className="reminder-time">
                {new Date(task.reminder).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            )}
          </button>

          {showTimePicker && (
            <div className="time-picker">
              <div className="time-inputs">
                <div className="time-input-group">
                  <label>Hour:</label>
                  <input 
                    type="number"
                    min="0"
                    max="23"
                    value={reminderTime.hour}
                    onChange={(e) => handleTimeChange('hour', e.target.value)}
                    className="time-input"
                    placeholder="HH"
                  />
                </div>
                <div className="time-input-group">
                  <label>Minute:</label>
                  <input 
                    type="number"
                    min="0"
                    max="59"
                    value={reminderTime.minute}
                    onChange={(e) => handleTimeChange('minute', e.target.value)}
                    className="time-input"
                    placeholder="MM"
                  />
                </div>
              </div>
              <button 
                className="set-reminder-button"
                onClick={handleSetReminderTime}
                disabled={!reminderTime.hour || !reminderTime.minute}
              >
                Set Reminder
              </button>
            </div>
          )}

          <button className="task-action-button" onClick={handleSetDueDate}>
            <CalendarToday />
            <span>Add Due Date</span>
            {task.dueDate && (
              <span className="due-date">
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </button>

          {showDatePicker && (
            <div className="date-picker">
              <input 
                type="date" 
                onChange={(e) => handleDateSelect(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="date-input"
              />
            </div>
          )}

          <button className="task-action-button" onClick={handleSetRepeat}>
            <Repeat />
            <span>Repeat</span>
            {task.repeat && (
              <span className="repeat-option">
                {task.repeat}
              </span>
            )}
          </button>

          {showRepeatOptions && (
            <div className="repeat-options">
              {repeatOptions.map(option => (
                <button
                  key={option.value}
                  className="repeat-option-button"
                  onClick={() => handleRepeatSelect(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="task-notes">
          <div className="notes-header">
            <Notes />
            <span>Add Notes</span>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add your notes here..."
            className="notes-input"
          />
          {note && (
            <button className="add-note-button" onClick={handleAddNote}>
              Add Note
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskDetails; 