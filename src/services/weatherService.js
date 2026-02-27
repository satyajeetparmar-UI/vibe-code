import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get coordinates for a city
export const getCoordinates = async (city) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error('Weather API key not configured');
  }

  const response = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct`,
    {
      params: {
        q: city,
        limit: 1,
        appid: apiKey,
      },
    }
  );

  if (!response.data || response.data.length === 0) {
    throw new Error('City not found');
  }

  return response.data[0];
};

// Get current weather
export const getCurrentWeather = async (lat, lon) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error('Weather API key not configured');
  }

  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: apiKey,
      units: 'metric',
    },
  });

  return response.data;
};

// Get 5-day forecast
export const getForecast = async (lat, lon) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error('Weather API key not configured');
  }

  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      lat,
      lon,
      appid: apiKey,
      units: 'metric',
    },
  });

  // Group by day and get one forecast per day (noon)
  const forecasts = response.data.list;
  const dailyForecasts = [];
  
  const seenDates = new Set();
  
  for (const forecast of forecasts) {
    const date = forecast.dt_txt.split(' ')[0];
    if (!seenDates.has(date) && dailyForecasts.length < 5) {
      seenDates.add(date);
      dailyForecasts.push(forecast);
    }
  }

  return dailyForecasts;
};

