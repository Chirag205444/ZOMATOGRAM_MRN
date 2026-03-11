import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function PartnerLogin() {
  const navigate=useNavigate();
  const handleSubmit =async(e) => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    try{
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/food-partner/login`,
      {email,password},{ withCredentials:true })
      navigate('/create-food');
    }catch(err){
      console.log(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-[#13383a] dark:to-[#031011]">
      <div className="w-full max-w-md bg-white/80 dark:bg-[#111315] backdrop-blur-sm border border-gray-200 dark:border-white/5 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Partner sign in</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Access your partner dashboard and manage orders.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
            <input name='email' required={true} placeholder="owner@business.com" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-white/5 bg-white dark:bg-[#1a1d21] text-gray-900 dark:text-gray-100 focus:outline-none focus-ring-primary dark:focus:border-[#14b8a6] dark:focus:ring-1 dark:focus:ring-[#14b8a6]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Password</label>
            <input name='password'required={true} type="password" placeholder="••••••••" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-white/5 bg-white dark:bg-[#1a1d21] text-gray-900 dark:text-gray-100 focus:outline-none focus-ring-primary dark:focus:border-[#14b8a6] dark:focus:ring-1 dark:focus:ring-[#14b8a6]" />
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full py-2 px-4 rounded-md btn-primary dark:bg-[#14b8a6] dark:hover:bg-[#0d9488] dark:text-white font-medium cursor-pointer">Sign in</button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">Need to join? <Link to="/food-partner/register" className="link-accent dark:text-[#14b8a6] dark:hover:text-[#0d9488] cursor-pointer">Register</Link></p>
      </div>
    </div>
  )
}
