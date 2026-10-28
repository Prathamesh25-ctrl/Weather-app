import React, { useRef } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { LuSunMoon } from "react-icons/lu";

function SearchBarWithTheme({
    city,
    setCity,
    isDarkMode,
    setDarkMode,
}) {
    const searchInput = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();

        const value = searchInput.current.value.trim();

        if (value) {
            setCity(value);
        }
    };

    return (
        <div
            className={`
        w-full max-w-xl
        flex items-center gap-2 sm:gap-3
        p-2 rounded-2xl border shadow-xl
        backdrop-blur-md transition-colors duration-300
        ${isDarkMode
                    ? "bg-slate-900/50 border-white/20"
                    : "bg-white/70 border-gray-300/60"
                }
      `}
        >
            <form
                onSubmit={handleSearch}
                className={`
          flex flex-1 min-w-0 items-center
          overflow-hidden rounded-xl border
          ${isDarkMode
                        ? "bg-white/5 border-white/10"
                        : "bg-white/70 border-gray-300/60"
                    }
        `}
            >
                <input
                    ref={searchInput}
                    type="text"
                    defaultValue={city}
                    placeholder="Enter your city..."
                    aria-label="Search city"
                    required
                    className={`
            flex-1 min-w-0 w-full
            bg-transparent outline-none
            py-3 px-3 sm:px-4
            text-sm sm:text-base
            ${isDarkMode
                            ? "text-white placeholder:text-white/50"
                            : "text-gray-900 placeholder:text-gray-500"
                        }
          `}
                />

                <button
                    type="submit"
                    className="
            shrink-0 my-1 mr-1 px-3 sm:px-4 py-2
            rounded-lg bg-sky-500 hover:bg-sky-600
            text-white text-sm font-semibold
            transition-colors active:scale-95
          "
                >
                    Search
                </button>
            </form>

            <button
                type="button"
                onClick={() => setDarkMode((prev) => !prev)}
                aria-label={
                    isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
                aria-pressed={isDarkMode}
                className={`
          shrink-0 p-3 rounded-xl border
          transition-all active:scale-95
          ${isDarkMode
                        ? "bg-white/10 hover:bg-white/20 text-yellow-300 border-white/10"
                        : "bg-white/70 hover:bg-white text-gray-900 border-gray-300/60"
                    }
        `}
            >
                {isDarkMode ? (
                    <LuSunMoon className="text-xl" />
                ) : (
                    <IoSunnyOutline className="text-xl" />
                )}
            </button>
        </div>
    );
}

export default SearchBarWithTheme;