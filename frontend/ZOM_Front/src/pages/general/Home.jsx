import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Home() {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

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
        setVideos(res.data.fooditems);
      });
  }, []);

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

            {/* Placeholder for side actions (like, share, etc.) typical in Reels UI */}
            <div className="flex flex-col gap-6 text-white pb-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">💖</div>
                <span className="text-xs">12.4k</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">💬</div>
                <span className="text-xs">456</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">↗️</div>
                <span className="text-xs">Share</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
