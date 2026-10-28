import React from 'react'

function Loader() {
  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl items-center">
      
      {/* 1st Column: Temperature, Sunrise & Sunset Skeleton */}
      <div className="space-y-6 md:border-r border-white/10 pr-4 last:border-0">
        <div className="space-y-2">
          {/* Temperature */}
          <div className="h-16 w-24 bg-white/20 rounded-xl animate-pulse"></div>
          {/* Feels like */}
          <div className="h-4 w-32 bg-white/10 rounded animate-pulse"></div>
        </div>
        
        <div className="space-y-3.5">
          {/* Sunrise Card */}
          <div className="h-[66px] bg-white/10 border border-white/5 rounded-xl animate-pulse"></div>
          {/* Sunset Card */}
          <div className="h-[66px] bg-white/10 border border-white/5 rounded-xl animate-pulse"></div>
        </div>
      </div>

      {/* 2nd Column: City, Icon & Status Skeleton */}
      <div className="flex flex-col items-center text-center space-y-4 py-4 md:py-0">
        {/* City Name */}
        <div className="h-10 w-44 bg-white/20 rounded-xl animate-pulse"></div>
        
        {/* Big Weather Icon Circle */}
        <div className="w-28 h-28 bg-white/10 border border-white/5 rounded-full animate-pulse"></div>
        
        <div className="w-full flex flex-col items-center gap-2">
          {/* Weather Title */}
          <div className="h-6 w-28 bg-white/20 rounded-lg animate-pulse"></div>
          {/* Description */}
          <div className="h-4 w-36 bg-white/10 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* 3rd Column: Humidity, Pressure & Windspeed Skeleton */}
      <div className="space-y-4 md:border-l border-white/10 pl-4 last:border-0">
        {/* Humidity Card */}
        <div className="h-[66px] bg-white/10 border border-white/5 rounded-xl animate-pulse"></div>
        {/* Pressure Card */}
        <div className="h-[66px] bg-white/10 border border-white/5 rounded-xl animate-pulse"></div>
        {/* Wind Speed Card */}
        <div className="h-[66px] bg-white/10 border border-white/5 rounded-xl animate-pulse"></div>
      </div>

    </div>
  )
}

export default Loader;
