import React, { useEffect, useState } from "react";
import { FaWind } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { LuSunrise, LuSunset } from "react-icons/lu";
import { WiHumidity } from "react-icons/wi";
import Loader from "./ui/Loader";

function WeatherDetails({ city, isDarkMode }) {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        const fetchWeather = async () => {
            const cityName = city.trim() || "Mumbai";
            const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

            if (!apiKey) {
                setError(
                    "Weather API key is missing. Please configure your .env file."
                );
                setWeatherData(null);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError("");

            try {
                const apiURL =
                    `https://api.openweathermap.org/data/2.5/weather` +
                    `?q=${encodeURIComponent(cityName)}` +
                    `&appid=${apiKey}&units=metric`;

                const response = await fetch(apiURL, {
                    signal: controller.signal,
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Unable to fetch weather data."
                    );
                }

                setWeatherData(data);
            } catch (err) {
                if (err.name === "AbortError") return;

                setWeatherData(null);
                setError(
                    err.message || "Something went wrong. Please try again."
                );
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchWeather();

        return () => controller.abort();
    }, [city]);

    const cardClass = `
    rounded-xl p-3 sm:p-4 border
    transition-colors duration-300
    ${isDarkMode
            ? "bg-white/5 border-white/10"
            : "bg-black/[0.03] border-black/10"
        }
  `;

    const secondaryText = isDarkMode
        ? "text-gray-300"
        : "text-gray-600";

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center py-12">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div
                role="alert"
                className="
          w-full max-w-xl mx-auto p-4 rounded-xl
          bg-red-500/10 border border-red-500/30
          text-red-500 text-center font-medium
          break-words
        "
            >
                Oops! {error}
            </div>
        );
    }

    if (!weatherData) return null;

    const {
        main,
        sys,
        name,
        weather,
        wind,
    } = weatherData;

    const {
        temp,
        feels_like,
        pressure,
        humidity,
    } = main;

    const { sunrise, sunset } = sys;

    const {
        icon,
        main: weatherTitle,
        description,
    } = weather[0];

    const formatTime = (timestamp) =>
        new Date(timestamp * 1000).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });

    const sunriseTime = formatTime(sunrise);
    const sunsetTime = formatTime(sunset);

    return (
        <section
            className={`
        w-full max-w-5xl mx-auto
        grid grid-cols-1 md:grid-cols-3
        gap-5 sm:gap-6
        p-4 sm:p-6 lg:p-8
        rounded-3xl border shadow-2xl
        backdrop-blur-md
        items-center
        transition-colors duration-300
        ${isDarkMode
                    ? "bg-slate-900/50 border-white/20 text-white"
                    : "bg-white/70 border-gray-300/60 text-gray-900"
                }
      `}
        >
            {/* Column 1: Temperature, Sunrise and Sunset */}

            <div className="min-w-0 space-y-5 md:pr-4 md:border-r md:border-current/15">
                <div>
                    <div className="flex flex-wrap items-baseline gap-1">
                        <h2 className="font-black text-5xl sm:text-6xl tracking-tighter">
                            {Math.round(temp)}
                        </h2>

                        <span className="text-3xl font-light">°C</span>
                    </div>

                    <p className={`text-xs mt-2 uppercase tracking-wider ${secondaryText}`}>
                        Feels like:{" "}
                        <span className="font-bold">
                            {Math.round(feels_like)}°C
                        </span>
                    </p>
                </div>

                <div className="space-y-3">
                    {/* Sunrise */}

                    <div className={`flex items-center gap-3 ${cardClass}`}>
                        <div className="p-2 bg-amber-400/20 text-amber-500 rounded-lg">
                            <LuSunrise className="text-2xl" />
                        </div>

                        <div className="min-w-0">
                            <h3 className={`text-[10px] uppercase font-bold tracking-wider ${secondaryText}`}>
                                Sunrise
                            </h3>

                            <p className="text-sm font-semibold">
                                {sunriseTime}
                            </p>
                        </div>
                    </div>

                    {/* Sunset */}

                    <div className={`flex items-center gap-3 ${cardClass}`}>
                        <div className="p-2 bg-orange-500/20 text-orange-500 rounded-lg">
                            <LuSunset className="text-2xl" />
                        </div>

                        <div className="min-w-0">
                            <h3 className={`text-[10px] uppercase font-bold tracking-wider ${secondaryText}`}>
                                Sunset
                            </h3>

                            <p className="text-sm font-semibold">
                                {sunsetTime}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Column 2: City and Weather */}

            <div className="min-w-0 flex flex-col items-center text-center gap-3 py-4 md:py-0">
                <h1 className="font-black text-3xl sm:text-4xl tracking-tight uppercase break-words max-w-full">
                    {name}
                </h1>

                <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center rounded-full border border-current/10 bg-white/5">
                    <img
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt={description}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                    />
                </div>

                <div>
                    <h2 className="font-bold text-xl tracking-wide capitalize">
                        {weatherTitle}
                    </h2>

                    <p className={`text-sm capitalize italic mt-1 ${secondaryText}`}>
                        {description}
                    </p>
                </div>
            </div>

            {/* Column 3: Humidity, Pressure and Wind */}

            <div className="min-w-0 space-y-3 md:pl-4 md:border-l md:border-current/15">
                {/* Humidity */}

                <div className={`flex items-center gap-4 ${cardClass}`}>
                    <div className="p-2 bg-blue-400/20 text-blue-500 rounded-xl shrink-0">
                        <WiHumidity className="text-3xl" />
                    </div>

                    <div className="min-w-0">
                        <h2 className="text-lg font-bold">
                            {humidity}%
                        </h2>

                        <h3 className={`text-[10px] uppercase font-bold tracking-widest ${secondaryText}`}>
                            Humidity
                        </h3>
                    </div>
                </div>

                {/* Pressure */}

                <div className={`flex items-center gap-4 ${cardClass}`}>
                    <div className="p-2 bg-purple-400/20 text-purple-500 rounded-xl shrink-0">
                        <IoSpeedometerOutline className="text-2xl" />
                    </div>

                    <div className="min-w-0">
                        <h2 className="text-lg font-bold break-words">
                            {pressure}{" "}
                            <span className="text-xs font-normal">hPa</span>
                        </h2>

                        <h3 className={`text-[10px] uppercase font-bold tracking-widest ${secondaryText}`}>
                            Pressure
                        </h3>
                    </div>
                </div>

                {/* Wind Speed */}

                <div className={`flex items-center gap-4 ${cardClass}`}>
                    <div className="p-2 bg-teal-400/20 text-teal-500 rounded-xl shrink-0">
                        <FaWind className="text-2xl" />
                    </div>

                    <div className="min-w-0">
                        <h2 className="text-lg font-bold">
                            {wind.speed}{" "}
                            <span className="text-xs font-normal">m/s</span>
                        </h2>

                        <h3 className={`text-[10px] uppercase font-bold tracking-widest ${secondaryText}`}>
                            Wind Speed
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WeatherDetails;