import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Createfood() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    video: null,
  });
  const [previewUrl, setPreviewUrl] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, video: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      description: '',
      video: null,
    });
    setPreviewUrl('');
    // Reset the file input element's value directly just in case it retains the selected file reference
    const fileInput = document.getElementById('video-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDatatosend=new FormData();
    formDatatosend.append("name",formData.name);
    formDatatosend.append("description",formData.description);
    formDatatosend.append("video",formData.video);
    
    const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/food`, formDatatosend,{
      withCredentials:true,
    })
    console.log(response.data);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-500 selection:text-black pb-24 sm:pb-10">
      {/* Top Navigation Bar */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-zinc-900 sticky top-0 bg-black/80 backdrop-blur-md z-20">
        <button onClick={() => navigate(-1)} className="text-white hover:text-gray-300 transition-colors p-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="text-lg font-bold tracking-wide">Add New Menu Item</h1>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md mx-auto p-4 sm:p-6 mt-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          {/* Header Text */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-1">What's cooking? 🍳</h2>
            <p className="text-sm text-zinc-400">Share your latest masterpiece with your hungry customers.</p>
          </div>

          {/* Video Upload Area */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest pl-1">Food Video <span className="text-red-500">*</span></label>
            <div className="relative group w-full">
              <label 
                htmlFor="video-upload" 
                className={`flex flex-col items-center justify-center w-full aspect-[4/5] sm:aspect-video rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden ${
                  previewUrl 
                    ? 'border-zinc-800 bg-zinc-950/50' 
                    : 'border-zinc-700 hover:border-yellow-500/50 hover:bg-zinc-900/50 bg-zinc-900/30'
                }`}
              >
                {previewUrl ? (
                  <video src={previewUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-zinc-700 transition-all duration-300 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-yellow-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </div>
                    <p className="text-base font-semibold text-zinc-200 mb-1">Tap to upload a video</p>
                    <p className="text-xs text-zinc-500">MP4, WebM or OGG (Max 50MB)</p>
                  </div>
                )}
                
                {/* Overlay for replacing video */}
                {previewUrl && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                    <span className="bg-white/10 text-white text-xs px-4 py-2 rounded-full font-semibold backdrop-blur-md border border-white/20">Change Video</span>
                  </div>
                )}
              </label>
              <input 
                id="video-upload" 
                name="video"
                type="file" 
                accept="video/*" 
                className="hidden" 
                onChange={handleVideoChange}
                required={!previewUrl}
              />
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-1"></div>

          {/* Name Input */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="name" className="text-xs font-bold text-zinc-300 uppercase tracking-widest pl-1">Item Name <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 shadow-inner"
                placeholder="e.g. Spicy Garlic Noodles"
                required
              />
            </div>
          </div>

          {/* Description Input */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="description" className="text-xs font-bold text-zinc-300 uppercase tracking-widest pl-1">Description <span className="text-red-500">*</span></label>
            <div className="relative">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 resize-none shadow-inner"
                placeholder="Describe your dish. What makes it special? What are the key ingredients?"
                required
              ></textarea>
            </div>
          </div>

          {/* Sticky Submit Buttons for Mobile */}
          <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/95 to-transparent sm:static sm:p-0 sm:bg-none z-20 pt-10 pointer-events-none sm:pointer-events-auto">
            <div className="w-full max-w-md mx-auto flex gap-3 pointer-events-auto">
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-base sm:text-lg rounded-2xl px-4 py-4.5 hover:bg-zinc-800 hover:text-white active:scale-[0.98] transition-all duration-300"
              >
                <span>Clear</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
              
              <button
                type="submit"
                className="flex-[2] flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-black font-extrabold text-base sm:text-lg rounded-2xl px-4 py-4.5 hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Publish</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Createfood;
