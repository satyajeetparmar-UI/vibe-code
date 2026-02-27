const CountryInfo = ({ country }) => {
  if (!country) return null;

  const formatPopulation = (pop) => {
    if (!pop) return 'N/A';
    return pop.toLocaleString();
  };

  const formatArea = (area) => {
    if (!area) return 'N/A';
    return `${area.toLocaleString()} km²`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-4 mb-4">
        {country.flag && (
          <img 
            src={country.flag} 
            alt={`${country.name} flag`} 
            className="w-16 h-10 object-cover rounded-lg shadow"
          />
        )}
        <div>
          <h3 className="text-xl font-bold text-gray-800">{country.name}</h3>
          <p className="text-sm text-gray-500">{country.region}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 uppercase">Capital</p>
          <p className="font-semibold text-gray-800">{country.capital}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 uppercase">Population</p>
          <p className="font-semibold text-gray-800">{formatPopulation(country.population)}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 uppercase">Area</p>
          <p className="font-semibold text-gray-800">{formatArea(country.area)}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 uppercase">Currency</p>
          <p className="font-semibold text-gray-800">{country.currency || 'N/A'}</p>
        </div>
      </div>

      {country.languages && country.languages.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-gray-500 uppercase mb-2">Languages</p>
          <div className="flex flex-wrap gap-2">
            {country.languages.slice(0, 4).map((lang, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryInfo;
