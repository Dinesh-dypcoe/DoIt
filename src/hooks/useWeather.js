import { useState, useEffect } from 'react';
import { getWeather } from '../services/weatherApi';

export const useWeather = (city = 'London') => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await getWeather(city);
        setWeather(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, loading, error };
}; 