import { useWeather } from '../../hooks/useWeather';
import { WbSunny, Cloud, Opacity } from '@mui/icons-material';

function WeatherInfo({ city = 'London' }) {
  const { weather, loading, error } = useWeather(city);

  if (loading) {
    return <div className="weather-loading">Checking weather...</div>;
  }

  if (error) {
    return <div className="weather-error">Unable to load weather info</div>;
  }

  if (!weather) return null;

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
    <div className="weather-info">
      <div className="weather-icon">
        {getWeatherIcon(weather.weather[0].main)}
      </div>
      <div className="weather-details">
        <span className="temperature">{Math.round(weather.main.temp)}°C</span>
        <span className="condition">{weather.weather[0].main}</span>
      </div>
    </div>
  );
}

export default WeatherInfo; 