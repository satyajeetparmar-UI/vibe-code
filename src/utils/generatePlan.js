/**
 * Rule-based travel plan generator
 * Creates a 1-day itinerary based on weather conditions and available attractions
 */

// Get weather condition category
const getWeatherCategory = (weatherId) => {
  // Weather condition codes from OpenWeatherMap
  // 2xx: Thunderstorm, 3xx: Drizzle, 5xx: Rain, 6xx: Snow, 7xx: Atmosphere, 800: Clear, 80x: Clouds
  
  if (weatherId >= 200 && weatherId < 300) return 'thunderstorm';
  if (weatherId >= 300 && weatherId < 400) return 'drizzle';
  if (weatherId >= 500 && weatherId < 600) return 'rain';
  if (weatherId >= 600 && weatherId < 700) return 'snow';
  if (weatherId >= 700 && weatherId < 800) return 'atmosphere';
  if (weatherId === 800) return 'clear';
  if (weatherId > 800) return 'clouds';
  
  return 'clear';
};

// Get activity suggestions based on weather
const getActivitiesByWeather = (weatherCategory) => {
  const activities = {
    rain: {
      morning: [
        'Visit a local museum',
        'Explore an art gallery',
        'Go to a shopping mall',
        'Enjoy a coffee shop tour',
      ],
      afternoon: [
        'Watch a movie at cinema',
        'Visit indoor markets',
        'Explore historical buildings',
        'Try local cuisine at restaurants',
      ],
      evening: [
        'Enjoy a spa session',
        'Visit a indoor concert',
        'Try local nightlife',
        'Read at a bookshop',
      ],
    },
    thunderstorm: {
      morning: [
        'Stay at hotel and relax',
        'Visit a museum',
        'Explore a shopping center',
      ],
      afternoon: [
        'Enjoy a long lunch',
        'Visit an indoor attraction',
        'Go to a spa',
      ],
      evening: [
        'Watch a movie',
        'Enjoy room service',
        'Listen to music at hotel',
      ],
    },
    snow: {
      morning: [
        'Visit a warm café',
        'Explore indoor museums',
        'Go to an art gallery',
      ],
      afternoon: [
        'Enjoy warm soup at a restaurant',
        'Visit indoor markets',
        'Explore local shops',
      ],
      evening: [
        'Try winter specialties',
        'Visit a cozy bar',
        'Enjoy the city lights from indoors',
      ],
    },
    atmosphere: {
      morning: [
        'Take a scenic walk',
        'Visit local markets',
        'Explore neighborhood cafes',
      ],
      afternoon: [
        'Visit museums',
        'Explore shops',
        'Enjoy local food',
      ],
      evening: [
        'Try local restaurants',
        'Enjoy evening stroll',
        'Visit a rooftop bar',
      ],
    },
    clear: {
      morning: [
        'Visit famous landmarks',
        'Explore parks and gardens',
        'Take a walking tour',
        'Watch sunrise at viewpoint',
      ],
      afternoon: [
        'Outdoor sightseeing',
        'Visit beaches or lakes',
        'Explore nature trails',
        'Take a boat tour',
      ],
      evening: [
        'Enjoy sunset at rooftop',
        'Explore nightlife',
        'Street food tour',
        'Night market visit',
      ],
    },
    clouds: {
      morning: [
        'Visit museums and galleries',
        'Explore historic sites',
        'Walking tour of city',
      ],
      afternoon: [
        'Mix of indoor and outdoor activities',
        'Visit local markets',
        'Explore cafes',
      ],
      evening: [
        'Try local restaurants',
        'Enjoy live music',
        'Explore evening markets',
      ],
    },
  };

  return activities[weatherCategory] || activities.clear;
};

// Generate the travel plan
export const generatePlan = (weather, attractions = []) => {
  const weatherId = weather?.weather?.[0]?.id || 800;
  const weatherCategory = getWeatherCategory(weatherId);
  const weatherDescription = weather?.weather?.[0]?.description || 'clear sky';
  const temperature = Math.round(weather?.main?.temp || 20);
  
  const activities = getActivitiesByWeather(weatherCategory);
  
  // Get attraction names if available
  const attractionNames = attractions.slice(0, 3).map(a => a.name);
  
  // Create a personalized plan with attraction names
  const createActivity = (baseActivities) => {
    const activity = baseActivities[Math.floor(Math.random() * baseActivities.length)];
    
    // Add attraction reference if available
    if (attractionNames.length > 0 && Math.random() > 0.5) {
      const attraction = attractionNames[Math.floor(Math.random() * attractionNames.length)];
      return `${activity} - including a visit to ${attraction}`;
    }
    
    return activity;
  };
  
  const plan = {
    weatherInfo: {
      condition: weatherCategory,
      description: weatherDescription,
      temperature: temperature,
    },
    morning: createActivity(activities.morning),
    afternoon: createActivity(activities.afternoon),
    evening: createActivity(activities.evening),
    tips: getTipsByWeather(weatherCategory, temperature),
  };
  
  return plan;
};

// Get travel tips based on weather
const getTipsByWeather = (weatherCategory, temperature) => {
  const tipsByWeather = {
    rain: [
      '🌧️ Bring an umbrella or raincoat',
      '👟 Wear waterproof shoes',
      '🏛️ Have indoor backup plans ready',
    ],
    thunderstorm: [
      '⛈️ Stay indoors during heavy storms',
      '🔌 Avoid open areas and tall structures',
      '🏨 Keep emergency contacts handy',
    ],
    snow: [
      '❄️ Dress in warm, layered clothing',
      '🥾 Wear sturdy waterproof boots',
      '🧴 Apply moisturizer - cold air is dry',
    ],
    atmosphere: [
      '🌫️ Visibility may be reduced',
      '👀 Drive carefully',
      '🏃 Stay on well-lit paths',
    ],
    clear: [
      '☀️ Apply sunscreen SPF 30+',
      '🧴 Stay hydrated',
      '🕶️ Bring sunglasses',
      '📷 Perfect conditions for photos!',
    ],
    clouds: [
      '👕 Bring a light jacket',
      '📷 Great lighting for photography',
      '🌡️ Temperature may vary - layer up',
    ],
  };
  
  // Add temperature-specific tips
  if (temperature > 30) {
    tipsByWeather[weatherCategory].push('🥵 Very hot - stay cool and drink water');
  } else if (temperature < 10) {
    tipsByWeather[weatherCategory].push('🥶 Cold weather - bundle up warmly');
  }
  
  return tipsByWeather[weatherCategory] || tipsByWeather.clear;
};

export default generatePlan;

