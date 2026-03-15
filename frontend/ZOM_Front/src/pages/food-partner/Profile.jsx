import React from 'react'
import {useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [profile,setProfile] = useState(null);
  const [videos,setVideos] = useState([]);
  const [mealsServed,setMealsServed] = useState(0);
  const { id } = useParams();
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/food-partner/${id}`,{
      withCredentials:true 
    })
    .then((response) => {
      setProfile(response.data.foodPartner);
      setVideos(response.data.foodPartner.foodItems || []);
      setMealsServed(response.data.foodPartner.foodItems?.length || 0);
    })
    .catch((error) => {
      console.error('Error fetching profile:', error);
    });
  }, [id]);


  return (
    <div className="min-h-screen bg-black text-white w-full pb-10 font-sans">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900 sticky top-0 bg-black z-10 transition-colors">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white hover:text-gray-300 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="text-lg font-bold tracking-wide">{profile?.name}</h1>
        </div>
        <button className="text-white hover:text-gray-300 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </button>
      </div>

      <div className="max-w-screen-md mx-auto">
        {/* Profile Header Stats */}
        <div className="flex items-center px-4 py-6">
          {/* Avatar */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-600 p-[3px] mr-6 flex-shrink-0">
            <div className="w-full h-full rounded-full bg-zinc-900 border-2 border-black flex items-center justify-center overflow-hidden">
                <span className="text-3xl">🍔</span>
            </div>
          </div>
          
          {/* Avatar and Info */}
          <div className="flex-1 flex flex-col justify-center">
             <h2 className="font-bold text-xl">{profile?.name}</h2>
             <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                <span className="text-xs">📍</span> {profile?.address}
             </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around text-center py-4 border-t border-b border-zinc-800 mb-6">
           <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">{profile?.customerCount}</span>
              <span className="text-sm text-gray-400 uppercase tracking-wider text-xs font-semibold mt-1">Customers</span>
           </div>
           <div className="w-[1px] bg-zinc-800"></div>
           <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">{mealsServed}</span>
              <span className="text-sm text-gray-400 uppercase tracking-wider text-xs font-semibold mt-1">Meals Served</span>
           </div>
        </div>





        {/* Video grid */}
        <div className="grid grid-cols-3 gap-[1px]">
          {videos.map((v) => (
            <div
              key={v._id}
              className="aspect-square bg-zinc-900 flex items-center justify-center text-white relative group cursor-pointer hover:opacity-90 transition overflow-hidden"
            >
              {/* Fallback image/video thumbnail gradient */}
              <div className="absolute inset-0  from-zinc-800 to-zinc-950" />
               <video src={v.video} muted autoPlay loop></video>
              {/* <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 px-1.5 py-0.5 rounded text-[10px] font-medium backdrop-blur-sm">
                 
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
