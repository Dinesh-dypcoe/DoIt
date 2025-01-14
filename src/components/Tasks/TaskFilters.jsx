import { useSelector, useDispatch } from 'react-redux';
import { setActiveNav } from '../../store/slices/taskSlice';
import { FilterList, FormatListBulleted, Delete, ExpandMore, ExpandLess } from '@mui/icons-material';
import { removeList } from '../../store/slices/listSlice';
import { useState } from 'react';

function TaskFilters() {
  const dispatch = useDispatch();
  const activeNav = useSelector((state) => state.tasks.activeNav);
  const lists = useSelector((state) => state.lists.lists);
  const [showLists, setShowLists] = useState(true);

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

  const handleDeleteList = (e, listId) => {
    e.stopPropagation();
    dispatch(removeList(listId));
    if (activeNav === `list-${listId}`) {
      dispatch(setActiveNav('all'));
    }
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

        {lists.length > 0 && (
          <div className="my-lists-section">
            <button 
              className="my-lists-header"
              onClick={() => setShowLists(!showLists)}
            >
              <div className="my-lists-title">
                <FormatListBulleted />
                <span>My Lists</span>
                <span className="lists-count">({lists.length})</span>
              </div>
              {showLists ? <ExpandLess /> : <ExpandMore />}
            </button>

            {showLists && (
              <div className="lists-container">
                {lists.map(list => (
                  <button
                    key={list.id}
                    className={`filter-button list-filter ${activeNav === `list-${list.id}` ? 'active' : ''}`}
                    onClick={() => handleFilterClick(`list-${list.id}`)}
                  >
                    <div className="filter-button-content">
                      <span>{list.name}</span>
                    </div>
                    <button 
                      className="delete-list-button"
                      onClick={(e) => handleDeleteList(e, list.id)}
                    >
                      <Delete />
                    </button>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskFilters; 