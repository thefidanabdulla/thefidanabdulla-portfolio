import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div style={{background: "linear-gradient(to right, #355c7d, #6c5b7b, #c06c84)"}}>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layout