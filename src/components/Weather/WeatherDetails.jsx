import { 
  WbSunny, 
  Cloud, 
  Opacity, 
  Close,
  Air,
  Thermostat,
  CompareArrows,
  WaterDrop
} from '@mui/icons-material';
import { useWeather } from '../../hooks/useWeather';

function WeatherDetails({ city = 'London', onClose }) {
  const { weather, loading, error } = useWeather(city);

  if (loading) {
    return (
      <div className="weather-details-overlay">
        <div className="weather-details">
          Loading weather data...
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="weather-details-overlay">
        <div className="weather-details">
          Unable to load weather data
        </div>
      </div>
    );
  }

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <WbSunny />;
      case 'clouds':
        return <Cloud />;
      default:
        return <Opacity />;
    }
  };

  return (
    <div className="weather-details-overlay">
      <div className="weather-details">
        <div className="weather-details-header">
          <h3>Today's Weather</h3>
          <button className="close-button" onClick={onClose}>
            <Close />
          </button>
        </div>

        <div className="weather-details-content">
          <div className="weather-main">
            {getWeatherIcon(weather.weather[0].main)}
            <div className="weather-temp">
              <span className="temp">{Math.round(weather.main.temp)}°C</span>
              <span className="condition">{weather.weather[0].description}</span>
            </div>
          </div>

          <div className="weather-info-grid">
            <div className="weather-info-item">
              <Thermostat />
              <div className="info-content">
                <span className="label">Feels Like</span>
                <span className="value">{Math.round(weather.main.feels_like)}°C</span>
              </div>
            </div>

            <div className="weather-info-item">
              <CompareArrows />
              <div className="info-content">
                <span className="label">Min/Max</span>
                <span className="value">
                  {Math.round(weather.main.temp_min)}°C / {Math.round(weather.main.temp_max)}°C
                </span>
              </div>
            </div>

            <div className="weather-info-item">
              <WaterDrop />
              <div className="info-content">
                <span className="label">Humidity</span>
                <span className="value">{weather.main.humidity}%</span>
              </div>
            </div>

            <div className="weather-info-item">
              <Air />
              <div className="info-content">
                <span className="label">Wind Speed</span>
                <span className="value">{weather.wind.speed} m/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails; 