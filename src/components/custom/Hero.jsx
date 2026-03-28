import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[50px] mt-16 text-center'> <span className='text-[#f56551]'>Discover your Next Adventure with AI: </span>Personalized Iternaries At Your Fingertips</h1>
      <p className='text-xl text-gray-500 text-center'>Your personal trip planner and traver curator, creating custom iternaries tailored to your interests and budget</p>
      <Link to={'/create-trip'}>
        <Button className="bg-black hover:text-black hover:bg-slate-300 text-white">Get Started, It's Free</Button>
      </Link>
      <img src="/landing_page.webp" className="w-full h-[550px] object-cover rounded-xl shadow-2xl mt-4" alt="" />
    </div>
  )
}

export default Hero