import React, { useState } from "react";
import SearchBarWithTheme from "./components/SearchBarWithTheme";
import TimeClock from "./components/TimeClock";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  const [city, setCity] = useState("");
  const [isDarkMode, setDarkMode] = useState(false);

  return (
    <main
      className={`
        min-h-screen w-full
        bg-cover bg-center bg-fixed
        flex flex-col items-center
        gap-6 sm:gap-8
        px-4 py-6 sm:px-6 sm:py-8
        transition-colors duration-300
        ${
          isDarkMode
            ? "bg-[url('/dark1.jpg')] text-white"
            : "bg-[url('/light.png')] text-gray-900"
        }
      `}
    >
      <SearchBarWithTheme
        city={city}
        setCity={setCity}
        isDarkMode={isDarkMode}
        setDarkMode={setDarkMode}
      />

      <TimeClock isDarkMode={isDarkMode} />

      <WeatherDetails
        city={city}
        isDarkMode={isDarkMode}
      />
    </main>
  );
}

export default App;