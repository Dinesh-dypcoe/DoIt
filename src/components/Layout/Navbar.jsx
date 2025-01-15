import { useDispatch, useSelector } from 'react-redux';
import { Menu, GridView, DarkMode, LightMode } from '@mui/icons-material';
import DoItLogo from '../../assets/DoIt.png';
import { toggleTheme } from '../../store/slices/themeSlice';
import { toggleView } from '../../store/slices/viewSlice';

function Navbar({ onMenuClick }) {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const isGridView = useSelector(state => state.view.isGridView);

  const handleViewToggle = () => {
    dispatch(toggleView());
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-button" onClick={onMenuClick}>
          <Menu />
        </button>
        <img src={DoItLogo} alt="DoIt Logo" className="nav-logo" />
      </div>

      <div className="navbar-right">
        <button 
          className={`nav-button ${isGridView ? 'active' : ''}`}
          onClick={handleViewToggle}
          title="Change View"
        >
          <GridView />
        </button>
        <button 
          className={`nav-button ${isDarkMode ? 'active' : ''}`}
          onClick={handleThemeToggle}
          title="Toggle Theme"
        >
          {isDarkMode ? <LightMode /> : <DarkMode />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar; 