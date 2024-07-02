import React from 'react'
import Header from './componenets/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='p-6 flex flex-col min-h-screen'>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Layout
