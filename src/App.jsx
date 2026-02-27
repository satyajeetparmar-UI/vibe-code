import { useState } from 'react';
import './App.css';

// Services
import { getCoordinates, getCurrentWeather, getForecast } from './services/weatherService';
import { getCountryInfo, getCountryFromCoordinates } from './services/locationService';
import { getAttractions } from './services/attractionService';
import { generatePlan } from './utils/generatePlan';

// Components
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import Attractions from './components/Attractions';
import CountryInfo from './components/CountryInfo';
import TravelPlan from './components/TravelPlan';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  
  // Data states
  const [weather, setWeather] = useState(null);
  const [forecasts, setForecasts] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [country, setCountry] = useState(null);
  const [travelPlan, setTravelPlan] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (cityName) => {
    setLoading(true);
    setError(null);
    setSearched(true);
    
    // Reset previous data
    setWeather(null);
    setForecasts([]);
    setAttractions([]);
    setCountry(null);
    setTravelPlan(null);
    
    try {
      // Step 1: Get coordinates for the city
      const coordinates = await getCoordinates(cityName);
      const { lat, lon, name, country: countryCode } = coordinates;
      setCity(name);

      // Step 2: Get current weather
      const weatherData = await getCurrentWeather(lat, lon);
      setWeather(weatherData);

      // Step 3: Get 5-day forecast
      const forecastData = await getForecast(lat, lon);
      setForecasts(forecastData);

      // Step 4: Get country information
      const countryName = await getCountryFromCoordinates(lat, lon);
      if (countryName) {
        try {
          const countryData = await getCountryInfo(countryName);
          setCountry(countryData);
        } catch (err) {
          console.log('Could not get country info:', err);
        }
      }

      // Step 5: Get tourist attractions
      const attractionsData = await getAttractions(lat, lon, name, countryName || countryCode);
      setAttractions(attractionsData);

      // Step 6: Generate AI travel plan
      const plan = generatePlan(weatherData, attractionsData);
      setTravelPlan(plan);

    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to fetch data. Please check the city name and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            ✈️ AI Travel Planner
          </h1>
          <p className="text-white/80 text-lg">
            Discover weather, attractions, and create your perfect trip
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 max-w-md mx-auto">
            <p className="font-medium">Error: {error}</p>
            <p className="text-sm mt-1">Please check if the city name is correct and try again.</p>
          </div>
        )}

        {/* Loading */}
        {loading && <Loader message="Finding the best travel info for you..." />}

        {/* Content */}
        {!loading && !error && searched && (
          <div className="space-y-6">
            {/* City Name */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white">{city}</h2>
            </div>

            {/* Weather and Forecast Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WeatherCard weather={weather} />
              <Forecast forecasts={forecasts} />
            </div>

            {/* Country Info and Attractions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CountryInfo country={country} />
              <Attractions attractions={attractions} />
            </div>

            {/* AI Travel Plan */}
            <TravelPlan plan={travelPlan} />
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && !searched && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌍</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Start Your Adventure!
            </h2>
            <p className="text-white/70 max-w-md mx-auto">
              Enter a city name above to discover current weather, attractions, and get a personalized travel plan.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-white/60 text-sm">
          <p>© 2024 AI Travel Planner • Powered by OpenWeatherMap & REST Countries</p>
        </div>
      </div>
    </div>
  );
}

export default App;
