import axios from 'axios';

const FOURSQUARE_BASE_URL = 'https://api.foursquare.com/v3';
const WIKIPEDIA_API_URL = 'https://en.wikipedia.org/w/api.php';

// Get tourist attractions using Foursquare API
export const getAttractionsFoursquare = async (lat, lon) => {
  const apiKey = import.meta.env.VITE_FOURSQUARE_API_KEY;

  if (!apiKey || !apiKey.startsWith('fsq3')) {
    throw new Error('Foursquare API key not configured or invalid (must start with fsq3...)');
  }

  try {
    const response = await axios.get(`${FOURSQUARE_BASE_URL}/places/search`, {
      params: {
        ll: `${lat},${lon}`,
        categories: '10000,16000', // Arts & Entertainment, Travel & Transport
        limit: 6,
        radius: 10000, // 10km radius
      },
      headers: {
        'Accept': 'application/json',
        'Authorization': apiKey,
      },
    });

    return response.data.results.map(place => ({
      name: place.name,
      category: place.categories?.[0]?.name || 'Tourist Attraction',
      address: place.location?.address || '',
      lat: place.geocodes?.main?.latitude,
      lon: place.geocodes?.main?.longitude,
    }));
  } catch (error) {
    console.error('Foursquare API error:', error);
    throw error;
  }
};

// Get tourist attractions using Wikipedia API (fallback)
export const getAttractionsWikipedia = async (city, country) => {
  try {
    // Search for tourist attractions in the city
    const searchResponse = await axios.get(WIKIPEDIA_API_URL, {
      params: {
        action: 'query',
        list: 'search',
        srsearch: `tourist attractions in ${city} ${country}`,
        format: 'json',
        origin: '*',
        srlimit: 6,
      },
    });

    const searchResults = searchResponse.data.query?.search || [];

    // Get page details for each result
    const pageIds = searchResults.map(r => r.pageid).join('|');

    if (!pageIds) {
      return [];
    }

    const detailsResponse = await axios.get(WIKIPEDIA_API_URL, {
      params: {
        action: 'query',
        pageids: pageIds,
        prop: 'extracts|pageimages',
        exintro: true,
        explaintext: true,
        piprop: 'thumbnail',
        pithumbsize: 200,
        format: 'json',
        origin: '*',
      },
    });

    const pages = detailsResponse.data.query?.pages || {};

    return Object.values(pages).map(page => ({
      name: page.title,
      description: page.extract || 'No description available',
      image: page.thumbnail?.source || null,
    }));
  } catch (error) {
    console.error('Wikipedia API error:', error);
    return [];
  }
};

// Main function to get attractions - tries Foursquare first, falls back to Wikipedia
export const getAttractions = async (lat, lon, city, country) => {
  // Try Foursquare first
  if (import.meta.env.VITE_FOURSQUARE_API_KEY && import.meta.env.VITE_FOURSQUARE_API_KEY.startsWith('fsq3')) {
    try {
      return await getAttractionsFoursquare(lat, lon);
    } catch (error) {
      console.log('Foursquare failed, trying Wikipedia...');
    }
  }

  // Fallback to Wikipedia
  return await getAttractionsWikipedia(city, country);
};

