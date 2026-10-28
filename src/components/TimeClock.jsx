import React, { useEffect, useState } from "react";

function TimeClock({ isDarkMode }) {
  const [timer, setTimer] = useState(() =>
    new Date().toLocaleTimeString("en-IN")
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer(new Date().toLocaleTimeString("en-IN"));
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const date = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className={`
        w-full max-w-xs sm:max-w-sm
        p-5 sm:p-6 rounded-2xl border shadow-xl
        backdrop-blur-md
        flex flex-col gap-2
        transition-colors duration-300
        ${
          isDarkMode
            ? "bg-slate-900/50 border-white/20 text-white"
            : "bg-white/70 border-gray-300/60 text-gray-900"
        }
      `}
    >
      <div className="flex items-center justify-between w-full border-b border-current/20 pb-3">
        <h1 className="text-xs uppercase tracking-widest font-bold">
          Live Clock
        </h1>

        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight tabular-nums">
        {timer}
      </h2>

      <h3 className="text-xs sm:text-sm font-medium tracking-wide">
        {date}
      </h3>
    </div>
  );
}

export default TimeClock;