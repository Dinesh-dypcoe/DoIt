import { FileDownload, FileUpload } from '@mui/icons-material';
import { useSelector } from 'react-redux';

function TaskExport() {
  const tasks = useSelector(state => state.tasks.tasks);

  const handleExport = () => {
    const data = JSON.stringify(tasks, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedTasks = JSON.parse(event.target.result);
          // Dispatch action to import tasks
        } catch (error) {
          console.error('Error importing tasks:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="task-export">
      <button onClick={handleExport} className="export-button">
        <FileDownload /> Export Tasks
      </button>
      <label className="import-button">
        <FileUpload /> Import Tasks
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
}

export default TaskExport; 