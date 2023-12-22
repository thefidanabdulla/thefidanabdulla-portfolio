import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
        <Link to={'/'}>
            <p>Home</p>
        </Link>
    </div>
  )
}

export default Navbar