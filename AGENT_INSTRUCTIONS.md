PROJECT: AI Travel Planner
IMPORTANT: This project must be implemented inside the CURRENT repository.
Do NOT create a new repository.
If needed, refactor existing files but do not break git structure.

---

OBJECTIVE

Build a complete AI Travel Planner web application.

User flow:

- User opens app
- Enters destination city
- App shows:
  1. Current weather
  2. 5-day forecast
  3. Nearby tourist attractions
  4. Country details
  5. Simple AI-generated 1-day travel plan

No login.
No authentication.
No paid APIs.

---

TECH STACK

- React (Vite)
- Tailwind CSS
- Axios
- Public APIs only
- Environment variables for API keys
- Clean modular structure

---

IF PROJECT NOT SETUP:

If React not installed:

- Initialize Vite React app inside current repo
- Install dependencies
- Setup Tailwind properly

If React already exists:

- Use existing structure

---

FOLDER STRUCTURE

/src
/components
SearchBar.jsx
WeatherCard.jsx
Forecast.jsx
Attractions.jsx
CountryInfo.jsx
TravelPlan.jsx
Loader.jsx
/services
weatherService.js
locationService.js
attractionService.js
/utils
generatePlan.js

---

APIs TO USE

1. OpenWeatherMap (Free tier)
   - Geocoding
   - Current weather
   - 5-day forecast

2. REST Countries API
   https://restcountries.com/v3.1/name/{country}

3. Tourist attractions:
   - Foursquare free API
     OR
   - Wikipedia search API fallback

---

ENV FILE

Create:
.env.example

VITE_WEATHER_API_KEY=
VITE_FOURSQUARE_API_KEY=

Use import.meta.env for access.

---

AI TRAVEL PLAN (NO PAID AI)

Create rule-based generator:

Function generatePlan(weather, attractions)

Logic:

- If Rain → indoor activities
- If Clear → outdoor sightseeing
- If Clouds → mix activities
- Use top attraction names

Return structured text:

Morning:
Afternoon:
Evening:

---

UI REQUIREMENTS

- Modern design
- Tailwind CSS
- Gradient background
- Glassmorphism cards
- Rounded-xl
- Shadow-lg
- Hover effects
- Fully responsive
- Grid layout
- Dark theme friendly

---

STATE MANAGEMENT

- useState
- useEffect
- No Redux

---

ERROR HANDLING

- City not found
- Empty input
- API failure
- Loading spinner

---

FINAL REQUIREMENTS

- Clean commented code
- No console errors
- README.md updated
- Setup instructions included
- Ready to deploy on Vercel
- Do NOT use paid APIs

---

IMPORTANT

Do not over-engineer.
Keep logic clean.
Focus on working MVP.
Make it hackathon ready.
