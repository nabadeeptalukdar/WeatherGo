import { WiSnow, WiFog } from "react-icons/wi";
import { FiSearch } from "react-icons/fi";

import { useState } from "react";
import "./App.css";
import "tailwindcss";
import axios from "axios";

function App() {
  const [city, setcity] = useState("");
  const [weather, setweather] = useState();
  const [suggestions, setSuggestions] = useState([]);

  const fetchCitySuggestions = async (city) => {
    if (!city) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=bbc6f6cb12c911c116eac374353e5246`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

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
    "01d": <img src="/ClearDay.png" alt="Clear" className="h-25 md:h-30" />, // clear day
    "01n": <img src="/ClearMoon.png" alt="Clear" className="h-25 md:h-30" />, // clear night
    "02d": <img src="/cloudyDay.png" alt="Clear" className="h-25 md:h-30" />, // day cloud
    "02n": <img src="/cloudyNight.png" alt="Clear" className="h-25 md:h-30" />, // night cloud
    "03d": <img src="/cloudyDay.png" alt="Clear" className="h-25 md:h-30" />, //day cloud
    "03n": <img src="/cloudyNight.png" alt="Clear" className="h-25 md:h-30" />, //night cloud
    "04d": <img src="/cloudyDay.png" alt="Clear" className="h-25 md:h-30" />, //day cloud
    "04n": <img src="/cloudyNight.png" alt="Clear" className="h-25 md:h-30" />, //night cloud
    "09d": <img src="/rainDay.png" alt="Clear" className="h-25 md:h-30" />, //day rain
    "09n": <img src="/rainNight.png" alt="Clear" className="h-25 md:h-30" />, //night rain
    "10d": <img src="/rainDay.png" alt="Clear" className="h-25 md:h-30" />, //day rain
    "10n": <img src="/rainNight.png" alt="Clear" className="h-25 md:h-30" />, //night rain
    "11d": <img src="/thunderDay.png" alt="Clear" className="h-25 md:h-30" />, //day thunderstorm
    "11n": <img src="/thunderNight.png" alt="Clear" className="h-25 md:h-30" />, //night thunderstorm
    "13d": <WiSnow size={150} />,
    "13n": <WiSnow size={150} />,
    "50d": <WiFog size={150} />,
    "50n": <WiFog size={150} />,
  };

  // const backgroundMap = {
  //   Clear: "bg-gradient-to-b from-yellow-300 to-yellow-800",
  //   Clouds: "bg-gradient-to-b from-gray-400 to-black",
  //   Rain: "bg-gradient-to-b from-blue-400 to-blue-800",
  //   Snow: "bg-gradient-to-b from-white to-blue-100",
  //   Thunderstorm: "bg-gradient-to-b from-gray-600 to-black",
  //   Drizzle: "bg-gradient-to-b from-blue-200 to-blue-500",
  //   Mist: "bg-gradient-to-b from-gray-300 to-gray-500",
  //   Haze: "bg-gradient-to-b from-yellow-100 to-gray-300",
  //   Fog: "bg-gradient-to-b from-gray-200 to-gray-500",
  //   Smoke: "bg-gradient-to-b from-gray-300 to-gray-600",
  //   Dust: "bg-gradient-to-b from-yellow-200 to-yellow-400",
  //   Sand: "bg-gradient-to-b from-yellow-300 to-yellow-500",
  // };

  const condition = weather?.data?.weather[0]?.main;
  // const bgClass = backgroundMap[condition];

  return (
    <>
      <div className="bg-[url(/bgcover.jpg)] bg-cover h-screen w-screen flex justify-center items-center  ">
        <div className="w-[80%] h-fit md:mx-5 transition-all duration-1000 bg-[#d9d9d92b] backdrop-blur-sm rounded-full">
          <div className="flex flex-col w-full h-full items-center p-2 md:p-5">
            <div className=" flex flex-col justify-center items-center">
            <div className="flex w-[80%] md:w-[90%] h-fit mx-auto border py-1 px-4 bg-gray-100 rounded-3xl gap-5">
              <input
                className=" w-full p-2 outline-none "
                placeholder="Enter Your City"
                type="text"
                value={city}
                onChange={(e) => {
                  const newCity = e.target.value;
                  setcity(newCity);
                  fetchCitySuggestions(newCity); // ✅ Now it works as expected
                }}
              />
              

              <button
                className="w-fit text-black cursor-pointer"
                onClick={() => getWeather()}
              >
                <FiSearch size={20} />
              </button>
            </div>
            {suggestions.length > 0 && (
                <ul className="w-[80%] hide-scrollbar md:w-[90%] bg-white border rounded-2xl shadow-md mt-1 max-h-40 overflow-y-auto">
                  {suggestions.map((item, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setcity(item.name);
                        setSuggestions([]);
                      }}
                    >
                      {item.name}, {item.state ? item.state + ", " : ""}
                      {item.country}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {weather && (
              <>
                <div className=" md:px-3 md:py-4">
                  <div className="w-full mt-4 gap-3 md:gap-5 flex justify-evenly items-center">
                    <div className=" py-6 bg-white md:py-10 px-5 md:px-8 rounded-3xl flex flex-col md:gap-2 justify-center items-start">
                      <div className="text-xl">{weather.data.name}</div>
                      <div className="text-2xl md:text-5xl font-semibold md:font-bold">
                        {weather.data.main.temp}°C
                      </div>
                    </div>
                    <div className=" p-5">
                      <div className="w-full drop-shadow-lg ">
                        {iconMap[weather.data.weather[0].icon]}
                      </div>
                    </div>
                  </div>
                  <div className="w-full text-center mt-5 md:mt-15">
                    <div className=" flex justify-between">
                      <div className="bg-white p-4 md:p-7 rounded-2xl">
                        <h1 className="md:text-lg ">Humidity</h1>
                        <div className="text-xl md:text-3xl font-semibold">
                          {weather.data.main.humidity}
                        </div>
                      </div>
                      <div className="bg-white p-4 md:p-7 rounded-2xl">
                        <h1 className="md:text-lg  ">Pressure</h1>
                        <div className="text-xl md:text-3xl font-semibold">
                          {weather.data.main.pressure}
                        </div>
                      </div>
                    </div>
                  </div>
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
