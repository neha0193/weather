import axios from "axios";
import { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=5c20235375877b9bde54c936a02cc98b`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
      setLocation("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-800 text-white flex flex-col items-center justify-start p-6">
      {/* Search Box */}
      <div className="w-full max-w-lg text-center mb-12">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
          className="w-full px-4 py-3 rounded-xl focus:outline-none text-white
          placeholder:text-white focus:ring-4 focus:ring-blue-400 border border-gray-400"
        />
        <p className="mt-4 text-gray-200 text-xl">
          🌍 The World&apos;s Weather in Your Hands
        </p>
      </div>

      {/* Weather Info */}
      {data.name !== undefined && (
        <>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
            <div className="mb-6">
              <h2 className="text-3xl font-bold">{data.name}</h2>
              {data.main ? (
                <h1 className="text-6xl font-extrabold mt-4">
                  {data.main.temp}°C
                </h1>
              ) : null}
              {data.weather ? (
                <p className="mt-2 text-lg font-medium text-gray-200">
                  {data.weather[0].main}
                </p>
              ) : null}
            </div>

            {/* Extra Info */}
            <div className="grid grid-cols-3 gap-4 text-center mt-6">
              <div className="bg-white/10 rounded-xl p-4">
                {data.main ? (
                  <p className="text-xl font-bold">{data.main.feels_like}°C</p>
                ) : null}
                <p className="text-sm text-gray-300">Feels Like</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                {data.main ? (
                  <p className="text-xl font-bold">{data.main.humidity}%</p>
                ) : null}
                <p className="text-sm text-gray-300">Humidity</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                {data.wind ? (
                  <p className="text-xl font-bold">{data.wind.speed} MPH</p>
                ) : null}
                <p className="text-sm text-gray-300">Wind Speed</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
