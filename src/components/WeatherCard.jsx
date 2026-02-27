const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const temp = Math.round(weather.main?.temp || 0);
  const feelsLike = Math.round(weather.main?.feels_like || 0);
  const humidity = weather.main?.humidity || 0;
  const windSpeed = weather.wind?.speed || 0;
  const description = weather.weather?.[0]?.description || '';
  const icon = weather.weather?.[0]?.icon || '01d';

  // Get weather icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  // Get background gradient based on weather condition
  const getWeatherGradient = () => {
    const condition = weather.weather?.[0]?.id || 800;
    if (condition >= 200 && condition < 300) return 'from-gray-600 to-gray-800'; // Thunderstorm
    if (condition >= 300 && condition < 600) return 'from-blue-500 to-blue-700'; // Rain/Drizzle
    if (condition >= 600 && condition < 700) return 'from-blue-200 to-blue-400'; // Snow
    if (condition === 800) return 'from-yellow-400 to-orange-500'; // Clear
    if (condition > 800) return 'from-blue-400 to-blue-600'; // Clouds
    return 'from-blue-400 to-blue-600';
  };

  return (
    <div className={`bg-gradient-to-br ${getWeatherGradient()} rounded-2xl p-6 text-white shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold mb-1">{temp}°C</h2>
          <p className="text-lg capitalize mb-2">{description}</p>
          <p className="text-sm opacity-90">Feels like {feelsLike}°C</p>
        </div>
        <div className="text-center">
          <img src={iconUrl} alt={description} className="w-24 h-24" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/20">
        <div className="text-center">
          <p className="text-sm opacity-80">Humidity</p>
          <p className="text-xl font-semibold">{humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-80">Wind</p>
          <p className="text-xl font-semibold">{windSpeed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
