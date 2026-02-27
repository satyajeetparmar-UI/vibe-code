import axios from 'axios';

const REST_COUNTRIES_BASE_URL = 'https://restcountries.com/v3.1';

// Get country information by country name
export const getCountryInfo = async (countryName) => {
  try {
    const response = await axios.get(`${REST_COUNTRIES_BASE_URL}/name/${countryName}`);
    
    if (!response.data || response.data.length === 0) {
      throw new Error('Country not found');
    }

    // Return the first match
    const country = response.data[0];
    
    return {
      name: country.name.common,
      capital: country.capital?.[0] || 'N/A',
      population: country.population,
      area: country.area,
      languages: Object.values(country.languages || {}),
      currency: Object.keys(country.currencies || {})[0],
      flag: country.flags.png,
      region: country.region,
      subregion: country.subregion,
    };
  } catch (error) {
    console.error('Error fetching country info:', error);
    throw new Error('Failed to fetch country information');
  }
};

// Get country name from coordinates (reverse geocoding)
export const getCountryFromCoordinates = async (lat, lon) => {
  try {
    const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    
    return response.data.countryName;
  } catch (error) {
    console.error('Error getting country from coordinates:', error);
    return null;
  }
};

