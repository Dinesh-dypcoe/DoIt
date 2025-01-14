import { useState } from 'react';
import { Search } from '@mui/icons-material';

function TaskSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="task-search">
      <Search className="search-icon" />
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}

export default TaskSearch; 