import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
}; 