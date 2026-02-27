import { useState, useEffect, useRef } from 'react';
import { getCitySuggestions } from '../services/weatherService';

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    let active = true;

    const fetchSuggestions = async () => {
      if (!isTyping) return; // Only fetch if the user is actively typing

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
  }, [city, isTyping]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setIsTyping(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setIsTyping(false);
      setShowSuggestions(false);
      onSearch(city.trim());
    }
  };

  const handleSuggestionClick = (suggestion) => {
    // OpenWeatherMap direct geocoding expects: {city name},{state code},{country code}
    // E.g. "London, GB" or "London, OH, US"
    const cityNamePieces = [suggestion.name];
    if (suggestion.state) cityNamePieces.push(suggestion.state);
    if (suggestion.country) cityNamePieces.push(suggestion.country);

    const formattedQuery = cityNamePieces.join(', ');

    setCity(formattedQuery);
    setIsTyping(false);
    setShowSuggestions(false);
    onSearch(formattedQuery);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8 relative" ref={wrapperRef}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
            placeholder="Enter city name..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-[1px] shadow-lg"
            disabled={loading}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden text-left left-0 max-h-60 overflow-y-auto">
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
          {loading ? '✈️ Searching' : '✈️ Search'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
