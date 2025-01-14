import { useWeather } from '../../hooks/useWeather';

function Weather() {
  const { weather, loading, error } = useWeather();

  if (loading) return <div>Loading weather...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weather) return null;

  return (
    <div className="weather-widget">
      <h3>Weather</h3>
      <div className="weather-info">
        <div>Temperature: {Math.round(weather.main.temp)}°C</div>
        <div>Condition: {weather.weather[0].main}</div>
        <div>Location: {weather.name}</div>
      </div>
    </div>
  );
}

export default Weather; 