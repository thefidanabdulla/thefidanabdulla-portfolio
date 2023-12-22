import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import "./style.css"

const Layout = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layout