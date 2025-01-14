import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city) => {
    const response = await fetch(`${process.env.WEATHER_API_URL}?q=${city}&appid=${process.env.WEATHER_API_KEY}`);
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }
    return response.json();
  }
); 