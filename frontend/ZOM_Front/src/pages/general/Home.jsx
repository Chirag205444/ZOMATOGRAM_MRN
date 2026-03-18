import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Home() {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/logout`, { withCredentials: true }).catch(() => {});
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/food-partner/logout`, { withCredentials: true }).catch(() => {});
      navigate('/user/login');
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/user/login');
    }
  };



  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoElement = videoRefs.current[entry.target.dataset.index];
          if (!videoElement) return;

          if (entry.isIntersecting) {
            // Start from the beginning when scrolled into view
            videoElement.currentTime = 0;
            videoElement.play().catch(e => console.log('Autoplay prevented:', e));
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.6 } // Play when 60% of the video is visible
    );

    const children = containerRef.current?.children;
    if (children) {
      Array.from(children).forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, [videos]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/food`, {
      withCredentials: true
    })
      .then((res) => {
        setVideos(res.data.fooditems || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
        setError("Please login to view food videos.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center text-white">
        <p className="text-xl animate-pulse">Loading tasty bites...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white p-6">
        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md max-w-md w-full text-center border border-white/20">
          <div className="text-4xl mb-4">🍔</div>
          <h2 className="text-2xl font-bold mb-2">Welcome to Zomato</h2>
          <p className="text-gray-300 mb-8">{error}</p>
          <div className="flex flex-col gap-4">
            <Link to="/user/login" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg shadow-red-600/30">
              User Login
            </Link>
            <Link to="/food-partner/login" className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold transition">
              Partner Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white gap-4">
        <p className="text-xl px-4 text-center">No tasty videos found. Check back later!</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory touch-pan-y no-scrollbar"
      style={{ scrollBehavior: 'smooth' }}
    >
      {videos.map((vid, index) => (
        <div
          key={vid._id}
          data-index={index}
          className="relative w-full h-screen snap-start snap-always flex items-center justify-center overflow-hidden"
        >
          {/* Top Right Options Menu */}
          <div className="absolute top-6 right-4 z-10 flex flex-col items-end">
            <button
               onClick={() => setMenuOpen(vid._id === menuOpen ? null : vid._id)}
               className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm text-white hover:bg-black/60 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
              </svg>
            </button>
            {menuOpen === vid._id && (
               <div className="mt-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden min-w-[120px]">
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-500 hover:bg-zinc-800 transition font-medium text-sm">
                    Logout
                  </button>
               </div>
            )}
          </div>

          {/* Video Player */}
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={vid.video}
            // `object-cover` on mobile so it fills the screen completely
            // `sm:object-contain` on larger screens so the full video is visible without being cut off
            className="w-full h-full object-cover sm:object-contain"
            loop
            muted // Muted to allow autoplay without user interaction initially
            playsInline
          />

          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between">
            <div className="text-white max-w-[75%]">
              <h2 className="text-xl font-bold mb-2">{vid.title}</h2>
              {/* Description Truncated to 2 lines */}
              <p className="text-sm opacity-90 mb-4 line-clamp-2 leading-relaxed">
                {vid.description}
              </p>

              {/* Visit Store Button */}
              <Link to={"/food-partner/" + vid.foodpartner}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition flex items-center gap-2"
              >
                Visit Store
              </Link>
            </div>


          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
