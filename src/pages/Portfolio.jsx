import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub } from "react-icons/fa";

const Portfolio = () => {
  return (
    <div className='screenHeight px-10  pb-[200px]'>
      <h1 className="text-[40px] mb-4 font-bold mt-10 text-white">Portfolio and Experience</h1>
      <div className="mt-10">
        <p className="text-xl font-semibold md:max-w-[75%] text-white">
          In my exciting programming journey, my focus as a Frontend Developer has
          yielded sleek user interfaces. Beyond that, I delve into Unity game
          development, Three.js, and .NET backend (MVC/API). Always eager to
          learn, I'm committed to pushing the boundaries of technology and
          honing my skills for innovative solutions.
        </p>
      </div>
      <p className='text-[28px] font-bold mt-10 text-white'>My Projects</p>
      <span className='text-[18px] mb-8 font-semibold text-[#ffffff70] flex gap-2 items-center'>
        You can see more on my Github 
        <Link to={"https://github.com/thefidanabdulla"} className='hover:text-white'>
          <FaGithub />
        </Link>
      </span>
      <div className="mt-4 flex  flex-wrap items-center justify-center md:justify-start gap-4">
          <div className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
            <Link target='_blank' to={"https://react-admin-dashboard-one-olive.vercel.app/"} className='border-b border-white'>
              Admin Dashboard
            </Link>
            <Link target='_blank' to={"https://github.com/thefidanabdulla/React-Admin-Dashboard"} className='text-xl text-center'>
              <FaGithub />
            </Link>
          </div>
          <div className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
            <Link target='_blank' to={"https://youtube-clone-ten-ashy-89.vercel.app/"} className='border-b border-white'>
            Youtube Clone
            </Link>
            <Link target='_blank' to={"https://github.com/thefidanabdulla/YoutubeClone"} className='text-xl text-center'>
              <FaGithub />
            </Link>
          </div>
          <div className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
            <Link target='_blank' to={"https://spotify-clone-nu-mocha.vercel.app/"} className='border-b border-white'>
              Spotify Clone
            </Link>
            <Link target='_blank' to={"https://github.com/thefidanabdulla/Spotify-Clone"} className='text-xl text-center'>
              <FaGithub />
            </Link>
          </div>
          <div className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
            <Link target='_blank' to={"https://music-player-teal-six.vercel.app/"} className='border-b border-white'>
              Music Player
            </Link>
            <Link target='_blank' to={"https://github.com/thefidanabdulla/Music-Player"} className='text-xl text-center'>
              <FaGithub />
            </Link>
          </div>
          <div className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
            <Link target='_blank'  to={"https://airbnb-clone-six-flame.vercel.app/"} className='border-b border-white'>
              Airbnb Clone
            </Link>
            <Link target='_blank' to={"https://github.com/thefidanabdulla/Airbnb-Clone"} className='text-xl text-center'>
              <FaGithub />
            </Link>
          </div>
         
        
      </div>
    </div>
  )
}

export default Portfolio