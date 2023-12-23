import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar h-[80px] flex items-center gap-4 md:gap-10 px-4 bg-[#ffffff05]'>
        <Link to={'/'}>
            <p className='text-base md:text-xl text-white font-bold'>Home</p>
        </Link>
        <Link to={'/about'}>
            <p className='text-base md:text-xl text-white font-bold'>About</p>
        </Link>
        <Link to={'/portfolio'}>
            <p className='text-base md:text-xl text-white font-bold'>Portfolio</p>
        </Link>
        <Link to={'/contact'}>
            <p className='text-base md:text-xl text-white font-bold'>Contact</p>
        </Link>
    </div>
  )
}

export default Navbar