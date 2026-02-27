const Attractions = ({ attractions, city }) => {
  if (!attractions || attractions.length === 0) return null;

  const handleCardClick = (attraction) => {
    // Generate a Google Search URL for the attraction
    const query = encodeURIComponent(`${attraction.name} ${attraction.address || attraction.category || ''}`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Tourist Attractions</h3>
      <div className="grid grid-cols-2 gap-4">
        {attractions.map((attraction, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(attraction)}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📍</span>
              </div>
              <div className="flex-1 min-w-0 items-start">
                <h4 className="font-semibold text-gray-800 truncate">
                  {attraction.name}
                </h4>
                {attraction.category && (
                  <p className="text-sm text-gray-500 mt-1">
                    {attraction.category}
                  </p>
                )}
                {attraction.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-4">
                    {attraction.description}
                  </p>
                )}
                {attraction.image ? <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-48 object-cover rounded-lg mt-2"
                /> : <h2 className="text-2xl text-center mt-10">Image Not Available</h2>}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attractions;
