import { useSelector, useDispatch } from 'react-redux';
import { setActiveNav } from '../../store/slices/taskSlice';
import { FilterList } from '@mui/icons-material';

function TaskFilters() {
  const dispatch = useDispatch();
  const activeNav = useSelector((state) => state.tasks.activeNav);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'today', label: 'Today' },
    { id: 'important', label: 'Important' },
    { id: 'planned', label: 'Planned' },
    { id: 'assigned', label: 'Assigned' }
  ];

  const handleFilterClick = (filterId) => {
    dispatch(setActiveNav(filterId));
  };

  return (
    <div className="task-filters">
      <div className="filter-header">
        <FilterList />
        <h3>Quick Filters</h3>
      </div>
      <div className="filter-options">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`filter-button ${activeNav === filter.id ? 'active' : ''}`}
            onClick={() => handleFilterClick(filter.id)}
          >
            {filter.label}
            {filter.id === activeNav && ' ✓'}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskFilters; 