const TravelPlan = ({ plan }) => {
  if (!plan) return null;

  const { weatherInfo, morning, afternoon, evening, tips } = plan;

  const getWeatherEmoji = () => {
    const condition = weatherInfo?.condition || 'clear';
    const emojis = {
      clear: '☀️',
      clouds: '⛅',
      rain: '🌧️',
      thunderstorm: '⛈️',
      snow: '❄️',
      atmosphere: '🌫️',
      drizzle: '🌦️',
    };
    return emojis[condition] || '☀️';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Travel Plan</h3>
        <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
          <span className="text-xl">{getWeatherEmoji()}</span>
          <span className="text-sm text-blue-700 capitalize">
            {weatherInfo?.condition || 'Clear'} • {weatherInfo?.temperature || 20}°C
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Morning */}
        <div className="flex gap-4">
          <div className="w-20 flex-shrink-0">
            <div className="bg-orange-100 rounded-xl p-3 text-center">
              <span className="text-2xl">🌅</span>
              <p className="text-xs font-semibold text-orange-700 mt-1">Morning</p>
            </div>
          </div>
          <div className="flex-1 bg-gray-50 rounded-xl p-4">
            <p className="text-gray-700">{morning}</p>
          </div>
        </div>

        {/* Afternoon */}
        <div className="flex gap-4">
          <div className="w-20 flex-shrink-0">
            <div className="bg-yellow-100 rounded-xl p-3 text-center">
              <span className="text-2xl">☀️</span>
              <p className="text-xs font-semibold text-yellow-700 mt-1">Afternoon</p>
            </div>
          </div>
          <div className="flex-1 bg-gray-50 rounded-xl p-4">
            <p className="text-gray-700">{afternoon}</p>
          </div>
        </div>

        {/* Evening */}
        <div className="flex gap-4">
          <div className="w-20 flex-shrink-0">
            <div className="bg-purple-100 rounded-xl p-3 text-center">
              <span className="text-2xl">🌙</span>
              <p className="text-xs font-semibold text-purple-700 mt-1">Evening</p>
            </div>
          </div>
          <div className="flex-1 bg-gray-50 rounded-xl p-4">
            <p className="text-gray-700">{evening}</p>
          </div>
        </div>
      </div>

      {/* Tips */}
      {tips && tips.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">💡 Travel Tips</h4>
          <div className="flex flex-wrap gap-2">
            {tips.map((tip, index) => (
              <span 
                key={index} 
                className="px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm"
              >
                {tip}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelPlan;
