import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function App() {

  const [query, setQuery] = useState({ q: 'qatar' }); // Keep the query state to allow city name input
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    const cityName = query.q ? query.q : 'Default Location'; // Set a default location if query is empty
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(cityName)}`)

    setLoading(true); // Set loading to true when fetching starts
    setError(null); // Reset error state

    try {
      const data = await getFormattedWeatherData({ ...query, units });
      toast.success(`Fetched Weather data for ${data.name}, ${data.country}`);
      setWeather(data);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      toast.error("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false); // Set loading to false when fetching is done
    }
  };

  useEffect(() => { getWeather(); }, [query, units]) // Keep the useEffect for fetching weather data

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700" 
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-600 to-blue-700"
    return "from-yellow-600 to-orange-700"
  }

  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32
     bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}> 
     <TopButtons setQuery={setQuery} /> 
     <Inputs setQuery={setQuery} setUnits={setUnits} />
     
      { loading ? (
        <div className="text-center py-4">
          <p className="text-lg text-gray-500">Loading weather data...</p>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">
          <p>{error}</p>
        </div>
      ) : weather && (
        <>
        <TimeAndLocation weather={weather} />
        <TempAndDetails weather={weather} units={units} />
        <Forecast title=' 3 hour step forecast' data={weather.hourly} />
        <Forecast title=' daily forecast' data={weather.daily}/>
        </>
      )}
      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  )
}

export default App