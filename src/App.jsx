import {
  WiDaySunny,
  WiNightClear,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";
import { FiSearch } from "react-icons/fi";

import { useState } from "react";
import "./App.css";
import "tailwindcss";
import axios from "axios";

function App() {
  const [city, setcity] = useState("");
  const [weather, setweather] = useState();
  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"bbc6f6cb12c911c116eac374353e5246"}`
      );
      console.log(weather);
      setweather(response);
    } catch (error) {
      console.log("City not found" + error);
    }
  };
  const iconMap = {
    "01d": <WiDaySunny size={60} />,
    "01n": <WiNightClear size={60} />,
    "02d": <WiCloud size={60} />,
    "02n": <WiCloud size={60} />,
    "03d": <WiCloud size={60} />,
    "03n": <WiCloud size={60} />,
    "04d": <WiCloud size={60} />,
    "04n": <WiCloud size={60} />,
    "09d": <WiRain size={60} />,
    "09n": <WiRain size={60} />,
    "10d": <WiRain size={60} />,
    "10n": <WiRain size={60} />,
    "11d": <WiThunderstorm size={60} />,
    "11n": <WiThunderstorm size={60} />,
    "13d": <WiSnow size={60} />,
    "13n": <WiSnow size={60} />,
    "50d": <WiFog size={60} />,
    "50n": <WiFog size={60} />,
  };

  const backgroundMap = {
    Clear: 'bg-gradient-to-b from-yellow-300 to-yellow-800',
    Clouds: 'bg-gradient-to-b from-gray-400 to-black',
    Rain: 'bg-gradient-to-b from-blue-400 to-blue-800',
    Snow: 'bg-gradient-to-b from-white to-blue-100',
    Thunderstorm: 'bg-gradient-to-b from-gray-600 to-black',
    Drizzle: 'bg-gradient-to-b from-blue-200 to-blue-500',
    Mist: 'bg-gradient-to-b from-gray-300 to-gray-500',
    Haze: 'bg-gradient-to-b from-yellow-100 to-gray-300',
    Fog: 'bg-gradient-to-b from-gray-200 to-gray-500',
    Smoke: 'bg-gradient-to-b from-gray-300 to-gray-600',
    Dust: 'bg-gradient-to-b from-yellow-200 to-yellow-400',
    Sand: 'bg-gradient-to-b from-yellow-300 to-yellow-500',
  }
  

    const condition = weather?.data?.weather[0]?.main
  const bgClass = backgroundMap[condition] || "bg-black"

  return (
    <>
      <div className={`w-140 h-160 border rounded-2xl p-16 mx-auto mt-6 items-center ${bgClass} transition-colors duration-1000`}>
        <div className=" h-full w-full bg-[#f1efec10]">
        <div className="flex flex-col w-full h-full items-center  backdrop-blur-2xl rounded-2xl p-5">
        <div className="flex w-full gap-5">
        <input
          className="p-2 h-10 w-full bg-gray-200 border-1 rounded-xl "
          type="text"
          value={city}
          onChange={(e) => setcity(e.target.value)}
        />
        <button
          className="w-fit text-white cursor-pointer p-2 rounded text-sm items-center"
          onClick={() => getWeather()}
        >
          <FiSearch size={30}/>
        </button>
        </div>
        {weather && (
          <>
            <div className="text-5xl">{weather.data.main.temp}° C</div>
            <div>{weather.data.name}</div>
            <div className="capitalize">
              {weather.data.weather[0].main}
            </div>
            <div className=" text-blue-400">
              {iconMap[weather.data.weather[0].icon]}
            </div>
          </>
        )}
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
