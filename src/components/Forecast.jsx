const Forecast = ({ forecasts }) => {
  if (!forecasts || forecasts.length === 0) return null;

  const getDayName = (dateString) => {
    const date = new Date(dateString * 1000);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const getWeatherIcon = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}.png`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-2">
        {forecasts.map((forecast, index) => {
          const temp = Math.round(forecast.main?.temp || 0);
          const icon = forecast.weather?.[0]?.icon || '01d';
          const description = forecast.weather?.[0]?.description || '';
          const date = new Date(forecast.dt * 1000);
          
          return (
            <div 
              key={index} 
              className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <p className="text-sm font-semibold text-gray-600 mb-1">
                {index === 0 ? 'Today' : getDayName(forecast.dt)}
              </p>
              <img 
                src={getWeatherIcon(icon)} 
                alt={description}
                className="w-10 h-10 my-1"
              />
              <p className="text-lg font-bold text-gray-800">{temp}°</p>
              <p className="text-xs text-gray-500 capitalize mt-1">
                {description.substring(0, 6)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
