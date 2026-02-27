import { useState, useEffect, useRef } from 'react';
import { getCitySuggestions } from '../services/weatherService';

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    let active = true;

    const fetchSuggestions = async () => {
      if (city.trim().length > 2) {
        try {
          const results = await getCitySuggestions(city.trim());
          if (active) {
            setSuggestions(results);
            setShowSuggestions(true);
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        if (active) {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [city]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setShowSuggestions(false);
      onSearch(city.trim());
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const cityName = `${suggestion.name}${suggestion.state ? `, ${suggestion.state}` : ''}, ${suggestion.country}`;
    setCity(cityName);
    setShowSuggestions(false);
    onSearch(cityName);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8 relative" ref={wrapperRef}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
            placeholder="Enter city name..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm shadow-lg"
            disabled={loading}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden text-left left-0">
              {suggestions.map((suggestion, index) => (
                <li
                  key={`${suggestion.lat}-${suggestion.lon}-${index}`}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="font-medium text-gray-800">{suggestion.name}</div>
                  <div className="text-xs text-gray-500">
                    {suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !city.trim()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl font-medium shadow-lg transition-colors duration-200"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
