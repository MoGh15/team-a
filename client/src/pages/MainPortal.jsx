import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPortal = () => {
  const navigate = useNavigate();

  // 4 High-quality medical images with custom titles
  const centerImages = [
    {
      url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80",
      title: "Modern Facilities"
    },
    {
      url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
      title: "Professional Doctors"
    },
    {
      url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
      title: "Advanced Diagnostics"
    },
    {
      url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
      title: "Premium Patient Care"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans relative overflow-hidden select-none">
      
      {/* 1. Custom CSS for the Infinite Ticker Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 100s linear infinite !important;
        }
      `}</style>

      {/* 2. NAVBAR SECTION */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center fixed top-0 left-0 z-50 shadow-sm">
        {/* Logo Icon */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <span className="font-bold text-slate-800 text-lg hidden sm:block tracking-wide">Praxis Management</span>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          {/* Patient Info Entry Icon (Dark Yellow Icon) */}
          <button 
            onClick={() => {
              navigate('/patient-portal')
            }}
            className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-600 transition-all duration-200 group relative"
            title="Patient Intake Form"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14h1.5l1.5-3 1.5 4.5 1-2.5h2.5" />
            </svg>
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md pointer-events-none">
              Patient Portal
            </span>
          </button>

          {/* Admin Login Icon */}
          <button 
            onClick={() => navigate('/login')}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-all duration-200 group relative border border-slate-100"
            title="Admin Login"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md pointer-events-none">
              Admin Login
            </span>
          </button>
        </div>
      </nav>

      {/* 3. CENTER IMAGES SECTION WITH ANIMATION */}
      <main className="flex-grow flex items-center justify-center px-6 py-24 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {centerImages.map((image, index) => (
            <div 
              key={index} 
              className="group relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-slate-100"
            >
              {/* Image */}
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out grayscale-[20%] group-hover:grayscale-0"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Text Information inside Card */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300 mb-1 block">Clinical Services</span>
                <h3 className="text-white font-bold text-lg leading-tight">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. BOTTOM BAR WITH INFINITE HORIZONTAL SCROLL TICKER */}
      <footer className="w-full bg-slate-900 border-t border-slate-800 py-4 overflow-hidden relative z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="w-full overflow-hidden whitespace-nowrap flex items-center">
          <div className="animate-marquee text-slate-200 font-medium tracking-wide text-sm flex gap-12 items-center">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 shrink-0">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
                <span className="uppercase font-semibold text-slate-100 tracking-wider">
                  Dear Patients: Experience premium healthcare with our expanded specialized therapies and modern diagnostic facilities.                </span>
                <span className="text-slate-400 mx-2">|</span>
                <span className="text-amber-400 font-medium">
                  Opening Hours — Mon - Thu: 08:00 - 12:00, 14:00 - 18:00 • Fri: 08:00 - 13:00
                </span>
              </div>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};

export default MainPortal;